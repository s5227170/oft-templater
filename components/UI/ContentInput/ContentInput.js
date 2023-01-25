import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./ContentInput.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const ContentInput = (props) => {
  //The active property accepts a true/false value
  //and is meant to decide whether other buttons are active.
  //This is done for cases with multiple buttons.

  return (
    <Fragment>
      <div>
        <h1>Input {props.textId+1}</h1>
        <h3>Content area</h3>
      </div>
      <div className={classes.Input}>
        <textarea
          value={props.textValue}
          placeholder="Enter a text paragraph"
          onChange={props.inputChange}
        />
        <MdOutlineDelete
          id={"deleteBtnInput" + props.textId}
          color="#000"
          size="30"
          onClick={props.deleteBtn}
        />
        <Tooltip
          anchorId={"deleteBtnInput" + props.textId}
          content="Delete this input"
          place="top"
        />
      </div>
      <div className={classes.TextPreviewArea}>
        <h3>Preview area</h3>
        <div className={classes.TextContent}>{props.textValue}</div>
      </div>
    </Fragment>
  );
};

export default ContentInput;
