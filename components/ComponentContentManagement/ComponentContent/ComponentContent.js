import { Tooltip } from "react-tooltip";

import TextEditor from "../../TextEditor/TextEditor";
import ImageEditor from "../../ImageEditor/ImageEditor";
import MultiImageEditor from "../../MultiImageEditor/MultiImageEditor";

import { MdOutlineDeleteOutline } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti";

import classes from "./ComponentContent.module.scss";
import { useState, useEffect } from "react";
import Dropdown from "../../UI/Dropdown/Dropdown";
import { PhotoshopPicker } from "react-color";

const ComponentContent = (props) => {
  const [submit, setSubmit] = useState(false);
  const [background, setBackground] = useState(props.row.background);
  const [colourOpen, setColourOpen] = useState(false);
  const [position, setPosition] = useState({ row: "", item: "" });

  const colorChoice = (e) => {
    setBackground(e.hex);
  };

  const colorHandler = () => {
    setColourOpen(!colourOpen);
  };

  const preConfirmHandler = () => {
    setSubmit(true);
  };

  useEffect(() => {
    const row = props.elementPosition.split("#")[0].substr(3);

    const item = props.elementPosition
      .split("#")[1]
      .charAt(props.elementPosition.split("#")[1].length - 1);

    setPosition({ row: row, item: item });
  }, [props.elementPosition]);

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
            : props.componentType == "MultiImage"
            ? "Multi image component"
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
            header="Background color"
          />
        ) : null}
      </div>
      {props.componentType == "Text" ? (
        <TextEditor
          componentType={props.componentType}
          contentHandler={props.confirmHandler}
          submission={submit}
          positionData={position}
          defaultPaddings={props.defaultPaddings}
          columnSize={props.columnSize}
          background={background}
        />
      ) : props.componentType == "List" ? (
        <TextEditor
          componentType={props.componentType}
          contentHandler={props.confirmHandler}
          submission={submit}
          positionData={position}
          defaultPaddings={props.defaultPaddings}
          columnSize={props.columnSize}
          background={background}
        />
      ) : props.componentType == "Image" ? (
        <ImageEditor
          componentType={props.componentType}
          contentHandler={props.confirmHandler}
          submission={submit}
          positionData={position}
          row={props.row}
          defaultPaddings={props.defaultPaddings}
          columnSize={props.columnSize}
          background={background}
        />
      ) : (
        <MultiImageEditor
          componentType={props.componentType}
          contentHandler={props.confirmHandler}
          submission={submit}
          positionData={position}
          row={props.row}
          defaultPaddings={props.defaultPaddings}
          columnSize={props.columnSize}
          background={background}
        />
      )}
    </div>
  );
};

export default ComponentContent;
