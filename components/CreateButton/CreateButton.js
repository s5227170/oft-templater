
import classes from "./CreateButton.module.scss";

const CreateButton = (props) => {

    return (
        <button className={classes.CreateButton}>
            {props.children}
        </button>
    )
}

export default CreateButton;