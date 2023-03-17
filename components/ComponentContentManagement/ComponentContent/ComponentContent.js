import { Tooltip } from "react-tooltip"

import TextEditor from "../../TextEditor/TextEditor"
import ImageEditor from "../../ImageEditor/ImageEditor"
import MultiImageEditor from "../../MultiImageEditor/MultiImageEditor"

import { MdOutlineDeleteOutline } from "react-icons/md"
import { GiConfirmed } from "react-icons/gi"
import { TiArrowMinimise } from "react-icons/ti"
import { CgArrowsExpandLeftAlt } from "react-icons/cg"

import classes from "./ComponentContent.module.scss"
import { useState, useEffect, useRef } from "react"
import { PhotoshopPicker } from "react-color"
import WidthManager from "../../UI/WidthManager/WidthManager"
import ResultHandler from "../../ResultHandler/ResultHandler"

const ComponentContent = (props) => {
  const [submit, setSubmit] = useState(false)
  const [background, setBackground] = useState(props.row.background)
  const [colourOpen, setColourOpen] = useState(false)
  const [position, setPosition] = useState({ row: "", item: "" })
  const [paddings, setPaddings] = useState(null)
  const [contentSize, setContentSize] = useState(0)
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
  }

  const widthErrorHandler = (remainingWidth) => {
    setRemainingWidth(remainingWidth)
  }

  useEffect(() => {
    const row = props.elementPosition.split("#")[0].substr(3)

    const item = props.elementPosition
      .split("#")[1]
      .charAt(props.elementPosition.split("#")[1].length - 1)

    setPosition({ row: row, item: item })
  }, [props.elementPosition])

  useEffect(() => {
    if (messageContent.message.length) {
      tackleModal()
    }
  }, [messageContent.message])

  return (
    <div
      className={classes.ComponentContentWrapper}
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
            color="#008dd7"
            size="15px"
            onMouseDown={props.startResize}
          />
          <Tooltip anchorId="confirm-text" place="top">
            Resize window
          </Tooltip>
        </div>
        <div className={classes.Header}>
          <h1>
            {props.componentType == "Text"
              ? "Text component"
              : props.componentType == "List"
              ? "List component"
              : props.componentType == "Image"
              ? "Image component"
              : props.componentType == "MultiImage"
              ? "Multi image component"
              : ""}
          </h1>
          <div className={classes.EditorIcons}>
            <GiConfirmed
              id="resize-window"
              color="#40CD9A"
              size="25px"
              onClick={preConfirmHandler}
            />
            <Tooltip anchorId="resize-window" place="top">
              Confirm component
            </Tooltip>
            <MdOutlineDeleteOutline
              id="delete-sub-component"
              color="#CE4045"
              size="25px"
              onClick={() => {
                props.deleteFunction(position.row, position.item)
                props.tackleModal()
              }}
            />
            <Tooltip anchorId="delete-sub-component" place="top">
              Delete component
            </Tooltip>

            <TiArrowMinimise
              id="close-modal-text"
              color="#008DD7"
              size="25px"
              onClick={props.tackleModal}
            />
            <Tooltip anchorId="close-modal-text" place="top">
              Close Modal
            </Tooltip>
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
            <h2>Remaining space to fill</h2>
            <WidthManager
              constraintWidth={widthErrorHandler}
              rowSize={props.columnSize}
              paddingLeft={paddings ? paddings.paddingLeft : 0}
              paddingRight={paddings ? paddings.paddingRight : 0}
              componentSize={contentSize}
            />
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
        {props.componentType == "Text" ? (
          <TextEditor
            componentType={props.componentType}
            confirmContent={props.confirmContent}
            submission={submit}
            positionData={position}
            defaultPaddings={props.defaultPaddings}
            columnSize={props.columnSize}
            background={background}
            getPaddings={getPaddings}
            getContentSize={getContentSize}
            resetComponent={() => {
              props.tackleModal(), setSubmit(false)
            }}
            errorBridge={(content) =>
              setmessageContent({ ...messageContent, ...content })
            }
          />
        ) : props.componentType == "List" ? (
          <TextEditor
            componentType={props.componentType}
            confirmContent={props.confirmContent}
            submission={submit}
            positionData={position}
            defaultPaddings={props.defaultPaddings}
            columnSize={props.columnSize}
            background={background}
            getPaddings={getPaddings}
            getContentSize={getContentSize}
            resetComponent={() => {
              props.tackleModal(), setSubmit(false)
            }}
            errorBridge={(content) =>
              setmessageContent({ ...messageContent, ...content })
            }
          />
        ) : props.componentType == "Image" ? (
          <ImageEditor
            componentType={props.componentType}
            confirmContent={props.confirmContent}
            submission={submit}
            positionData={position}
            row={props.row}
            defaultPaddings={props.defaultPaddings}
            columnSize={props.columnSize}
            background={background}
            getPaddings={getPaddings}
            getContentSize={getContentSize}
            resetComponent={() => {
              props.tackleModal(), setSubmit(false)
            }}
            errorBridge={(content) =>
              setmessageContent({ ...messageContent, ...content })
            }
          />
        ) : (
          <MultiImageEditor
            componentType={props.componentType}
            confirmContent={props.confirmContent}
            submission={submit}
            positionData={position}
            row={props.row}
            defaultPaddings={props.defaultPaddings}
            columnSize={props.columnSize}
            background={background}
            getPaddings={getPaddings}
            getContentSize={getContentSize}
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

export default ComponentContent
