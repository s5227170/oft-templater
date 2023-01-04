import classes from "./ConfirmationButtons.module.scss";

const ConfirmationButtons = (props) => {
  return (
    <div className={classes.ConfirmationButtons}>
      <button onClick={props.confirmClick} className={classes.ConfirmButton}>{props.confirm}</button>
      <button onClick={props.cancelClick} className={classes.CancelButton}>{props.cancel}</button>
    </div>
  );
};

export default ConfirmationButtons;
