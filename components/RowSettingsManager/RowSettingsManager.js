import classes from "./RowSettingsManager.module.scss";
import Modal from "../Modal/Modal";
import RowSettingsButton from "../RowSettingsButton/RowSettingsButton";
import { useState } from "react";
import RowSettingsContent from "../RowSettingsContent/RowSettingsContent";

const RowSettingsManager = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const tackleModal = () => {
    setTimeout(() => {
      setModalShow(!modalShow);
    }, 250);
  };

  return (
    <div className={classes.RowSettingsManager}>
      <RowSettingsButton
        elementId={props.row.row}
        coordinates={props.row.coordinates}
        rowHeight={props.row.height}
        clickHandler={tackleModal}
      >
        <Modal modalTackle={tackleModal} modalShow={modalShow}>
          <RowSettingsContent />
        </Modal>
      </RowSettingsButton>
    </div>
  );
};

export default RowSettingsManager;
