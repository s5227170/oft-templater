/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./ContentInput.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";
import RichTextExample from "../TextFormatter/TextFormatter";

const ContentInput = (props) => {
  const [selected, setSelected] = useState();
  const [toChange, setToChange] = useState();

  const handleSelect = (e) => {
    const constraint = document.getElementById("experiment");
    const constraintTwo = document.querySelector("#experiment b");
    const constraintThree = document.getElementById("experiment").innerText;
    if (
      e.target == constraint ||
      e.target == constraintTwo ||
      e.target == constraintThree
    ) {
      let t = document.getSelection();
      setSelected(t);
    }
  };

  // const handleSelectSubmit = () => {
  //   const constraint = document.getElementById("experiment");
  //   if (!selected) {
  //     return;
  //   }

  //   if (
  //     selected.focusNode.parentNode == constraint ||
  //     selected.focusNode.parentNode.parentNode == constraint
  //   ) {
  //     let selectionText = selected.toString();
  //     selectionText.replace(" ", `&nbsp;`);

  //     let range = selected.getRangeAt(0);

  //     console.log(selected);
  //     console.log(range);

  //     let bold = document.createElement("b");
  //     bold.textContent = selectionText;

  //     if (
  //       selected.focusNode.parentNode.nodeName != "B" &&
  //       selected.anchorNode.parentNode.nodeName == "B"
  //     ) {
  //       bold.textContent = selectionText;
  //       range.deleteContents();
  //       range.insertNode(bold);
  //     } else if (
  //       selected.focusNode.parentNode.nodeName == "B" &&
  //       selected.anchorNode.parentNode.nodeName != "B"
  //     ) {
  //       range.deleteContents();
  //       range.insertNode(bold);
  //     } else if (
  //       selected.focusNode.parentNode.nodeName == "B" ||
  //       selected.anchorNode.parentNode.nodeName == "B"
  //     ) {
  //       for (let i = 0; i < constraint.childNodes.length; i++) {
  //         if (
  //           constraint.childNodes[0].parentNode.childNodes[i] ==
  //             selected.anchorNode.parentNode ||
  //           constraint.childNodes[0].parentNode.childNodes[i] ==
  //             selected.focusNode.parentNode
  //         ) {
  //           let text = document.createTextNode(selectionText);
  //           const fullLength = range.commonAncestorContainer.length;
  //           let targetStart = 0;
  //           let targetEnd = 0;
  //           let targetLength = 0;

  //           if (selected.focusOffset > selected.anchorOffset) {
  //             targetStart = selected.anchorOffset;
  //             targetEnd = selected.focusOffset;
  //             targetLength = selected.focusOffset - selected.anchorOffset;
  //           } else {
  //             targetStart = selected.focusOffset;
  //             targetEnd = selected.anchorOffset;
  //             targetLength = selected.anchorOffset - selected.focusOffset;
  //           }
  //           const leftSide = range.commonAncestorContainer.data.substr(
  //             0,
  //             targetStart
  //           );
  //           const rightSide = range.commonAncestorContainer.data.substr(
  //             targetEnd,
  //             fullLength - targetEnd
  //           );
  //           const content = range.commonAncestorContainer.data.substr(
  //             targetStart,
  //             targetLength
  //           );

  //           const unboldedContent = document.createTextNode(content);
  //           const leftBoldSide = document.createElement("b");
  //           leftBoldSide.textContent = leftSide;
  //           const rightBoldSide = document.createElement("b");
  //           rightBoldSide.textContent = rightSide;

  //           console.log(leftBoldSide);
  //           console.log(unboldedContent);
  //           console.log(rightBoldSide);

  //           constraint.childNodes[0].parentNode.replaceChild(
  //             leftBoldSide,
  //             constraint.childNodes[0].parentNode.childNodes[i]
  //           );

  //           leftBoldSide.after(unboldedContent, rightBoldSide);

  //           console.log(leftBoldSide);
  //         }
  //       }
  //     } else {
  //       range.deleteContents();
  //       range.insertNode(bold);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   const target = document.getElementById("experiment");
  //   target.innerText = props.textValue;
  // }, [props.textValue]);

  return (
    <Fragment>
      <div className={classes.InputWrapper}>
        <h1>Input {props.textId + 1}</h1>
        <div className={classes.Information}>
          <h3>Content area</h3>
          <div className={classes.ControlIcons}>
            <FaInfoCircle
              id={"info" + props.textId}
              color="#000"
              size="30"
              clickable
            />
            <Tooltip
              anchorId={"info" + props.textId}
              place="top"
              events={["click"]}
            >
              <label>
                Write or paste the desired content into the content<br></br>{" "}
                area and format it in the "Preview and format area<br></br> by
                selecting the text and choosing a format option.
              </label>
            </Tooltip>
            <MdOutlineDelete
              id={"deleteBtnInput" + props.textId}
              color="#000"
              size="30"
              onClick={props.deleteBtn}
            />
            <Tooltip
              anchorId={"deleteBtnInput" + props.textId}
              content="Delete this input"
              place="top"
            />
          </div>
        </div>
        <div className={classes.Input}>
          <textarea
            value={props.textValue}
            placeholder="Enter a text paragraph"
            onChange={props.inputChange}
          />
        </div>
        <div className={classes.TextPreviewArea}>
          {/* <div className={classes.Information}>
            <h3>Preview and format area</h3>
            <div className={classes.ControlIcons}>
              <FaInfoCircle
                id={"info-content" + props.textId}
                color="#000"
                size="30"
                clickable
              />
              <Tooltip
                anchorId={"info-content" + props.textId}
                place="top"
                events={["click"]}
              >
                <label>
                  Paste all the text before formatting. If multiple words aren't
                  <br></br>
                  getting their format settings applied, either paste the text
                  <br></br>
                  again, or try to format each word separately.
                </label>
              </Tooltip>
            </div>
          </div>
          <button onClick={handleSelectSubmit}>Make bold</button>
          <div id="formatter" className={classes.Formatter}>
            <div
              id="experiment"
              className={classes.Experiment}
              onMouseUp={(e) => handleSelect(e)}
              onDoubleClick={(e) => handleSelect(e)}
            ></div>
          </div> */}
          <RichTextExample />

        </div>
      </div>
    </Fragment>
  );
};

export default ContentInput;
