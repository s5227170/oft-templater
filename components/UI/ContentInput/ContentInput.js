/* eslint-disable react/no-unescaped-entities */
import { Fragment } from "react";
import classes from "./ContentInput.module.scss";
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
