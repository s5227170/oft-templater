import { useState } from "react";
import Modal from "../Modal/Modal";

import ComponentContentButton from "../ComponentContentButton/ComponentContentButton";
import ComponentContent from "../ComponentContent/ComponentContent";

import classes from "./ComponentContentManager.module.scss";

const ComponentContentManager = (props) => {
    const [modalShow, setModalShow] = useState(false);

    const tackleModal = () => {
        setTimeout(() => {
            setModalShow(!modalShow);
        }, 250);
    };

    return (
        <div className={classes.ComponentContentManager}>
            <ComponentContentButton clickHandler={tackleModal}>
                <Modal modalTackle={tackleModal} modalShow={modalShow}>
                    <ComponentContent cancelHandler={tackleModal} confirmHandler={props.confirmContent} elementPosition={props.elementPosition} />
                </Modal>
            </ComponentContentButton>
        </div>
    );
};

export default ComponentContentManager;
