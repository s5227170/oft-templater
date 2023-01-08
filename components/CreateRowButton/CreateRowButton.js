
import classes from "./CreateRowButton.module.scss";

const CreateRowButton = (props) => {

  return (
    <div className={classes.CreateButtonWrapper}>
      <button className={classes.CreateButton} onClick={props.clickHandler}>
        +
      </button>
      {props.children}
    </div>
  );
};

export default CreateRowButton;
