import classes from "./HigherManagementButton.module.scss";

const HigherManagementButton = (props) => {

    const submitHandler = () => {

    }

  return (
    <button onClick={props.submitHandler} className={classes.HigherManagementButton}>
      {props.children}
    </button>
  );
};

export default HigherManagementButton;
