import classes from "./ComponentType.module.scss";

const ComponentType = (props) => {

  return (
    <div className={classes.ComponentType}>
      <h2>{props.title}</h2>
      {props.icon}
      {props.confirm}
    </div>
  );
};

export default ComponentType;
