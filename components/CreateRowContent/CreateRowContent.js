import { useRef, useState } from "react";
import Image from "next/image";

import RadioButton from "../UI/RadioButton/RadioButton";
import ConfirmationButtons from "../ConfirmationButtons/ConfirmationButtons";

import classes from "./CreateRowContent.module.scss";

const CreateRowContent = (props) => {
  const [rowConfig, setRowConfig] = useState({
    single: false,
    double: false,
    triple: false,
  });
  const btnOneRef = useRef(null);
  const btnTwoRef = useRef(null);
  const btnThreeRef = useRef(null);

  const buttonChoiceTrigger = (name) => {
    const newRowConfig = Object.assign({}, rowConfig);
    for (let el in newRowConfig) {
      newRowConfig[el] = false;
    }
    newRowConfig[name] = true;
    setRowConfig(newRowConfig);
  };

  const getChoice = () => {
    for (let choice in rowConfig) {
      if (rowConfig[choice] === true) {
        if (choice == "single") {
          return 1;
        }
        if (choice == "double") {
          return 2;
        }
        if (choice == "triple") {
          return 3;
        }
      }
    }
  };

  const rowClickHandler = (row) => {
    if (row == 1) {
      if (btnOneRef) {
        btnOneRef.current.click();
      }
    }
    if (row == 2) {
      if (btnTwoRef) {
        btnTwoRef.current.click();
      }
    }
    if (row == 3) {
      if (btnThreeRef) {
        btnThreeRef.current.click();
      }
    }
  };

  return (
    <div className={classes.CreateRowContent}>
      <h1 className={classes.Title}>Choose a component type</h1>
      <div className={classes.RowType} onClick={() => rowClickHandler(1)}>
        <div className={classes.Generalinfo}>
          <label>Single-column</label>
          {/* <img src={Single} /> */}
          <Image src="/images/Single.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("single")}
          active={rowConfig.single}
          elementRef={btnOneRef}
        ></RadioButton>
      </div>
      <div className={classes.RowType} onClick={() => rowClickHandler(2)}>
        <div className={classes.Generalinfo}>
          <label>Double-column</label>
          {/* <img src={Double} /> */}
          <Image src="/images/Double.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("double")}
          active={rowConfig.double}
          elementRef={btnTwoRef}
        ></RadioButton>
      </div>
      <div className={classes.RowType} onClick={() => rowClickHandler(3)}>
        <div className={classes.Generalinfo}>
          <label>Triple-column</label>
          {/* <img src={Triple} /> */}
          <Image src="/images/Triple.png" alt="" width="100" height="46" />
        </div>
        <RadioButton
          click={() => buttonChoiceTrigger("triple")}
          active={rowConfig.triple}
          elementRef={btnThreeRef}
        ></RadioButton>
      </div>
      <ConfirmationButtons
        confirm={"Confirm"}
        cancel={"Cancel"}
        confirmClick={() => {
          props.confirmHandler(getChoice());
          props.successFunction();
        }}
        cancelClick={props.cancelHandler}
      />
    </div>
  );
};

export default CreateRowContent;
