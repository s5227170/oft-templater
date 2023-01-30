/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./ContentInput.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

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

  const handleSelectSubmit = () => {
    const constraint = document.getElementById("experiment");
    if (!selected) {
      return;
    }

    if (
      selected.focusNode.parentNode == constraint ||
      selected.focusNode.parentNode.parentNode == constraint
    ) {
      let selectionText = selected.toString();
      selectionText.replace(" ", `&nbsp;`);

      let range = selected.getRangeAt(0);
      console.log(range.startContainer.parentNode)

      if (selected.focusNode.parentNode.nodeName == "B") {
        const clearText = range.startContainer.innerText;
        let text = document.createTextNode(clearText);
        // range.deleteContents();
        constraint.parentNode.childNodes[0].replaceChild(text, range.startContainer.parentNode);
      } else {
        let bold = document.createElement("b");
        bold.textContent = selectionText;
        range.deleteContents();
        range.insertNode(bold);
      }
    }
  };

  useEffect(() => {
    const target = document.getElementById("experiment");
    target.innerText = props.textValue;
  }, [props.textValue]);

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
                selecting the text and choosing a format option
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
      </div>
      <div className={classes.Input}>
        <textarea
          value={props.textValue}
          placeholder="Enter a text paragraph"
          onChange={props.inputChange}
        />
      </div>
      <div className={classes.TextPreviewArea}>
        <h3>Preview and format area</h3>
        <button onClick={handleSelectSubmit}>Make bold</button>
        <div id="formatter" className={classes.Formatter}>
          {/* Add an onMouseUp on this field only since when a person is editing the text,  */}
          {/* they select it in the textarea, and then that one is selected. We must keep the selection to this component */}
          <div
            id="experiment"
            className={classes.Experiment}
            onMouseUp={(e) => handleSelect(e)}
            onDoubleClick={(e) => handleSelect(e)}
          ></div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentInput;
