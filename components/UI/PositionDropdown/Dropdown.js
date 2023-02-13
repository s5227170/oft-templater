import { useEffect, useRef, useState } from "react";
import classes from "./Dropdown.module.scss";
import { FaAngleDown } from "react-icons/fa";

const Dropdown = (props) => {
  const [choice, setChoice] = useState(null);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const currentChoiceRef = useRef(null);

  const chooseOption = (option) => {
    setChoice(option);
    props.onSelect(option);
  };

  const dropdownStateHandler = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (choice == null) {
      setChoice(props.currentPosition);
    }
  }, [props.currentPosition]);

  useEffect(() => {
    if (currentChoiceRef.current) {
      setDropdownWidth(currentChoiceRef.current.offsetWidth);
    }
  }, [currentChoiceRef.current]);

  return (
    <div className={classes.PositionDropdown} onClick={dropdownStateHandler}>
      <div className={classes.CurrentChoice} ref={currentChoiceRef}>
        <div className={classes.Option}>{choice ? choice.title : ""} </div>
        <FaAngleDown
          color="#fff"
          size="20px"
          style={!open ? {} : { transform: "rotate(180deg)" }}
        />
      </div>
      <div
        className={classes.OptionsHolder}
        style={
          open
            ? {
                display: "flex",
                flexDirection: "column",
                minWidth: dropdownWidth,
              }
            : { display: "none" }
        }
      >
        {props.options.map((choiceItem, index) => {
          return (
            <div
              key={choiceItem + index}
              className={classes.Option}
              onClick={() => chooseOption(choiceItem)}
            >
              {choiceItem.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dropdown;
