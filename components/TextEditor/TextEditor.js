import { useState, useEffect, useRef } from "react";
import PaddingElement from "../UI/PaddingElement/PaddingElement";
import classes from "./TextEditor.module.scss";

import {
  AiOutlineBorderLeft,
  AiOutlineBorderRight,
  AiOutlineBorderTop,
  AiOutlineBorderBottom,
} from "react-icons/ai";
import ContentInput from "../UI/ContentInput/ContentInput";
import AlignType from "../UI/AlignType/AlignType";
import RadioButton from "../UI/RadioButton/RadioButton";

const TextEditor = (props) => {
  const [paddings, setPaddings] = useState({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });
  const [componentChoice, setComponentChoice] = useState({
    topAlign: false,
    middleAlign: false,
    bottomAlign: false,
  });
  const [inputData, setInputData] = useState([]);

  const topAlignRef = useRef(null);
  const middleAlignRef = useRef(null);
  const bottomAlignRef = useRef(null);

  const buttonChoiceTrigger = (name) => {
    const newComponentChoice = Object.assign({}, componentChoice);
    for (let el in newComponentChoice) {
      newComponentChoice[el] = false;
    }
    newComponentChoice[name] = true;
    setComponentChoice(newComponentChoice);
  };

  const typeClickHandler = (type) => {
    if (type == 1) {
      if (topAlignRef) {
        topAlignRef.current.click();
      }
    }
    if (type == 2) {
      if (middleAlignRef) {
        middleAlignRef.current.click();
      }
    }
    if (type == 3) {
      if (bottomAlignRef) {
        bottomAlignRef.current.click();
      }
    }
  };

  const paddingHandler = (e, el) => {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
    const newPaddings = { ...paddings, [el]: e.target.value };

    setPaddings(newPaddings);
  };

  const dataExtractionHandler = (content) => {
    setInputData(content);
  };

  useEffect(() => {
    if (props.submission) {
      let alignment = "";
      if (componentChoice.topAlign) {
        alignment = "top";
      }
      if (componentChoice.middleAlign) {
        alignment = "middle";
      }
      if (componentChoice.bottomAlign) {
        alignment = "bottom";
      }
      const allData = {
        type: props.componentType,
        paddingLeft: paddings.paddingLeft,
        paddingRight: paddings.paddingRight,
        paddingTop: paddings.paddingTop,
        paddingBottom: paddings.paddingBottom,
        content: inputData,
        position: props.positionData.item,
        VerticalAlign: alignment,
      };

      props.contentHandler(
        props.positionData.row,
        props.positionData.item,
        allData
      );
    }
  }, [props.submission]);

  useEffect(() => {
    if (props.defaultPaddings.paddingLeft > 0 ||
      props.defaultPaddings.paddingRight > 0 ||
      props.defaultPaddings.paddingTop > 0 ||
      props.defaultPaddings.paddingBottom > 0) {
      setPaddings(props.defaultPaddings)
    }
  }, [props.defaultPaddings])

  return (
    <div className={classes.TextEditor}>
      <div className={classes.Editor}>
        <div className={classes.Padding}>
          <h2 className={classes.Heading}>Component padding:</h2>
          <div className={classes.PaddingInputs}>
            <PaddingElement change={(e) => paddingHandler(e, "paddingLeft")} value={paddings.paddingLeft}>
              <AiOutlineBorderLeft color="#000" size="40" />
            </PaddingElement>
            <PaddingElement change={(e) => paddingHandler(e, "paddingRight")} value={paddings.paddingRight}>
              <AiOutlineBorderRight color="#000" size="40" />
            </PaddingElement>
            <PaddingElement change={(e) => paddingHandler(e, "paddingTop")} value={paddings.paddingTop}>
              <AiOutlineBorderTop color="#000" size="40" />
            </PaddingElement>
            <PaddingElement change={(e) => paddingHandler(e, "paddingBottom")} value={paddings.paddingBottom}>
              <AiOutlineBorderBottom color="#000" size="40" />
            </PaddingElement>
          </div>
        </div>
        <div className={classes.VerticalAlign}>
          <h2>Vertical text align</h2>
          <div className={classes.AlignOptions}>
            <AlignType
              title="Top alignment"
              onClick={() => typeClickHandler(1)}
              confirm={
                <RadioButton
                  click={() => buttonChoiceTrigger("topAlign")}
                  active={componentChoice.topAlign}
                  elementRef={topAlignRef}
                />
              }
            />
            <AlignType
              title="Middle alignment"
              onClick={() => typeClickHandler(2)}
              confirm={
                <RadioButton
                  click={() => buttonChoiceTrigger("middleAlign")}
                  active={componentChoice.middleAlign}
                  elementRef={middleAlignRef}
                />
              }
            />
            <AlignType
              title="Bottom alignment"
              onClick={() => typeClickHandler(3)}
              confirm={
                <RadioButton
                  click={() => buttonChoiceTrigger("bottomAlign")}
                  active={componentChoice.bottomAlign}
                  elementRef={bottomAlignRef}
                />
              }
            />
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
