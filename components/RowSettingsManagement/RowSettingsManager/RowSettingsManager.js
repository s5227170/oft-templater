import classes from "./RowSettingsManager.module.scss";
import Modal from "../../Modal/Modal";
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
        position={props.rowSettings.position}
        coordinates={props.rowSettings.coordinates}
        rowHeight={props.rowSettings.height}
        clickHandler={tackleModal}
      >
        <Modal tackleModal={tackleModal} modalShow={modalShow}>
          <RowSettingsContent
            tackleModal={tackleModal}
            confirmRowChanges={props.confirmRowChanges}
            position={props.rowSettings.position}
            deleteRowHandler={props.deleteRowHandler}
            row={props.row}
            positionOptions={props.positionOptions}
            deleteComponent={props.deleteComponent}
            editComponent={props.editContent}
            tackleEditModal={props.tackleEditModal}
          />
        </Modal>
      </RowSettingsButton>
    </div>
  );
};

export default RowSettingsManager;
