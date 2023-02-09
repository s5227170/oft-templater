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
        <h1 className={classes.Heading}>Text editor</h1>
        <div className={classes.TextPreviewArea}>
          <RichTextExample
            extractData={props.extractData}
            index={props.textId}
            componentType={props.componentType}
            positionData={props.positionData}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ContentInput;
