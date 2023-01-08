import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { createRoot } from "react-dom/client";

import { oneColumn } from "../../content-components/row";

import classes from "./Canvas.module.scss";

import { renderToString } from "react-dom/server";
import ComponentTypeManager from "../ComponentTypeManager/ComponentTypeManager";
import CreateRowManager from "../CreateRowManager/CreateRowManage";

const Canvas = () => {
  const [emailContent, setEmailContent] = useState([]);
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
    }
  })

  const pageConfigExample = {
    content: [{}, {}, {}],
    title: "",
    parameters: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0
    },
  }

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
    background: "",
    color: "",
    fontFamily: "",
    fontSize: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    content: ["", "", ""]
  }

  const listComponentConfig = {

  }

  const imageComponentConfig = {

  }

  const generateComponent = (componentType) => {
    setElementToGenerate(componentType)
  }

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
      contentComponents: {},
    }
    setPageConfig(pageConfig => ({
      ...pageConfig,
      content: [...pageConfig.content, newRowConfig]
    }))
  }

  useEffect(() => {
    const targetDiv = document.querySelector("#targetDiv");
    if (targetDiv) {
      createRoot(targetDiv).render(<ComponentTypeManager componentGeneration={generateComponent} />)
    }
  }, [content]);

  useEffect(() => {
    if (elementToGenerate === "Text") {
      const newTextComponent = {
        type: "text",
        background: "",
        color: "",
        fontFamily: "",
        fontSize: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        content: ["", "", ""]
      }

      setElementToGenerate(newTextComponent)
    }
    if (elementToGenerate === "List") {

    }
    if (elementToGenerate === "image") {

    }

  }, [elementToGenerate])

  useEffect(() => {
    const target = `<div id="targetDiv"></div>`;
    setContent(parse(oneColumn(35, 35, 10, 10, target)));
  }, []);

  return (
    <div className={classes.CanvasWrapper}>
      {content}
      <CreateRowManager rowGeneration={generateRow} />
    </div>
  );
};

export default Canvas;
