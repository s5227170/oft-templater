import classes from "./CustomInput.module.scss";

const CustomInput = (props) => {
  return (
    <div className={classes.InputWrapper}>
      <input {...props} />
      <span style={props.style}></span>
    </div>
  );
};

export default CustomInput;
