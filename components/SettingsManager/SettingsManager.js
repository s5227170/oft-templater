import SettingsButton from "../SettingsButton/SettingsButton";
import classes from "./SettingsManager.module.scss";

const SettingsManager = () => {
  return (
    <div className={classes.SettingsManager}>
      <SettingsButton />
    </div>
  );
};

export default SettingsManager;
