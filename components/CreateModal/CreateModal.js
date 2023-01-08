import { useEffect, useState } from "react";
import parse from "html-react-parser";
import Image from "next/image";

import classes from "./CreateModal.module.scss";
import global from "../../styles/global.module.scss";

import RadioButton from "../UI/RadioButton/RadioButton";
import ConfirmationButtons from "../ConfirmationButtons/ConfirmationButtons";
import { oneColumn } from "../../content-components/row";

const CreateModal = (props) => {
  const [selectConfig, setSelectConfig] = useState({
    btn1: false,
    btn2: false,
    btn3: false,
  });

  const buttonChoiceTrigger = (name) => {
    const newConfig = Object.assign({}, selectConfig);
    for (let el in newConfig) {
      newConfig[el] = false;
    }
    newConfig[name] = true;
    setSelectConfig(newConfig);
  };

  const confirmHandler = () => { };

  return (
    <div
      className={[
        classes.CreateModal,
        props.modalShow ? global.openFlex : global.closed,
      ].join(" ")}
    >
      <h1>Choose a component type</h1>
      <div className={classes.RowType}>
        <div className={classes.Generalinfo}>
          <label>Single-column</label>
          {/* <img src={Single} /> */}
          <Image src="/images/Single.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("btn1")}
          active={selectConfig.btn1}
        ></RadioButton>
      </div>
      <div className={classes.RowType}>
        <div className={classes.Generalinfo}>
          <label>Double-column</label>
          {/* <img src={Double} /> */}
          <Image src="/images/Double.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("btn2")}
          active={selectConfig.btn2}
        ></RadioButton>
      </div>
      <div className={classes.RowType}>
        <div className={classes.Generalinfo}>
          <label>Triple-column</label>
          {/* <img src={Triple} /> */}
          <Image src="/images/Triple.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("btn3")}
          active={selectConfig.btn3}
        ></RadioButton>
      </div>
      <ConfirmationButtons
        confirm={"Confirm"}
        cancel={"Cancel"}
        confirmClick={confirmHandler}
        cancelClick={props.modalTackle}
      />
    </div>
  );
};

export default CreateModal;

//Abstract the modal to a single element that accepts content according to its children
