import ControlsTabs from "../ControlsTabs/ControlsTabs";
import Paddings from "./ControlsComponents/Paddings/Paddings";
import classes from "./Controls.module.scss";
import Alignment from "./ControlsComponents/Alignment/Alignment";

const Controls = (props) => {

    const clickHandler = () => {
        const newConfig = {
            ...props.config,
            title: "test"
        }
        props.extractChanges(newConfig)
    }

    const tabs = [
        {
            name: "Content",
            content: <></>
        },
        {
            name: "Padding",
            content: <Paddings />
        },
        {
            name: "Alignment",
            content: <Alignment />
        }
    ]

    return (
        <div className={classes.ControlsWrapper}>
            <div className={classes.Header} onClick={clickHandler}>
                <h1>Component type</h1>
                <hr></hr>
            </div>
            <div className={classes.Content}>
                <ControlsTabs tabHeaders={tabs.map(tab => tab.name)} tabContent={tabs.map(tab => tab.content)} />
            </div>
        </div>
    )
}

export default Controls