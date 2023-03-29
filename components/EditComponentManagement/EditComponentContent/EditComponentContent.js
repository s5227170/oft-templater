import { useEffect, useRef, useState } from "react"
import { MdOutlineDeleteOutline, MdTextFields } from "react-icons/md"

import classes from "./EditComponentContent.module.scss"
import TextEditor from "../../TextEditor/TextEditor"
import ImageEditor from "../../ImageEditor/ImageEditor"
import MultiImageEditor from "../../MultiImageEditor/MultiImageEditor"
import { CgArrowsExpandLeftAlt } from "react-icons/cg"
import { Tooltip } from "react-tooltip"
import { GiConfirmed } from "react-icons/gi"
import { TiArrowMinimise } from "react-icons/ti"
import { PhotoshopPicker } from "react-color"
import WidthManager from "../../UI/WidthManager/WidthManager"
import ResultHandler from "../../ResultHandler/ResultHandler"
import IconButton from "../../UI/IconButton/IconButton"

const EditComponentContent = (props) => {
  const component = props.row.contentComponents
    .sort((a, b) => a.position - b.position)
    .find((currentItem) => currentItem.position == props.item)
  const [submit, setSubmit] = useState(false)
  const [background, setBackground] = useState(props.row.background)
  const [colourOpen, setColourOpen] = useState(false)
  const [position, setPosition] = useState({
    row: props.row.position,
    item: props.item,
  })
  const [paddings, setPaddings] = useState(component.paddings)
  const [contentSize, setContentSize] = useState(
    props.row.columnSizes[`col` + props.item.toString()]
  )
  const [remainingWidth, setRemainingWidth] = useState(0)
  const [modalShow, setModalShow] = useState(false)
  const [messageContent, setmessageContent] = useState({
    message: "",
    success: false,
    error: false,
    local: false,
  })

  const tackleModal = () => {
    setTimeout(() => {
      setModalShow(!modalShow)
    }, 250)
  }

  const colorChoice = (e) => {
    setBackground(e.hex)
  }

  const getContentSize = (size) => {
    setContentSize(size)
  }

  const getPaddings = (commponentPaddings) => {
    setPaddings(commponentPaddings)
  }

  const colorHandler = () => {
    setColourOpen(!colourOpen)
  }

  const preConfirmHandler = () => {
    if (component.type == "Image" || component.type == "MultiImage") {
      if (remainingWidth > 0) {
        return setmessageContent({
          ...messageContent,
          message: "There is still available width that requires to be set",
          error: true,
        })
      }
      if (remainingWidth < 0) {
        return setmessageContent({
          ...messageContent,
          message: "Set sizes exceed the size of the component",
          error: true,
        })
      }
      if (remainingWidth == 0) {
        setSubmit(true)
      }
    } else {
      setSubmit(true)
    }
  }

  const widthErrorHandler = (remainingWidth) => {
    setRemainingWidth(remainingWidth)
  }

  useEffect(() => {
    if (messageContent.message.length) {
      tackleModal()
    }
  }, [messageContent.message])

  return (
    <div
      className={classes.EditComponentContentWrapper}
      onMouseMove={props.resizeFrame}
      onMouseUp={props.stopResize}
    >
      <div
        id="component-container"
        className={classes.ComponentContent}
        style={props.boxStyle}
      >
        <div className={classes.Resizer}>
          <CgArrowsExpandLeftAlt
            id="confirm-text"
            color="#40cd9a"
            size="15px"
            onMouseDown={props.startResize}
          />
          <Tooltip anchorId="confirm-text" place="top">
            Resize window
          </Tooltip>
        </div>
        <div className={classes.Header}>
          <h1>
            {component.type == "Text"
              ? "Text component update"
              : component.type == "List"
                ? "List component update"
                : component.type == "Image"
                  ? "Image component update"
                  : component.type == "MultiImage"
                    ? "Multi image component update"
                    : ""}
          </h1>
          <div className={classes.EditorIcons}>
            <IconButton submit={preConfirmHandler} icon={<GiConfirmed
              color="#40CD9A"
              size="25px"
            />} tooltip="Confirm component" />
            <IconButton submit={() => {
              props.deleteFunction(position.row, position.item)
              props.tackleModal()
            }} icon={<MdOutlineDeleteOutline
              color="#CE4045"
              size="25px"
            />} tooltip="Delete component" />
            <IconButton submit={props.tackleModal} icon={<TiArrowMinimise
              color="#008DD7"
              size="25px"
            />} tooltip="Close Modal" />
          </div>
        </div>
        <div className={classes.BackgroundAndSizing}>
          <div className={classes.BackgroundManagement}>
            <h2>Choose row background</h2>
            <div
              style={{ backgroundColor: background }}
              className={classes.CurrentColour}
              onClick={colorHandler}
            ></div>
            {colourOpen ? (
              <PhotoshopPicker
                className={classes.ColourPicker}
                color={background}
                onChangeComplete={(e) => colorChoice(e)}
                onAccept={() => colorHandler()}
                onCancel={() => colorHandler()}
                header="Row background color"
              />
            ) : null}
          </div>
          <div className={classes.SizingManagement}>
            {component.type == "Image" || component.type == "MultiImage" ? (
              <>
                <h2>Remaining space to fill</h2>
                <WidthManager
                  constraintWidth={widthErrorHandler}
                  rowSize={
                    props.edit
                      ? props.row.columnSizes[`col${props.item}`]
                      : props.columnSize
                  }
                  paddingLeft={paddings ? paddings.paddingLeft : 0}
                  paddingRight={paddings ? paddings.paddingRight : 0}
                  componentSize={contentSize}
                />
              </>
            ) : null}
          </div>
        </div>
        {messageContent.message.length ? (
          <ResultHandler
            tackleModal={() => tackleModal()}
            modalShow={modalShow}
            message={messageContent}
            clearMessage={() =>
              setmessageContent({
                message: "",
                success: false,
                error: false,
                local: false,
              })
            }
          />
        ) : null}
        {component.type == "Text" ? (
          <TextEditor
            componentType={component.type}
            confirmContent={props.confirmContent}
            submission={submit}
            positionData={position}
            defaultPaddings={component}
            columnSize={props.columnSize}
            background={background}
            getPaddings={getPaddings}
            getContentSize={getContentSize}
            rowNumber={props.rowNumber}
            item={props.item}
            edit={true}
            row={props.row}
            currentContent={component.content}
            resetComponent={() => {
              props.tackleModal(), setSubmit(false)
            }}
            errorBridge={(content) =>
              setmessageContent({ ...messageContent, ...content })
            }
          />
        ) : component.type == "List" ? (
          <TextEditor
            componentType={component.type}
            confirmContent={props.confirmContent}
            submission={submit}
            positionData={position}
            defaultPaddings={component}
            columnSize={props.columnSize}
            background={background}
            getPaddings={getPaddings}
            getContentSize={getContentSize}
            rowNumber={props.rowNumber}
            item={props.item}
            edit={true}
            row={props.row}
            currentContent={component.content}
            resetComponent={() => {
              props.tackleModal(), setSubmit(false)
            }}
            errorBridge={(content) =>
              setmessageContent({ ...messageContent, ...content })
            }
          />
        ) : component.type == "Image" ? (
          <ImageEditor
            componentType={component.type}
            confirmContent={props.confirmContent}
            submission={submit}
            positionData={position}
            defaultPaddings={component}
            columnSize={props.columnSize}
            background={background}
            getPaddings={getPaddings}
            getContentSize={getContentSize}
            rowNumber={props.rowNumber}
            item={props.item}
            component={component}
            edit={true}
            imgWidth={component.imgWidth}
            row={props.row}
            resetComponent={() => {
              props.tackleModal(), setSubmit(false)
            }}
            errorBridge={(content) =>
              setmessageContent({ ...messageContent, ...content })
            }
          />
        ) : (
          <MultiImageEditor
            componentType={component.type}
            confirmContent={props.confirmContent}
            submission={submit}
            positionData={position}
            defaultPaddings={component}
            columnSize={props.columnSize}
            background={background}
            getPaddings={getPaddings}
            getContentSize={getContentSize}
            rowNumber={props.rowNumber}
            item={props.item}
            edit={true}
            row={props.row}
            resetComponent={() => {
              props.tackleModal(), setSubmit(false)
            }}
            errorBridge={(content) =>
              setmessageContent({ ...messageContent, ...content })
            }
          />
        )}
      </div>
    </div>
  )
}

export default EditComponentContent
