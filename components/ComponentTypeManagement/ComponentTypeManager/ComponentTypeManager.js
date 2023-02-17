import { useState } from "react";
import Modal from "../../Modal/Modal";
import ComponentTypeButton from "../ComponentTypeButton/ComponentTypeButton";
import ComponentTypeContent from "../ComponentTypeContent/ComponentTypeContent";

import classes from "./ComponentTypeManager.module.scss";

const ComponentTypeManager = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const tackleModal = () => {
    setTimeout(() => {
      setModalShow(!modalShow);
    }, 250);
  };

  return (
    <div className={classes.SettingsManager}>
      <ComponentTypeButton clickHandler={tackleModal}>
        <Modal tackleModal={tackleModal} modalShow={modalShow}>
          <ComponentTypeContent
            cancelHandler={tackleModal}
            confirmHandler={props.componentGeneration}
            elementPosition={props.elementPosition}
            rowColumns={props.rowColumns}
          />
        </Modal>
      </ComponentTypeButton>
    </div>
  );
};

export default ComponentTypeManager;
