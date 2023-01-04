import { Fragment, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import EditModal from "../EditModal/EditModal";

import classes from "./SettingsButton.module.scss";

const SettingsButton = () => {
  const [modalShow, setModalShow] = useState(false);

  const tackleModal = () => {
    setTimeout(() => {
      setModalShow(!modalShow);
    }, 250);
  };

  return (
    <Fragment>
      <button onClick={tackleModal} className={classes.SettingsButton}>
        <VscSettings color="#CE4045" size="25px" />
      </button>
      {modalShow ? (
        <EditModal modalTackle={tackleModal} modalShow={modalShow}></EditModal>
      ) : null}
      {modalShow ? (
        <div
          className={[
            classes.Backdrop,
            modalShow ? global.openBlock : global.closed,
          ].join(" ")}
          onClick={tackleModal}
        />
      ) : null}
    </Fragment>
  );
};

export default SettingsButton;
