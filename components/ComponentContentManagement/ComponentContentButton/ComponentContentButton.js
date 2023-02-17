import { useId, useState } from "react";

import { Tooltip } from "react-tooltip";
import { MdTextFields } from "react-icons/md";
import { FaListUl } from "react-icons/fa";
import { BsImageFill } from "react-icons/bs";

import classes from "./ComponentContentButton.module.scss";

const ComponentContentButton = (props) => {
  const [btnId, setBtnId] = useState(useId());

  return (
    <div className={classes.ComponentContentButton}>
      <button
        id={btnId}
        onClick={props.clickHandler}
        className={classes.ContentButton}
      >
        {props.type == "Text" ? (
          <>
            <MdTextFields color="#CE4045" size="25px" style={{padding: "1px"}}/>
            <Tooltip anchorId={btnId} content="Edit text content" place="top" />
          </>
        ) : props.type == "List" ? (
          <>
            <FaListUl color="#CE4045" size="25px" style={{padding: "3px"}}/>
            <Tooltip anchorId={btnId} content="Edit list content" place="top" />
          </>
        ) : (
          <>
            <BsImageFill color="#CE4045" size="25px" style={{padding: "3px"}}/>
            <Tooltip anchorId={btnId} content="Edit image content" place="top" />
          </>
        )}
      </button>
      {props.children}
    </div>
  );
};

export default ComponentContentButton;
