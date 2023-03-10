import ResultMessage from "../UI/ResultMessage/ResultMesage";
import Modal from "../Modal/Modal";

import classes from "./ResultHandler.module.scss";

const ResultHandler = (props) => {

  return (
    <Modal tackleModal={props.tackleModal} modalShow={props.modalShow}>
      <div className={classes.ResultHandler}>
        <ResultMessage style={{ margin: "10px 0px" }} message={props.message} />
        <button
          className={classes.Confirm}
          onClick={() => {
            props.tackleModal(), props.clearMessage;
          }}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default ResultHandler;
