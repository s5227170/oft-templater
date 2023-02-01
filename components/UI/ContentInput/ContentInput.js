/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./ContentInput.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import RichTextExample from "../TextFormatter/TextFormatter";

const ContentInput = (props) => {

  return (
    <Fragment>
      <div className={classes.InputWrapper}>
        <h1>Input {props.textId + 1}</h1>
        <div className={classes.Information}>
          <h3>Content area</h3>
          <div className={classes.ControlIcons}>
            <FaInfoCircle
              id={"info" + props.textId}
              color="#000"
              size="30"
              clickable
            />
            <Tooltip
              anchorId={"info" + props.textId}
              place="top"
              events={["click"]}
            >
              <label>
                Write or paste the desired content into the content<br></br>{" "}
                area and format it in the "Preview and format area<br></br> by
                selecting the text and choosing a format option.
              </label>
            </Tooltip>
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
        </div>
        <div className={classes.TextPreviewArea}>
          <RichTextExample />
        </div>
      </div>
    </Fragment>
  );
};

export default ContentInput;
