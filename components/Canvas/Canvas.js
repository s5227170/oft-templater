import { useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import { render, createPortal } from "react-dom";

import { oneColumn } from "../../content-components/row";

import classes from "./Canvas.module.scss";
import CreateButton from "../CreateButton/CreateButton";
import SettingsButton from "../SettingsButton/SettingsButton";

import { renderToString } from "react-dom/server";
import SettingsManager from "../SettingsManager/SettingsManager";

const Canvas = () => {
  const [emailContent, setEmailContent] = useState([]);
  const [content, setContent] = useState();
  const targetRef = useRef(null);

  //An example config of a row that will go into an array of rows
  //The config may be inserted into a state, that way, when making changes
  //it will re-render and will swap between the settings button/modal, and
  //the actual element. When a sub-component already exists, there should be 
  //a way to edit it through a menu, potentially on a hover effect
  const exampleConfig = {
    position: 0,
    parameters: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    contentComponents: {},
  };

  useEffect(() => {
    const target = `<div id="targetDiv"></div>`;
    setContent(parse(oneColumn(35, 35, 10, 10, target)));
  }, []);

  useEffect(() => {
    const targetDiv = document.querySelector("#targetDiv");
    if (targetDiv) {
      console.log(targetDiv);
      render(createPortal(<SettingsManager />, targetDiv), document.createElement("div"));
    }
  }, [content]);

  return (
    <div className={classes.CanvasWrapper}>
      {content}
      <CreateButton>+</CreateButton>
    </div>
  );
};

export default Canvas;
