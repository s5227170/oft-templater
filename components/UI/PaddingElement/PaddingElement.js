import { useEffect, useRef, useState } from "react";
import classes from "./PaddingElement.module.scss";

const PaddingElement = (props) => {
  //The active property accepts a true/false value
  //and is meant to decide whether other buttons are active.
  //This is done for cases with multiple buttons.

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };

  return (
    <div className={classes.PaddingElement}>
      {props.children}
      <input
        onKeyDown={preventMinus}
        type="number"
        min={0}
        max={600}
        maxLength={3}
        onChange={props.change}
        placeholder="px"
      ></input>
    </div>
  );
};

export default PaddingElement;
