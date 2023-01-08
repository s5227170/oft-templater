import { useState } from "react";
import Modal from "../Modal/Modal";

import CreateRowButton from "../CreateRowButton/CreateRowButton";
import ComponentTypeContent from "../ComponentTypeContent/ComponentTypeContent";

import classes from "./CreateRowManage.module.scss";
import CreateRowContent from "../CreateRowContent/CreateRowContent";

const CreateRowManage = (props) => {
    const [modalShow, setModalShow] = useState(false);

    const tackleModal = () => {
        setTimeout(() => {
            setModalShow(!modalShow);
        }, 250);
    };

    return (
        <div className={classes.RowCreationManager}>
            <CreateRowButton clickHandler={tackleModal}>
                <Modal modalTackle={tackleModal} modalShow={modalShow}>
                    <CreateRowContent cancelHandler={tackleModal} confirmHandler={props.rowGeneration} />
                </Modal>
            </CreateRowButton>
        </div>
    );
};

export default CreateRowManage;
