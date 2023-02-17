import "react-tooltip/dist/react-tooltip.css";
import Modal from "../../Modal/Modal";
import TitleContent from "../TitleContent/TitleContent";

import classes from "./TitleContentManager.module.scss";

const TitleContentManager = (props) => {
  return (
    <div className={classes.TitleContentManager}>
      <Modal tackleModal={props.tackleModal} modalShow={props.modalShow}>
        <TitleContent
          confirmTitle={props.confirmTitle}
          tackleModal={props.tackleModal}
          modalShow={props.modalShow}
        />
      </Modal>
    </div>
  );
};

export default TitleContentManager;
