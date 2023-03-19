import { useId } from "react";
import { Tooltip } from "react-tooltip";

import classes from "./IconButton.module.scss";

const IconButton = (props) => {
  const id = useId()

  return (
    <>
      <button onClick={props.submit} className={classes.IconButton} id={id}>
        {props.icon}
      </button>
      <Tooltip anchorId={id} place="top">
        {props.tooltip}
      </Tooltip>
    </>
  );
};

export default IconButton;
