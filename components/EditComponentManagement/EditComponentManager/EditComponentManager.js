import { useEffect, useState } from "react";
import Modal from "../../Modal/Modal";
import EditComponentContent from "../EditComponentContent/EditComponentContent";

import classes from "./EditComponentManager.module.scss";

const EditComponentManager = (props) => {
    const [modalShow, setModalShow] = useState(false);

    const tackleModal = () => {
        setTimeout(() => {
            props.tackleModal()
        }, 250);
    };

    const [drag, setDrag] = useState({
        active: false,
        x: "",
    });
    const [dims, setDims] = useState({
        w: 620,
    });

    const resizeFrame = (e) => {
        const { active, x } = drag;
        if (active) {
            const xDiff = Math.abs(x - e.clientX);
            const newW = x > e.clientX ? dims.w - xDiff : dims.w + xDiff;

            setDrag({ ...drag, x: e.clientX });
            setDims({ w: newW });
        }
    };

    const stopResize = (e) => {
        setDrag({ ...drag, active: false });
    };

    const startResize = (e) => {
        setDrag({
            active: true,
            x: e.clientX,
        });
    };


    const boxStyle = {
        width: `${dims.w}px`,
        minWidth: props.componentType == "Image" ? 750 : "auto"
    };

    useEffect(() => {
        setModalShow(props.modalShow)
    }, [props.modalShow])

    return (
        <div className={classes.EditComponentManager}>
            <Modal tackleModal={tackleModal} modalShow={modalShow}>
                <EditComponentContent
                    tackleModal={tackleModal}
                    confirmContent={props.confirmContent}
                    deleteFunction={props.deleteFunction}
                    row={props.row}
                    rowNumber={props.rowNumber}
                    item={props.item}
                    boxStyle={boxStyle}
                    startResize={startResize}
                    resizeFrame={resizeFrame}
                    stopResize={stopResize}
                    resetModal={props.resetModal}
                    edit={true}
                />
            </Modal>
        </div>
    );
};

export default EditComponentManager;
