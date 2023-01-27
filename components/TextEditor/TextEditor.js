import { useState } from "react";
import PaddingElement from "../UI/PaddingElement/PaddingElement";
import classes from "./TextEditor.module.scss";

import {
  AiOutlineBorderLeft,
  AiOutlineBorderRight,
  AiOutlineBorderTop,
  AiOutlineBorderBottom,
} from "react-icons/ai";
import ContentInput from "../UI/ContentInput/ContentInput";
import { CgAddR } from "react-icons/cg";
import { Tooltip } from "react-tooltip";

const TextEditor = (props) => {
  const [paddings, setPaddings] = useState({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });
  const [content, setContent] = useState([]);

  const paddingHandler = (e, el) => {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
    const newPaddings = { ...paddings, [el]: e.target.value };
  };

  const addInputHandler = () => {
    const newContent = [...content];
    newContent.push("");
    setContent(newContent);
  };

  const textHandler = (e, index) => {
    const newContent = [...content];
    newContent[index] = e.target.value;
    setContent(newContent);
  };

  const deleteText = (index) => {
    const newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };

  //Use this code to return the selected text
  //window.getSelection().toString(); OR document.selection.createRange().htmlText for Internet Explorer
  //Use it to search through the string

  return (
    <div className={classes.TextEditor}>
      <div className={classes.Editor}>
        <div className={classes.Padding}>
          <h2>Component padding:</h2>
          <div className={classes.PaddingInputs}>
            <PaddingElement change={(e) => paddingHandler(e, "paddingLeft")}>
              <AiOutlineBorderLeft color="#000" size="40" />
            </PaddingElement>
            <PaddingElement change={(e) => paddingHandler(e, "paddingRight")}>
              <AiOutlineBorderRight color="#000" size="40" />
            </PaddingElement>
            <PaddingElement change={(e) => paddingHandler(e, "paddingTop")}>
              <AiOutlineBorderTop color="#000" size="40" />
            </PaddingElement>
            <PaddingElement change={(e) => paddingHandler(e, "paddingBottom")}>
              <AiOutlineBorderBottom color="#000" size="40" />
            </PaddingElement>
          </div>
        </div>
        <div className={classes.Inputs}>
          <div className={classes.Header}>
            <h2>Content Inputs:</h2>
            <button onClick={addInputHandler}>
              Add an input
              <CgAddR
                id="addBtnInput"
                color="#fff"
                size="20"
                onClick={props.addBtn}
              />
            </button>
          </div>
          <div className={classes.Fields}>
            {/* implement input generation */}
            {content.map((input, index) => (
              <ContentInput
                key={"input" + index}
                inputChange={(e) => textHandler(e, index)}
                deleteBtn={() => deleteText(index)}
                textId={index}
                textValue={content[index]}
              />
            ))}
          </div>
          
        </div>
      </div>
      <div className={classes.Options}></div>
    </div>
  );
};

export default TextEditor;
