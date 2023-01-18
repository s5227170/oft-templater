import { Fragment, useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import { createRoot } from "react-dom/client";

import {
  oneColumn,
  threeColumns,
  twoColumns,
} from "../../content-components/row";

import classes from "./Canvas.module.scss";

import { renderToString } from "react-dom/server";
import ComponentTypeManager from "../ComponentTypeManager/ComponentTypeManager";
import CreateRowManager from "../CreateRowManager/CreateRowManage";
import text from "../../content-components/text";
import list from "../../content-components/list";
import image from "../../content-components/image";
import readRowConfig from "../../util/readRowConfig";

const Canvas = () => {
  const rootRef = useRef(null);
  const [emailContent, setEmailContent] = useState([]);
  const [contentArr, setContentArr] = useState([]);
  const [content, setContent] = useState();
  const [elementToGenerate, setElementToGenerate] = useState();
  const [pageConfig, setPageConfig] = useState({
    content: [],
    title: "",
    parameters: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  });
  let root = null;

  const pageConfigExample = {
    content: [{}, {}, {}],
    title: "",
    parameters: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
  };

  const rowConfig = {
    type: "row",
    columns: 1,
    position: 0,
    parameters: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    contentComponents: {},
  };

  const textComponentConfig = {
    type: "text",
    background: "none",
    color: "#fff",
    fontFamily: "arial",
    fontSize: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    content: ["", "", ""],
  };

  const listComponentConfig = {
    type: "text",
    background: "none",
    color: "#000",
    fontFamily: "arial",
    fontSize: 14,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    content: ["", "", ""],
  };

  const imageComponentConfig = {
    type: "Image",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
  };

  const generateComponent = (componentType) => {
    console.log(componentType);
    // setElementToGenerate(componentType);
  };

  const generateRow = (cols) => {
    const newRowConfig = {
      type: "row",
      columns: cols,
      position: 1,
      parameters: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
      },
      contentComponents: [],
    };
    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: [...pageConfig.content, newRowConfig],
    }));
  };

  useEffect(() => {
    console.log(rootRef)
    console.log(root)
    if (rootRef && root == null) {
      root = createRoot(rootRef.current);
    }
    console.log(root)
  }, [rootRef]);

  useEffect(() => {
    if (rootRef) {
      if (root) {
        root.render(readRowConfig(pageConfig));
      }
    }
  }, [pageConfig]);

  return (
    <div className={classes.CanvasWrapper}>
      <div id="targetDiv" ref={rootRef}>
        {content}
      </div>
      <CreateRowManager rowGeneration={generateRow} />
    </div>
  );
};

export default Canvas;
