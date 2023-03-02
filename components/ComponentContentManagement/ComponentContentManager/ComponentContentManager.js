import { useState } from "react";
import Modal from "../../Modal/Modal";

import ComponentContentButton from "../ComponentContentButton/ComponentContentButton";
import ComponentContent from "../ComponentContent/ComponentContent";

import classes from "./ComponentContentManager.module.scss";

const ComponentContentManager = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [drag, setDrag] = useState({
    active: false,
    x: "",
  });
  const [dims, setDims] = useState({
    w: 620,
  });

  const tackleModal = () => {
    setTimeout(() => {
      setModalShow(!modalShow);
    }, 250);
  };

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
  };

  console.log(boxStyle)

  return (
    <div className={classes.ComponentContentManager}>
      <ComponentContentButton
        clickHandler={tackleModal}
        type={props.componentType}
      >
        <Modal tackleModal={tackleModal} modalShow={modalShow} componentMode>
          <ComponentContent
            columnSize={props.columnSize}
            defaultPaddings={props.defaultPaddings}
            componentType={props.componentType}
            cancelHandler={tackleModal}
            confirmHandler={props.confirmContent}
            elementPosition={props.elementPosition}s
            deleteFunction={props.deleteFunction}
            row={props.row}
            boxStyle={boxStyle}
            startResize={startResize}
            resizeFrame={resizeFrame}
            stopResize={stopResize}
          />
        </Modal>
      </ComponentContentButton>
    </div>
  );
};

export default ComponentContentManager;
