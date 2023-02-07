import { useState, useEffect } from "react";
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
  //The content state is used to generate the amount of inputs
  const [content, setContent] = useState([]);
  //The inputData is used to store the actual text data from the input fields
  const [inputData, setInputData] = useState([]);

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

  const dataExtractionHandler = (content, index) => {
    //Test to see if state updates properly
    const newArr = inputData;

    let newItem = content;
    newArr[index] = newItem;

    setInputData(newArr);
  };

  useEffect(() => {
    if (props.submit) {
      const allData = {
        type: props.componentType,
        background: elementSettings.background,
        color: elementSettings.color,
        paddingLeft: paddings.paddingLeft,
        paddingRight: paddings.paddingRight,
        paddingTop: paddings.paddingTop,
        paddingBottom: paddings.paddingBottom,
        content: inputData,
        position: props.positionData.item,
      };

      props.contentHandler(allData);
    }
  }, [props.submit]);

  return (
    <div className={classes.TextEditor}>
      <div className={classes.Editor}>
        <div className={classes.Padding}>
          <h2 className={classes.Heading}>Component padding:</h2>
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
            <div>
              <h2 className={classes.Heading}>Content Inputs:</h2>
              <label>
                Each input represents a paragraph on the email. In order to
                avoid unwanted behaviours, follow the instructions.
              </label>
            </div>
            <button onClick={addInputHandler}>
              Add a paragraph
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
                extractData={dataExtractionHandler}
                componentType={props.componentType}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
