import classes from "./AlignType.module.scss";

const AlignType = (props) => {
  return (
    <div className={classes.AlignType} onClick={props.onClick}>
      <label>{props.title}</label>
      {props.confirm}
    </div>
  );
};

export default AlignType;
