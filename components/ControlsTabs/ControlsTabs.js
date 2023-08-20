import classes from "./ControlsTabs.module.scss";
import { useState } from "react";

const ControlsTabs = (props) => {
    const [currentTab, setCurrentTab] = useState(0)

    return (
        <div className={classes.ControlsTabsWrapper}>
            <ul className={classes.Tabs}>
                {props.tabHeaders ? props.tabHeaders.map((tab, index) => {
                    return (<li onClick={() => setCurrentTab(index)} className={`${classes.controlTab} ${currentTab == index && classes.active}`} key={"content-tab-" + index.toString()}>{tab}</li>)
                }) : null}
            </ul>
            <div className={classes.TabContent}>
                {props.tabContent ? props.tabContent[currentTab] : null}
            </div>
        </div>
    )
}

export default ControlsTabs