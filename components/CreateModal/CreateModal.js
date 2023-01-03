import { useEffect, useState } from "react";
import parse from "html-react-parser";

import { oneColumn } from "../../content-components/row";

import classes from "./CreateModal.module.scss";
import global from "../../styles/global.module.scss";

const CreateModal = (props) => {
  return (
    <div
      className={[
        classes.CreateModal,
        props.modalShow ? global.openBlock : global.closed,
      ].join(" ")}
    ></div>
  );
};

export default CreateModal;
