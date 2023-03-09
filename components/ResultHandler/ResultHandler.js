import ResultMassage from "../UI/ResultMassage/ResultMasage";
import Modal from "../Modal/Modal";

import classes from "./ResultHandler.module.scss";

const ResultHandler = (props) => {

  return (
    <Modal tackleModal={props.tackleModal} modalShow={props.modalShow}>
      <div className={classes.ResultHandler}>
        <ResultMassage style={{ margin: "10px 0px" }} massage={props.massage} />
        <button
          className={classes.Confirm}
          onClick={() => {
            props.tackleModal(), props.clearMassage();
          }}
        >
          Ok
        </button>
      </div>
    </Modal>
  );
};

export default ResultHandler;
