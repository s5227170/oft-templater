import { useEffect, useRef } from "react"
import { Tooltip } from "react-tooltip"

import "react-tooltip/dist/react-tooltip.css"

import highlightFunctions from "../../../util/highlight"

import classes from "./RowSettingsButton.module.scss"

const RowSettingsButton = (props) => {
  const btnRef = useRef()

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.style.position = "absolute"
      btnRef.current.style.left =
        (props.coordinates.right + 20).toString() + "px"
      btnRef.current.style.top =
        (props.coordinates.top + (props.rowHeight - 30) / 2).toString() + "px"
    }
  }, [props.coordinates])

  useEffect(() => {
    const currentItem = document.getElementById("row-" + props.position)
    const rowForItem = document.getElementById("position-" + props.position)
    currentItem.addEventListener(
      "mouseenter",
      highlightFunctions.highlight(rowForItem)
    )

    currentItem.addEventListener(
      "mouseleave",
      highlightFunctions.lowlight(rowForItem)
    )

    return () => {
      window.removeEventListener("mouseenter", highlightFunctions.highlight)
      window.removeEventListener("mouseleave", highlightFunctions.lowlight)
    }
  }, [])

  return (
    <>
      <button
        id={"row-" + props.position}
        data-position={+props.position}
        className={classes.EditSettings}
        ref={btnRef}
        onClick={props.clickHandler}
      >
        {/* <BiMessageRoundedEdit color="#000" size="24" /> */}
        Row {props.position}
        <Tooltip anchorId={"row-" + props.position} place="top">
          Edit row settings
        </Tooltip>
      </button>
      {props.children}
    </>
  )
}

export default RowSettingsButton
