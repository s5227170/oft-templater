import { useState } from "react";
import Modal from "../../Modal/Modal";

import CreateRowButton from "../CreateRowButton/CreateRowButton";

import classes from "./CreateRowManager.module.scss";
import CreateRowContent from "../CreateRowContent/CreateRowContent";

const CreateRowManager = (props) => {
    const [modalShow, setModalShow] = useState(false);

    const tackleModal = () => {
        setTimeout(() => {
            setModalShow(!modalShow);
        }, 250);
    };

    return (
        <div className={classes.RowCreationManager}>
            <CreateRowButton clickHandler={tackleModal}>
                <Modal tackleModal={tackleModal} modalShow={modalShow}>
                    <CreateRowContent cancelHandler={tackleModal} confirmHandler={props.rowGeneration} successFunction={tackleModal}/>
                </Modal>
            </CreateRowButton>
        </div>
    );
};

export default CreateRowManager;
