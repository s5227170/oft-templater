import { useRef, useState } from "react";
import { MdTextFields } from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { BsImage } from "react-icons/bs";

import ConfirmationButtons from "../../UI/ConfirmationButtons/ConfirmationButtons";
import ComponentType from "../../UI/ComponentType/ComponentType";
import RadioButton from "../../UI/RadioButton/RadioButton";

import classes from "./ComponentTypeContent.module.scss";

const ComponentTypeContent = (props) => {
  const [componentChoice, setComponentChoice] = useState({
    Text: false,
    List: false,
    Image: false,
  });

  const textRef = useRef(null);
  const listRef = useRef(null);
  const imageRef = useRef(null);

  const buttonChoiceTrigger = (name) => {
    const newComponentChoice = Object.assign({}, componentChoice);
    for (let el in newComponentChoice) {
      newComponentChoice[el] = false;
    }
    newComponentChoice[name] = true;
    setComponentChoice(newComponentChoice);
  };

  const getChoice = () => {
    for (let choice in componentChoice) {
      if (componentChoice[choice] === true) {
        return choice;
      }
    }
  };

  const typeClickHandler = (type) => {
    if (type == 1) {
      if (textRef) {
        textRef.current.click();
      }
    }
    if (type == 2) {
      if (listRef) {
        listRef.current.click();
      }
    }
    if (type == 3) {
      if (imageRef) {
        imageRef.current.click();
      }
    }
  };

  return (
    <div className={classes.ComponentTypeContent}>
      <h1 className={classes.Title}>Pick a component type</h1>
      <div className={classes.Choices}>
        <ComponentType
          title="Choose Text"
          icon={<MdTextFields color="#CE4045" size="30" />}
          onClick={() => typeClickHandler(1)}
          confirm={
            <RadioButton
              click={() => buttonChoiceTrigger("Text")}
              active={componentChoice.Text}
              elementRef={textRef}
            />
          }
        />
        <ComponentType
          title="Chose List"
          icon={<BsListTask color="#CE4045" size="30" />}
          onClick={() => typeClickHandler(2)}
          confirm={
            <RadioButton
              click={() => buttonChoiceTrigger("List")}
              active={componentChoice.List}
              elementRef={listRef}
            />
          }
        />
        <ComponentType
          title="Choose Image"
          icon={<BsImage color="#CE4045" size="30" />}
          onClick={() => typeClickHandler(3)}
          confirm={
            <RadioButton
              click={() => buttonChoiceTrigger("Image")}
              active={componentChoice.Image}
              elementRef={imageRef}
            />
          }
        />
      </div>

      <ConfirmationButtons
        confirm={"Confirm"}
        cancel={"Cancel"}
        confirmClick={() => {
            props.confirmHandler(getChoice(), props.elementPosition, props.rowColumns);
        }}
        cancelClick={props.cancelHandler}
      />
    </div>
  );
};

export default ComponentTypeContent;
