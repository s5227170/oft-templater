import { useEffect, useRef, useState } from "react";
import classes from "./RadioButton.module.scss";

const RadioButton = (props) => {

  return (
    <div
      className={
        props.active ? classes.SelectedRadioButton : classes.UnselectedRadioButton
      }
      onClick={props.click}
      ref={props.elementRef}
    >
      {props.children}
    </div>
  );
};

export default RadioButton;
