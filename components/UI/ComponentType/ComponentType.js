import classes from "./ComponentType.module.scss";

const ComponentType = (props) => {

  return (
    <div className={classes.ComponentType} onClick={props.onClick}>
      <h2>{props.title}</h2>
      {props.icon}
      {props.confirm}
    </div>
  );
};

export default ComponentType;
