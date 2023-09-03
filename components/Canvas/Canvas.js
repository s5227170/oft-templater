import { useEffect, useState, useRef, useReducer } from "react"
import parse from "html-react-parser"

import classes from "./Canvas.module.scss"

import ComponentTypeManager from "../ComponentTypeManagement/ComponentTypeManager/ComponentTypeManager"
import CreateRowManager from "../CreateRowManagement/CreateRowManager/CreateRowManager"

import convertPageConfig from "../../util/convert-page-config"
import ComponentContentManager from "../ComponentContentManagement/ComponentContentManager/ComponentContentManager"
import RowSettingsManager from "../RowSettingsManagement/RowSettingsManager/RowSettingsManager"
import EditComponentManager from "../EditComponentManagement/EditComponentManager/EditComponentManager"
import debounceResize from "../../util/debounce-resize"
import rowActions from "../../store/actions/row"
import componentActions from "../../store/actions/component"

import contentReducer, {
  initialState,
} from "../../store/reducers/contentReducer"

const Canvas = (props) => {
  const rootRef = useRef(null)
  const [state, dispatch] = useReducer(contentReducer, initialState)
  const [rowSettings, setRowSettings] = useState([])
  const [reactifiedContent, setReactifiedContent] = useState()
  const [initialLoad, setInitialLoad] = useState(true)
  const [usedColours, setUsedColours] = useState([])
  const [rowPositionConfig, setRowPositionConfig] = useState([])
  const [rowComponentStatus, setRowComponentStatus] = useState({
    row: null,
    item: null,
    rowNumber: null,
  })
  const [editComponentShow, setEditComponentShow] = useState(false)

  useEffect(() => {
    if (props.newCanvas) {
      const pageConfigReset = {
        content: [],
        title: "",
        parameters: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
      }

      dispatch({ type: "SET_CONFIG", payload: pageConfigReset })
      localStorage.removeItem("pageConfig")
      props.resetCanvasSetting(false)
    }
  }, [props.newCanvas])

  useEffect(() => {
    if (
      state.pageConfig.content.length ||
      state.pageConfig.title.length ||
      state.pageConfig.parameters.paddingLeft != 0 ||
      state.pageConfig.parameters.paddingRight != 0 ||
      state.pageConfig.parameters.paddingTop != 0 ||
      state.pageConfig.parameters.paddingBottom != 0
    ) {
      localStorage.setItem("pageConfig", JSON.stringify(state.pageConfig))
    }

    const conversion = convertPageConfig(state.pageConfig)
    let fullStringContent = ""
    conversion.map((stringRow) => {
      fullStringContent += stringRow
    })
    props.setHTML(fullStringContent)
    props.extractPageConfig(state.pageConfig)
    const reactContent = parse(fullStringContent, {
      replace: ({ attribs, children }) => {
        if (!attribs) {
          return
        }

        if (attribs.id === "componentManager") {
          return (
            <ComponentTypeManager
              componentGeneration={generateComponent}
              elementPosition={attribs.name}
              rowColumns={attribs["data-columns"]}
            />
          )
        }
        if (attribs.id === "componentContentManager") {
          const paddings = {
            paddingLeft: attribs["data-padding-left"],
            paddingRight: attribs["data-padding-right"],
            paddingTop: attribs["data-padding-top"],
            paddingBottom: attribs["data-padding-bottom"],
          }
          return (
            <ComponentContentManager
              confirmContent={confirmContent}
              elementPosition={attribs.name}
              componentType={attribs.role}
              deleteFunction={deleteContent}
              row={attribs["data-columns"]}
              defaultPaddings={paddings}
              columnSize={attribs["data-column-sizes"]}
              currentColours={usedColours}
              setColours={setUsedColours}
              takeComponent={props.takeComponent}
            />
          )
        }
      },
    })
    setReactifiedContent(reactContent)
    const newRowPositionConfig = []
    for (let i = 0; i < state.pageConfig.content.length; i++) {
      newRowPositionConfig.push({
        title: "POSITION " + state.pageConfig.content[i].position,
        value: state.pageConfig.content[i].position,
      })
    }
    setRowPositionConfig(newRowPositionConfig)
  }, [state.pageConfig, usedColours])

  useEffect(() => {
    function RowSettingsCalculation() {
      setTimeout(() => {
        if (reactifiedContent) {
          const newRowSettings = debounceResize(state.pageConfig.content.length)
          setRowSettings(newRowSettings)
        }
      }, 20)
    }

    RowSettingsCalculation()

    window.addEventListener("resize", RowSettingsCalculation)

    return (_) => {
      window.removeEventListener("resize", RowSettingsCalculation)
    }
  }, [reactifiedContent, props.guideExpand, props.tabChange, state.pageConfig])

  useEffect(() => {
    if (initialLoad == true) {
      let existingConfig = localStorage.getItem("pageConfig")
      if (existingConfig) {
        existingConfig = JSON.parse(existingConfig)
        dispatch({ type: "SET_CONFIG", payload: existingConfig })
        props.extractPageConfig(existingConfig)
      }
      setInitialLoad(false)
    }
  }, [])

  useEffect(() => {
    if (props.configChanges && state.pageConfig != props.configChanges) {
      dispatch({ type: "SET_CONFIG", payload: props.configChanges })
    }
  }, [props.configChanges])

  useEffect(() => {
    if (props.loadedTemplate) {
      dispatch({ type: "SET_CONFIG", payload: props.loadedTemplate })
      props.resetLoadedTemplate(null)
    }
  }, [props.loadedTemplate])

  const generateComponent = (type, position, columns) => {
    dispatch({
      type: "CREATE_COMPONENT",
      payload: componentActions.create(
        state.pageConfig,
        props.defaultComponentPaddings,
        type,
        position,
        columns
      ),
    })
  }

  const confirmContent = (row, item, rowBackground, componentData) => {
    dispatch({
      type: "SET_COMPONENT",
      payload: componentActions.set(
        state.pageConfig,
        row,
        item,
        rowBackground,
        componentData
      ),
    })
  }

  const deleteContent = (row, item) => {
    dispatch({
      type: "DELETE_COMPONENT",
      payload: componentActions.remove(state.pageConfig, row, item),
    })
  }

  const editContent = (row, item, rowNumber) => {
    setRowComponentStatus({
      row: row,
      item: item,
      rowNumber: rowNumber,
    })
  }

  const generateRow = (cols, colSizes) => {
    dispatch({
      type: "CREATE_ROW",
      payload: rowActions.create(state.pageConfig, cols, colSizes),
    })
  }

  const deleteRowHandler = (rowPosition) => {
    dispatch({
      type: "DELETE_ROW",
      payload: rowActions.remove(state.pageConfig, rowPosition),
    })
  }

  const confirmRowChanges = (row, newPosition) => {
    dispatch({
      type: "UPDATE_ROW",
      payload: rowActions.update(state.pageConfig, row, newPosition),
    })
  }

  const tackleEditModal = () => {
    setEditComponentShow(!editComponentShow)
  }

  return (
    <div className={classes.CanvasWrapper}>
      <div id="targetDiv" ref={rootRef}>
        {reactifiedContent}
      </div>
      <CreateRowManager rowGeneration={generateRow} />
      <EditComponentManager
        confirmContent={confirmContent}
        rowNumber={rowComponentStatus.rowNumber}
        item={rowComponentStatus.item}
        componentType={rowComponentStatus.type}
        deleteFunction={deleteContent}
        row={rowComponentStatus.row}
        modalShow={editComponentShow}
        tackleModal={() => {
          setEditComponentShow(!editComponentShow)
        }}
        currentColours={usedColours}
        setColours={setUsedColours}
      />
      {rowSettings.map((row) => {
        const currentRow = state.pageConfig.content[row.position - 1]
        return (
          <RowSettingsManager
            key={"settingsButton" + row.position}
            rowSettings={row}
            row={currentRow}
            confirmRowChanges={confirmRowChanges}
            deleteRowHandler={deleteRowHandler}
            positionOptions={rowPositionConfig}
            deleteComponent={deleteContent}
            editContent={editContent}
            tackleEditModal={tackleEditModal}
          />
        )
      })}
    </div>
  )
}

export default Canvas
