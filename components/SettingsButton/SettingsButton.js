import { VscSettings } from "react-icons/vsc";

import classes from "./SettingsButton.module.scss";

const SettingsButton = (props) => {


  return (
    <div className={classes.SettingsButtonWrapper}>
      <button onClick={props.clickHandler} className={classes.SettingsButton}>
        <VscSettings color="#CE4045" size="25px" />
      </button>
      {props.children}
    </div>
  );
};

export default SettingsButton;
