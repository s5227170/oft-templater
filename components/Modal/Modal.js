
import classes from "./Modal.module.scss";

import global from "../../styles/global.module.scss"
import { Fragment } from "react";

const Modal = (props) => {
    console.log(props.modalShow)

    return (
        <Fragment>
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
                    onClick={props.modalTackle}
                />
            ) : null}
        </Fragment>
    );
};

export default Modal;