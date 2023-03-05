import Modal from "../../Modal/Modal";
import LoadTemplateContent from "../LoadTemplateContent/LoadTemplateContent";

import classes from "./LoadTemplateManager.module.scss";

const LoadTemplateManager = (props) => {

    return (
        <div className={classes.LoadTemplateManager}>
            <Modal tackleModal={props.tackleModal} modalShow={props.modalShow}>
                <LoadTemplateContent tackleModal={props.tackleModal} modalShow={props.modalShow} confirmSave={props.confirmSave} config={props.config} />
            </Modal>
        </div>
    );
};

export default LoadTemplateManager;
