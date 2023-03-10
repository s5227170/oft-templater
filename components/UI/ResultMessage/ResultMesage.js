import classes from "./ResultMessage.module.scss";

const ResultMessage = (props) => {

  return (
    <label
      className={
        props.message.success
          ? classes.Success
          : props.message.error
          ? classes.Error
          : ""
      }
      {...props}
    >
      {props.message.message}
    </label>
  );
};

export default ResultMessage;
