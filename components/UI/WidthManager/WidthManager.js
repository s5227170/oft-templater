import { useEffect } from "react";
import classes from "./WidthManager.module.scss";

const WidthManager = (props) => {

    useEffect(() => {
        props.constraintWidth(getWidth())
    }, [props.rowSize, props.paddingLeft, props.paddingRight, props.componentSize])


    const getWidth = () => {
        return (+props.rowSize - +props.paddingLeft - +props.paddingRight - +props.componentSize)
    }

    return (
        <div className={classes.WidthManager} style={{ backgroundColor: getWidth() == 0 ? "#40cd9a" : "#ce4045", color: getWidth() == 0 ? "#fff" : getWidth() > 0 || getWidth < 0 ? "#fff" : "#000" }}>
            {+props.rowSize - +props.paddingLeft - +props.paddingRight - +props.componentSize}
        </div>
    );
};

export default WidthManager;
