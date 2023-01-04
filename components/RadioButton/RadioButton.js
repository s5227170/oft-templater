import { useEffect, useState } from "react";
import classes from "./RadioButton.module.scss";

const RadioButton = (props) => {
  //The active property accepts a true/false value
  //and is meant to decide whether other buttons are active.
  //This is done for cases with multiple buttons.

  return (
    <div
      className={
        props.active ? classes.SelectedRadioButton : classes.UnselectedRadioButton
      }
      onClick={props.click}
    >
      {props.children}
    </div>
  );
};

export default RadioButton;
