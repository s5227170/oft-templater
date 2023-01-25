import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineDeleteForever } from "react-icons/md";

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
          <MdOutlineDeleteForever color="#CE4045" size="30px" />
          <AiOutlineClose color="#000" size="30px" />
        </div>
      </div>
      <TextEditor />
    </div>
  );
};

export default ComponentContent;
