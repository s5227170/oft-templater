import { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import CustomInput from "../../UI/CustomInput/CustomInput";

import classes from "./TitleContent.module.scss";

const TitleContent = (props) => {
  const [title, setTitle] = useState("");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={classes.TitleContent}>
      <div className={classes.Header}>
        <h1>HTML title</h1>
        <div className={classes.EditorIcons}>
          <GiConfirmed
            id="confirm-text"
            color="#40CD9A"
            size="25px"
            onClick={() => {
              if (!title.length) {
                return alert("Please enter a title before submitting.")
              }
              props.confirmTitle(title);
              props.tackleModal();
            }}
          />
          <Tooltip anchorId="confirm-text" place="top">
            Confirm title
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
        <label>You can add a title for the html file here.</label>
        <CustomInput
          type="text"
          style={{ width: "100%" }}
          onChange={titleHandler}
          value={title}
          placeholder="Enter title for the email..."
        />
      </div>
    </div>
  );
};

export default TitleContent;
