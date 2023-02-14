import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import classes from "./TitleContent.module.scss";

const TitleContent = (props) => {
  return (
    <div className={classes.TitleContent}>
      <div className={classes.Header}>
        <h1>Row {props.position} settings</h1>
        <div className={classes.EditorIcons}>
          <GiConfirmed
            id="confirm-text"
            color="#40CD9A"
            size="25px"
            onClick={() => {
              props.confirmTitle();
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
      <div className={classes.Content}></div>
    </div>
  );
};

export default TitleContent;
