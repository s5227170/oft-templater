import "react-tooltip/dist/react-tooltip.css";
import Modal from "../../Modal/Modal";
import DefaultPaddingContent from "../DefaultPaddingContent/DefaultPaddingContent";

import classes from "./DefaultPaddingManager.module.scss";

const DefaultPaddingManager = (props) => {
  return (
    <div className={classes.TitleContentManager}>
      <Modal tackleModal={props.tackleModal} modalShow={props.modalShow}>
        <DefaultPaddingContent
          confirmTitle={props.confirmTitle}
          tackleModal={props.tackleModal}
          modalShow={props.modalShow}
        />
      </Modal>
    </div>
  );
};

export default DefaultPaddingManager;
