import { useEffect, useId, useState } from "react";
import { MdTextFields } from "react-icons/md";
import { Tooltip } from 'react-tooltip';

import classes from "./ComponentContentButton.module.scss";

const ComponentContentButton = (props) => {
    const [btnId, setBtnId] = useState(useId())

    return (
        <div className={classes.ComponentContentButton}>
            <button id={btnId} onClick={props.clickHandler} className={classes.ContentButton}>
                <MdTextFields color="#CE4045" size="25px" />
                <Tooltip anchorId={btnId} content="Edit content" place="top" />
            </button>
            {props.children}
        </div>
    );
};

export default ComponentContentButton;
