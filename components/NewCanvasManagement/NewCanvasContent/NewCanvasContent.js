import { useRef, useState } from "react";
import { MdTextFields } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { BsImage } from "react-icons/bs";
import { ImImages } from "react-icons/im";

import ConfirmationButtons from "../../UI/ConfirmationButtons/ConfirmationButtons";
import ComponentType from "../../UI/ComponentType/ComponentType";
import RadioButton from "../../UI/RadioButton/RadioButton";

import classes from "./NewCanvasContent.module.scss";

const NewCanvasContent = (props) => {
  return (
    <div className={classes.NewCanvasContent}>
      <h1>Are you sure you want to reset the canvas?</h1>
      <ConfirmationButtons
        confirmClick={() => {
          props.confirmHandler(true), props.cancelHandler();
        }}
        cancelClick={props.cancelHandler}
        confirm="Confirm"
        cancel="Cancel"
      />
    </div>
  );
};

export default NewCanvasContent;
