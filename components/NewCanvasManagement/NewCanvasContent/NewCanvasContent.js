import { useState } from "react";

import ConfirmationButtons from "../../UI/ConfirmationButtons/ConfirmationButtons";

import classes from "./NewCanvasContent.module.scss";

const NewCanvasContent = (props) => {
  const [loading, setLoading] = useState(false)
  return (
    <div className={classes.NewCanvasContent}>
      <h1>Are you sure you want to reset the canvas?</h1>
      <ConfirmationButtons
        loading={loading}
        confirmClick={() => {
          setLoading(true);
          props.confirmHandler(true);
          props.cancelHandler();
        }}
        cancelClick={props.cancelHandler}
        confirm="Confirm"
        cancel="Cancel"
      />
    </div>
  );
};

export default NewCanvasContent;
