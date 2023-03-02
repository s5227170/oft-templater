import classes from "./Modal.module.scss";

import global from "../../styles/global.module.scss";

const Modal = (props) => {
  return (
    <>
      <div
        className={[
          props.modalShow ? global.openFlex : global.closed,
          classes.Modal,
        ].join(" ")}
      >
        {props.modalShow ? props.children : null}
      </div>
      {props.modalShow ? (
        <div
          className={[
            classes.Backdrop,
            props.modalShow ? global.openBlock : global.closed,
          ].join(" ")}
          onClick={props.tackleModal}
        />
      ) : null}
    </>
  );
};

export default Modal;
