import { useState } from "react";
import Modal from "../Modal/Modal";

import SettingsButton from "../SettingsButton/SettingsButton";
import SettingsContent from "../SettingsContent/SettingsContent";

import classes from "./SettingsManager.module.scss";

const SettingsManager = () => {
  const [modalShow, setModalShow] = useState(false);

  const tackleModal = () => {
    setTimeout(() => {
      setModalShow(!modalShow);
    }, 250);
  };

  const componentGeneration = () => {
    
  }

  return (
    <div className={classes.SettingsManager}>
      <SettingsButton clickHandler={tackleModal}>
        <Modal modalTackle={tackleModal} modalShow={modalShow}>
          <SettingsContent cancelHandler={tackleModal} confirmHandler={componentGeneration} />
        </Modal>
      </SettingsButton>
    </div>
  );
};

export default SettingsManager;
