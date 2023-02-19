import { useEffect, useState } from "react";
import {
  AiOutlineBorderBottom,
  AiOutlineBorderLeft,
  AiOutlineBorderRight,
  AiOutlineBorderTop,
} from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Dropdown from "../../UI/Dropdown/Dropdown";
import PaddingElement from "../../UI/PaddingElement/PaddingElement";

import classes from "./DefaultPaddingContent.module.scss";

const DefaultPaddingContent = (props) => {
  const [chosenConstraint, setChosenConstraint] = useState({ value: ["Text", "List", "Image"], title: "Apply to all components" });
  const [paddings, setPaddings] = useState({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  });

  useEffect(() => {
    if (props.defaultComponentPaddings.paddingLeft > 0 ||
      props.defaultComponentPaddings.paddingRight > 0 ||
      props.defaultComponentPaddings.paddingTop > 0 ||
      props.defaultComponentPaddings.paddingBottom > 0) {
      setPaddings(props.defaultComponentPaddings)
    }
  }, [props.defaultComponentPaddings])


  const constraints = [
    { value: ["Text"], title: "Apply only for text components" },
    { value: ["List"], title: "Apply only for list components" },
    { value: ["Image"], title: "Apply only for image components" },
    { value: ["Text", "List", "Image"], title: "Apply to all components" },
  ];

  const paddingHandler = (e, el) => {
    if (e.target.value.length > 3) {
      e.target.value = e.target.value.slice(0, 3);
    }
    const newPaddings = { ...paddings, [el]: +e.target.value };

    setPaddings(newPaddings);
  };

  const selectConfirmation = (choice) => {
    setChosenConstraint(choice);
  };

  return (
    <div className={classes.DefaultPaddingContent}>
      <div className={classes.Header}>
        <h1>Confirm default component padding</h1>
        <div className={classes.EditorIcons}>
          <GiConfirmed
            id="confirm-text"
            color="#40CD9A"
            size="25px"
            onClick={() => {
              props.confirmDefaultPadding(paddings);
              props.tackleModal();
            }}
          />
          <Tooltip anchorId="confirm-text" place="top">
            Confirm row changes
          </Tooltip>
          <TiArrowMinimise
            id="close-modal-text"
            color="#008DD7"
            size="25px"
            onClick={props.tackleModal}
          />
          <Tooltip anchorId="close-modal-text" place="top">
            Close Modal
          </Tooltip>
        </div>
      </div>
      <div className={classes.Content}>
        <div className={classes.PaddingInputs}>
          <PaddingElement change={(e) => paddingHandler(e, "paddingLeft")} value={paddings.paddingLeft}>
            <AiOutlineBorderLeft color="#000" size="40" />
          </PaddingElement>
          <PaddingElement change={(e) => paddingHandler(e, "paddingRight")} value={paddings.paddingRight}>
            <AiOutlineBorderRight color="#000" size="40" />
          </PaddingElement>
          <PaddingElement change={(e) => paddingHandler(e, "paddingTop")} value={paddings.paddingTop}>
            <AiOutlineBorderTop color="#000" size="40" />
          </PaddingElement>
          <PaddingElement change={(e) => paddingHandler(e, "paddingBottom")} value={paddings.paddingBottom}>
            <AiOutlineBorderBottom color="#000" size="40" />
          </PaddingElement>
        </div>
        <div className={classes.Constraints}>
          <Dropdown
            options={constraints}
            onSelect={selectConfirmation}
            currentChoice={{
              title: "Apply to all components",
              value: ["Text", "List", "Image"],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DefaultPaddingContent;
