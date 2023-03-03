import Modal from "../../Modal/Modal";
import NewCanvasContent from "../NewCanvasContent/NewCanvasContent";

import classes from "./NewCanvasManager.module.scss";

const NewCanvasManager = (props) => {

  return (
    <div className={classes.NewCanvasManager}>
      <Modal tackleModal={props.tackleModal} modalShow={props.modalShow}>
        <NewCanvasContent cancelHandler={props.tackleModal} confirmHandler={props.confirmHandler}/>
      </Modal>
    </div>
  );
};

export default NewCanvasManager;
