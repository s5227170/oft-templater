import { RxPadding } from "react-icons/rx";
import { BiMessageRoundedEdit } from "react-icons/bi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import classes from "./RowSettingsButton.module.scss";
import Modal from "../Modal/Modal";
import { useEffect, useRef } from "react";

const RowSettingsButton = (props) => {
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.style.position = "absolute";
      btnRef.current.style.left =
        (props.coordinates.right + 20).toString() + "px";
      btnRef.current.style.top =
        (props.coordinates.top + props.rowHeight /2.3).toString() + "px";
    }
  }, [props]);
  return (
    <>
      <button className={classes.EditSettings} ref={btnRef} onClick={props.clickHandler}>
        <BiMessageRoundedEdit id={props.elementId} color="#000" size="24" />
        <Tooltip anchorId={props.elementId} place="top">
          Edit row settings
        </Tooltip>
      </button>
      {props.children}
    </>
  );
};

export default RowSettingsButton;
