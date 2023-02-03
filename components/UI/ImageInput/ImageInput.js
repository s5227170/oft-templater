/* eslint-disable react/no-unescaped-entities */
import { useEffect, useRef, useState } from "react";

import { MdOutlineDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { FaInfoCircle } from "react-icons/fa";

import classes from "./ImageInput.module.scss";

const ImageInput = (props) => {
  return (
    <div className={classes.InputWrapper}>
      <input {...props} />
      <span style={props.style}></span>
    </div>
  );
};

export default ImageInput;
