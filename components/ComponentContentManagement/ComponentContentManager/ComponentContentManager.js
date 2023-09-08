import { useState } from "react"
import Modal from "../../Modal/Modal"

import ComponentContentButton from "../ComponentContentButton/ComponentContentButton"
import ComponentContent from "../ComponentContent/ComponentContent"

import classes from "./ComponentContentManager.module.scss"

const ComponentContentManager = (props) => {
  // const [modalShow, setModalShow] = useState(false)
  // const [drag, setDrag] = useState({
  //   active: false,
  //   x: "",
  // })
  // const [dims, setDims] = useState({
  //   w: 620,
  // })

  // const tackleModal = () => {
  //   setTimeout(() => {
  //     setModalShow(!modalShow)
  //   }, 250)
  // }

  // const resizeFrame = (e) => {
  //   const { active, x } = drag
  //   if (active) {
  //     const xDiff = Math.abs(x - e.clientX)
  //     const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff

  //     setDrag({ ...drag, x: e.clientX })
  //     setDims({ w: newW })
  //   }
  // }

  // const stopResize = (e) => {
  //   setDrag({ ...drag, active: false })
  // }

  // const startResize = (e) => {
  //   setDrag({
  //     active: true,
  //     x: e.clientX,
  //   })
  // }

  // const boxStyle = {
  //   width: `${dims.w}px`,
  //   minWidth: props.componentType == "Image" ? 750 : "auto",
  // }

  const manageComponent = () => {
    // const componentData = {
    //   columnSize: props.columnSize,
    //   defaultPaddings: props.defaultPaddings,
    //   componentType: props.componentType,
    //   elementPosition: props.elementPosition,
    //   row: props.row,
    //   currentColours: props.currentColours,
    //   setColours: props.setColours,
    // }
    // console.log(props.elementPosition)

    //All data required for component edit should go in this function
    //Modal should be removed, and then the whole process tested
    //If this proves successful, persistent data can be utilised
    //Some attributes may be unnecessary since they can be extracted from the outer component, an example is the default padding
    props.takeComponent(props.elementPosition)
  }

  return (
    <div className={classes.ComponentContentManager}>
      <ComponentContentButton
        clickHandler={manageComponent}
        type={props.componentType}
      >
        {/* <Modal tackleModal={tackleModal} modalShow={modalShow} componentMode>
          <ComponentContent
            columnSize={props.columnSize}
            defaultPaddings={props.defaultPaddings}
            componentType={props.componentType}
            tackleModal={tackleModal}
            confirmContent={props.confirmContent}
            elementPosition={props.elementPosition}
            deleteFunction={props.deleteFunction}
            row={props.row}
            boxStyle={boxStyle}
            startResize={startResize}
            resizeFrame={resizeFrame}
            stopResize={stopResize}
            currentColours={props.currentColours}
            setColours={props.setColours}
          />
        </Modal> */}
      </ComponentContentButton>
    </div>
  )
}

export default ComponentContentManager
