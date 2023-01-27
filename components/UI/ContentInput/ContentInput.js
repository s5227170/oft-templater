/* eslint-disable react/no-unescaped-entities */
import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./ContentInput.module.scss";
import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

const ContentInput = (props) => {
  const [selected, setSelected] = useState();

  const handleSelect = (e) => {
    function getSelectedText() {
      const constraint = document.getElementById("experiment");
      if (e.target == constraint) {
        let t = document.all
          ? document.selection.createRange().text
          : document.getSelection();
        console.log("test");
        setSelected(t);
      }
    }

    getSelectedText();
  };

  const handleSelectSubmit = () => {
    if (!selected) {
      return;
    }

    let selectionText = selected.toString();

    let bold = document.createElement("b");
    bold.textContent = selectionText;

    let range = selected.getRangeAt(0);
    range.deleteContents();
    range.insertNode(bold);
  };

  // const deletionHandler = (e) => {
  //   console.log(e);
  //   if (e.code === "Backspace") {
  //     if (!selected) {
  //       return;
  //     }
  //     let selectionText = selected.toString();

  //     let bold = document.createElement("b");
  //     bold.textContent = selectionText;

  //     let range = selected.getRangeAt(0);
  //     range.deleteContents();
  //     range.insertNode(bold);
  //   }
  // };

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
          // onKeyDown={(e) => deletionHandler(e)}
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
          ></div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentInput;
