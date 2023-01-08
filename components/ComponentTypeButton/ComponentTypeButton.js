import { BiCodeAlt } from "react-icons/bi";

import classes from "./ComponentTypeButton.module.scss";

const ComponentTypeButton = (props) => {


  return (
    <div className={classes.SettingsButtonWrapper}>
      <button onClick={props.clickHandler} className={classes.SettingsButton}>
        <BiCodeAlt color="#CE4045" size="25px" />
      </button>
      {props.children}
    </div>
  );
};

export default ComponentTypeButton;
