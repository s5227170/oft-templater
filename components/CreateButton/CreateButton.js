import { Fragment, useState } from "react";
import CreateModal from "../CreateModal/CreateModal";

import classes from "./CreateButton.module.scss";
import global from "../../styles/global.module.scss";

const CreateButton = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const tackleModal = () => {
    setTimeout(() => {
      setModalShow(!modalShow);
    }, 750);
  };

  return (
    <div className={classes.CreateButtonWrapper}>
      <button className={classes.CreateButton} onClick={tackleModal}>
        {props.children}
      </button>
      <CreateModal modalShow={modalShow}></CreateModal>
      <div
        className={[
          classes.Backdrop,
          modalShow ? global.openBlock : global.closed,
        ].join(" ")}
        onClick={tackleModal}
      />
    </div>
  );
};

export default CreateButton;
