import classes from "./ResultMassage.module.scss";

const ResultMassage = (props) => {

  return (
    <label
      className={
        props.massage.success
          ? classes.Success
          : props.massage.error
          ? classes.Error
          : ""
      }
      {...props}
    >
      {props.massage.massage}
    </label>
  );
};

export default ResultMassage;
