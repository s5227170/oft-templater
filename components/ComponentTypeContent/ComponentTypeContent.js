import { useState } from 'react';
import { MdTextFields } from 'react-icons/md';
import { BsListTask } from 'react-icons/bs';
import { BsImage } from 'react-icons/bs'

import ConfirmationButtons from "../ConfirmationButtons/ConfirmationButtons";
import ComponentType from "../UI/ComponentType/ComponentType";
import RadioButton from '../UI/RadioButton/RadioButton';

import classes from "./ComponentTypeContent.module.scss";

const ComponentTypeContent = (props) => {
    const [componentChoice, setComponentChoice] = useState({
        Text: false,
        List: false,
        Image: false,
    });

    const buttonChoiceTrigger = (name) => {
        const newComponentChoice = Object.assign({}, componentChoice);
        for (let el in newComponentChoice) {
            newComponentChoice[el] = false;
        }
        newComponentChoice[name] = true;
        setComponentChoice(newComponentChoice);
    };

    const getChoice = () => {
        for (let choice in componentChoice) {
            if (componentChoice[choice] === true) {
                return choice
            }
        }
    }

    return (
        <div className={classes.SettingsContent}>
            <h1 className={classes.Title}>Pick a component type</h1>
            <div className={classes.Choices}>
                <ComponentType title="Choose Text" icon={<MdTextFields color="#CE4045" size="30" />} confirm={<RadioButton click={() => buttonChoiceTrigger("Text")} active={componentChoice.Text} />} />
                <ComponentType title="Chose List" icon={<BsListTask color="#CE4045" size="30" />} confirm={<RadioButton click={() => buttonChoiceTrigger("List")} active={componentChoice.List} />} />
                <ComponentType title="Choose Image" icon={<BsImage color="#CE4045" size="30" />} confirm={<RadioButton click={() => buttonChoiceTrigger("Image")} active={componentChoice.Image} />} />
            </div>

            <ConfirmationButtons
                confirm={"Confirm"}
                cancel={"Cancel"}
                confirmClick={() => props.confirmHandler(getChoice())}
                cancelClick={props.cancelHandler}
            />
        </div >
    );
};

export default ComponentTypeContent;