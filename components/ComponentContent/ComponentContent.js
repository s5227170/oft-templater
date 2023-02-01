import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineDeleteForever, MdDoneOutline } from "react-icons/md";
import { Tooltip } from "react-tooltip";

import TextEditor from "../TextEditor/TextEditor";

import classes from "./ComponentContent.module.scss";

const ComponentContent = (props) => {
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
          <MdDoneOutline id="confirm-text" color="#40CD9A" size="30px" />
          <Tooltip
            anchorId="confirm-text"
            place="top"
          >Confirm text component</Tooltip>
          <MdOutlineDeleteForever
            id="delete-sub-component"
            color="#CE4045"
            size="30px"
          />
          <Tooltip
            anchorId="delete-sub-component"
            place="top"
          >Delete component</Tooltip>

          <AiOutlineClose id="close-modal-text" color="#000" size="30px" />
          <Tooltip
            anchorId="close-modal-text"
            place="top"
          >Close Modal</Tooltip>
        </div>
      </div>
      <TextEditor />
    </div>
  );
};

export default ComponentContent;
