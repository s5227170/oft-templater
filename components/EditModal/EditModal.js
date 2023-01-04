import ConfirmationButtons from "../ConfirmationButtons/ConfirmationButtons";
import classes from "./EditModal.module.scss";

const EditModal = (props) => {
  const confirmHandler = () => {};

  return (
    <div
      className={[
        classes.EditModal,
        props.modalShow ? global.openFlex : global.closed,
      ].join(" ")}
    >
      <h1>hello</h1>

      <ConfirmationButtons
        confirm={"Confirm"}
        cancel={"Cancel"}
        confirmClick={confirmHandler}
        cancelClick={props.modalTackle}
      />
    </div>
  );
};

export default EditModal;
