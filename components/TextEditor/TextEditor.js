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
  //The inputData is used to store the actual text data from the input fields
  const [inputData, setInputData] = useState([]);

  const paddingHandler = (e, el) => {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
    const newPaddings = { ...paddings, [el]: e.target.value };

    setPaddings(newPaddings)
  };

  const dataExtractionHandler = (content) => {
    setInputData(content);
  };

  console.log(paddings)

  useEffect(() => {
    if (props.submission) {
      const allData = {
        type: props.componentType,
        paddingLeft: paddings.paddingLeft,
        paddingRight: paddings.paddingRight,
        paddingTop: paddings.paddingTop,
        paddingBottom: paddings.paddingBottom,
        content: inputData,
        position: props.positionData.item,
      };

      props.contentHandler(props.positionData.row, props.positionData.item, allData);
    }
  }, [props.submission]);

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
          <div className={classes.Fields}>
            <ContentInput
              extractData={dataExtractionHandler}
              componentType={props.componentType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
