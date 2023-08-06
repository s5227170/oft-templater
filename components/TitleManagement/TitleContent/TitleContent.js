import { useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { TiArrowMinimise } from "react-icons/ti";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import CustomInput from "../../UI/CustomInput/CustomInput";
import IconButton from "../../UI/IconButton/IconButton";

import classes from "./TitleContent.module.scss";

const TitleContent = (props) => {
  const [title, setTitle] = useState(props.title ? props.title : "");

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div className={classes.TitleContent}>
      <div className={classes.Header}>
        <h1>HTML title</h1>
        <div className={classes.EditorIcons}>
          <IconButton submit={() => {
            props.confirmTitle(title);
            props.tackleModal();
          }} icon={<GiConfirmed
            color="#40CD9A"
            size="25px"
          />} tooltip="Confirm title" />
          <IconButton submit={props.tackleModal} icon={<TiArrowMinimise
            color="#008DD7"
            size="25px"
          />} tooltip="Close Modal" />
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
