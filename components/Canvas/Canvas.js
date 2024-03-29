import { useEffect, useState, useRef } from "react"
import parse from "html-react-parser"

import classes from "./Canvas.module.scss"

import ComponentTypeManager from "../ComponentTypeManagement/ComponentTypeManager/ComponentTypeManager"
import CreateRowManager from "../CreateRowManagement/CreateRowManager/CreateRowManager"

import convertPageConfig from "../../util/convert-page-config"
import ComponentContentManager from "../ComponentContentManagement/ComponentContentManager/ComponentContentManager"
import RowSettingsManager from "../RowSettingsManagement/RowSettingsManager/RowSettingsManager"
import EditComponentManager from "../EditComponentManagement/EditComponentManager/EditComponentManager"
import initComponent from "../../util/initComponent"
import rearangeArray from "../../util/rearangeArray"
import debounceResize from "../../util/debounceResize"

const Canvas = (props) => {
  const rootRef = useRef(null)
  const [rowSettings, setRowSettings] = useState([])
  const [reactifiedContent, setReactifiedContent] = useState()
  const [initialLoad, setInitialLoad] = useState(true)
  const [usedColours, setUsedColours] = useState([])
  const [pageConfig, setPageConfig] = useState({
    content: [],
    title: "",
    parameters: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  })
  const [rowPositionConfig, setRowPositionConfig] = useState([])
  const [rowComponentStatus, setRowComponentStatus] = useState({
    row: null,
    item: null,
    rowNumber: null,
  })
  const [editComponentShow, setEditComponentShow] = useState(false)

  useEffect(() => {
    if (props.newCanvas) {
      setPageConfig({
        content: [],
        title: "",
        parameters: {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        },
      })
      localStorage.removeItem("pageConfig")
      props.resetCanvasSetting(false)
    }
  }, [props.newCanvas])

  useEffect(() => {
    if (
      pageConfig.content.length ||
      pageConfig.title.length ||
      pageConfig.parameters.paddingLeft != 0 ||
      pageConfig.parameters.paddingRight != 0 ||
      pageConfig.parameters.paddingTop != 0 ||
      pageConfig.parameters.paddingBottom != 0
    ) {
      localStorage.setItem("pageConfig", JSON.stringify(pageConfig))
    }

    const conversion = convertPageConfig(pageConfig)
    let fullStringContent = ""
    conversion.map((stringRow) => {
      fullStringContent += stringRow
    })
    props.setHTML(fullStringContent)
    props.setStringifiedHTML(pageConfig)
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
            />
          )
        }
      },
    })
    setReactifiedContent(reactContent)
    const newRowPositionConfig = []
    for (let i = 0; i < pageConfig.content.length; i++) {
      newRowPositionConfig.push({
        title: "POSITION " + pageConfig.content[i].position,
        value: pageConfig.content[i].position,
      })
    }
    setRowPositionConfig(newRowPositionConfig)
  }, [pageConfig, usedColours])

  useEffect(() => {
    setTimeout(() => {
      debounceResize()
    })

    window.addEventListener("resize", debounceResize)

    return (_) => {
      window.removeEventListener("resize", debounceResize)
    }
  }, [reactifiedContent, props.guideExpand, pageConfig])

  useEffect(() => {
    if (initialLoad == true) {
      let existingConfig = localStorage.getItem("pageConfig")
      if (existingConfig) {
        existingConfig = JSON.parse(existingConfig)
        setPageConfig(existingConfig)
      }
      setInitialLoad(false)
    }
  }, [])

  useEffect(() => {
    if (props.loadedTemplate) {
      setPageConfig(props.loadedTemplate)
      props.resetLoadedTemplate(null)
    }
  }, [props.loadedTemplate])

  const setPageContents = (newPageContent) => {
    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: newPageContent,
    }))
  }

  const generateComponent = (type, position, columns) => {
    const row = position.split("#")[0].substr(3)

    const componentPosition = position
      .split("#")[1]
      .charAt(position.split("#")[1].length - 1)

    let parameters = {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    }
    if (props.defaultComponentPaddings != parameters) {
      parameters = { ...props.defaultComponentPaddings }
    }

    if (componentPosition == 1 && columns > 1) {
      parameters = { ...props.defaultComponentPaddings, paddingRight: 0 }
    }
    if (componentPosition == 2 && columns == 2) {
      parameters = { ...props.defaultComponentPaddings, paddingLeft: 0 }
    }
    if (componentPosition == 3 && columns > 2) {
      parameters = { ...props.defaultComponentPaddings, paddingLeft: 0 }
    }
    if (componentPosition == 2 && columns > 2) {
      parameters = {
        ...props.defaultComponentPaddings,
        paddingLeft: 0,
        paddingRight: 0,
      }
    }

    let component = {}
    if (type == "Text") {
      component = initComponent.text(parameters, componentPosition)
    }
    if (type == "List") {
      component = initComponent.list(parameters, componentPosition)
    }
    if (type == "Image") {
      component = initComponent.image(parameters, componentPosition)
    }
    if (type == "MultiImage") {
      component = initComponent.multiImage(parameters, componentPosition)
    }

    const newPageContent = []
    pageConfig.content.map((rowConfig) => {
      if (rowConfig.position != row) {
        newPageContent.push(rowConfig)
      } else {
        newPageContent.push({
          ...rowConfig,
          contentComponents: [...rowConfig.contentComponents, component],
        })
      }
    })

    setPageContents([...newPageContent])
  }

  const generateRow = (cols, colSizes) => {
    const newRowConfig = initComponent.row(
      cols,
      colSizes,
      pageConfig.content.length + 1
    )
    setPageContents([...pageConfig.content, newRowConfig])
  }

  const confirmContent = (row, item, rowBackground, componentData) => {
    const newPageContent = []

    pageConfig.content.map((rowConfig) => {
      if (rowConfig.position == row) {
        const newRowComponentContent = []
        let newPaddings = {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        }
        rowConfig.contentComponents.map((component) => {
          if (component.position == item) {
            let updatedComponent = {}
            //Check what type the component is and add the content depending on that
            if (component.type == "Text") {
              updatedComponent = { ...componentData, type: component.type }
            }
            if (component.type == "List") {
              updatedComponent = { ...componentData, type: component.type }
            }
            if (component.type == "Image") {
              updatedComponent = { ...componentData, type: component.type }
            }
            if (component.type == "MultiImage") {
              updatedComponent = { ...componentData, type: component.type }
            }

            if (rowConfig.cols == 1) {
              newPaddings.paddingLeft = componentData.paddingLeft
              newPaddings.paddingRight = componentData.paddingRight
              newPaddings.paddingTop = componentData.paddingTop
              newPaddings.paddingBottom = componentData.paddingBottom
            }

            //The line underneath adds the modified component to the row
            newRowComponentContent.push(updatedComponent)
          } else {
            //Push all components to the updated row that are not to be touched
            newRowComponentContent.push(component)
          }
          //Create the new updated row and add the updated components
        })
        const newRowConfig = {
          ...rowConfig,
          parameters: newPaddings,
          background: rowBackground ? rowBackground : "#fff",
          contentComponents: newRowComponentContent,
        }

        //Push the new updated row object to the array of rowConfigs
        newPageContent.push(newRowConfig)
      } else {
        //Push all rowConfigs that are not to be touched to the the pageConfig content
        newPageContent.push(rowConfig)
      }
    })

    setPageContents(newPageContent)
  }

  const deleteContent = (row, item) => {
    const newPageContent = []
    pageConfig.content.map((rowConfig) => {
      if (rowConfig.position != row) {
        newPageContent.push(rowConfig)
      } else {
        const newContentComponents = []
        for (let i = 0; i < rowConfig.contentComponents.length; i++) {
          if (rowConfig.contentComponents[i].position != item) {
            newContentComponents.push(rowConfig.contentComponents[i])
          }
        }
        rowConfig.contentComponents = newContentComponents
        newPageContent.push(rowConfig)
      }
    })
    const newPageConfig = pageConfig
    newPageConfig.content = newPageContent

    setPageContents([...newPageContent])
  }

  const editContent = (row, item, rowNumber) => {
    setRowComponentStatus({
      row: row,
      item: item,
      rowNumber: rowNumber,
    })
  }

  const deleteRowHandler = (rowPosition) => {
    const newPageContent = []
    for (let i = 0; i < pageConfig.content.length; i++) {
      if (pageConfig.content[i].position != rowPosition) {
        newPageContent.push(pageConfig.content[i])
      }
    }
    for (let i = 0; i < newPageContent.length; i++) {
      if (
        newPageContent[i].position > 1 &&
        newPageContent[i].position > rowPosition
      ) {
        newPageContent[i].position = newPageContent[i].position - 1
      }
    }

    setPageContents([...newPageContent])
  }

  const confirmRowChanges = (row, newPosition) => {
    const oldRowPosition = row.position
    const newPageContent = rearangeArray(
      pageConfig.content,
      oldRowPosition,
      newPosition.value
    )

    setPageContents([...newPageContent])
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
        return (
          <RowSettingsManager
            key={"settingsButton" + row.position}
            rowSettings={row}
            row={pageConfig.content[row.position - 1]}
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
