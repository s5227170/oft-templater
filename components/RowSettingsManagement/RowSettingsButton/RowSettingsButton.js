import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import classes from "./RowSettingsButton.module.scss";
import { useEffect, useRef } from "react";

const RowSettingsButton = (props) => {
  const btnRef = useRef();

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.style.position = "absolute";
      btnRef.current.style.left =
        (props.coordinates.right + 20).toString() + "px";
      btnRef.current.style.top =
        (props.coordinates.top + (props.rowHeight - 30) / 2).toString() + "px";
    }
  }, [props]);
  return (
    <>
      <button id={"row-" + props.position} className={classes.EditSettings} ref={btnRef} onClick={props.clickHandler}>
        {/* <BiMessageRoundedEdit color="#000" size="24" /> */}
        Row {props.position}
        <Tooltip anchorId={"row-" + props.position} place="top">
          Edit row settings
        </Tooltip>
      </button>
      {props.children}
    </>
  );
};

export default RowSettingsButton;
