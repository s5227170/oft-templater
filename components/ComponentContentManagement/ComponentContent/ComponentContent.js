import { Tooltip } from "react-tooltip";

import TextEditor from "../../TextEditor/TextEditor";
import ImageEditor from "../../ImageEditor/ImageEditor";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti";

import classes from "./ComponentContent.module.scss";
import { useState, useEffect } from "react";

const ComponentContent = (props) => {
  const [submit, setSubmit] = useState(false);
  const [position, setPosition] = useState({ row: "", item: "" });

  useEffect(() => {
    const row = props.elementPosition
      .split("#")[0]
      .charAt(props.elementPosition.split("#")[0].length - 1);
    const item = props.elementPosition
      .split("#")[1]
      .charAt(props.elementPosition.split("#")[1].length - 1);

    setPosition({ row: row, item: item });
  }, [props.elementPosition]);

  const preConfirmHandler = () => {
    setSubmit(true);
  };

  return (
    <div className={classes.ComponentContent}>
      <div className={classes.Header}>
        <h1>
          {props.componentType == "Text"
            ? "Text component"
            : props.componentType == "List"
            ? "List component"
            : props.componentType == "Image"
            ? "Image component"
            : ""}
        </h1>
        <div className={classes.EditorIcons}>
          <GiConfirmed
            id="confirm-text"
            color="#40CD9A"
            size="25px"
            onClick={preConfirmHandler}
          />
          <Tooltip anchorId="confirm-text" place="top">
            Confirm text component
          </Tooltip>
          <MdOutlineDeleteOutline
            id="delete-sub-component"
            color="#CE4045"
            size="25px"
            onClick={() => {
              props.deleteFunction(position.row, position.item);
              props.cancelHandler();
            }}
          />
          <Tooltip anchorId="delete-sub-component" place="top">
            Delete component
          </Tooltip>

          <TiArrowMinimise
            id="close-modal-text"
            color="#008DD7"
            size="25px"
            onClick={props.cancelHandler}
          />
          <Tooltip anchorId="close-modal-text" place="top">
            Close Modal
          </Tooltip>
        </div>
      </div>
      {props.componentType == "Text" ? (
        <TextEditor
          componentType={props.componentType}
          contentHandler={props.confirmHandler}
          submission={submit}
          positionData={position}
        />
      ) : props.componentType == "List" ? (
        <TextEditor
          componentType={props.componentType}
          contentHandler={props.confirmHandler}
          submission={submit}
          positionData={position}
        />
      ) : (
        <ImageEditor
          componentType={props.componentType}
          contentHandler={props.confirmHandler}
          submission={submit}
          positionData={position}
          row={props.row}
        />
      )}
    </div>
  );
};

export default ComponentContent;
