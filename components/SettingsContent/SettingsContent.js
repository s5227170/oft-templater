import { Fragment, useState } from 'react';
import { MdTextFields } from 'react-icons/md';

import ConfirmationButtons from "../ConfirmationButtons/ConfirmationButtons";
import ComponentType from "../UI/ComponentType/ComponentType";
import RadioButton from '../UI/RadioButton/RadioButton';

import classes from "./SettingsContent.module.scss";

const SettingsContent = (props) => {
    const [componentChoice, setComponentChoice] = useState({
        btn1: false,
        btn2: false,
        btn3: false,
    });

    const buttonChoiceTrigger = (name) => {
        const newComponentChoice = Object.assign({}, componentChoice);
        for (let el in newComponentChoice) {
            newComponentChoice[el] = false;
        }
        newComponentChoice[name] = true;
        setComponentChoice(newComponentChoice);
    };

    return (
        <Fragment>
            <h1 className={classes.Title}>Pick a component type</h1>
            <ComponentType title="Text" icon={<MdTextFields color="#CE4045" size="50" />} confirm={<RadioButton click={() => buttonChoiceTrigger("btn1")} active={componentChoice.btn1} />} />
            <ComponentType title="Text" icon={<MdTextFields color="#CE4045" size="50" />} confirm={<RadioButton click={() => buttonChoiceTrigger("btn2")} active={componentChoice.btn2} />} />
            <ComponentType title="Text" icon={<MdTextFields color="#CE4045" size="50" />} confirm={<RadioButton click={() => buttonChoiceTrigger("btn3")} active={componentChoice.btn3} />} />

            <ConfirmationButtons
                confirm={"Confirm"}
                cancel={"Cancel"}
                confirmClick={props.confirmHandler}
                cancelClick={props.cancelHandler}
            />
        </Fragment>
    );
};

export default SettingsContent;