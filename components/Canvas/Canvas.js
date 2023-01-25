import { Fragment, useEffect, useState, useRef } from "react";
import parse from "html-react-parser";
import { createRoot } from "react-dom/client";

import classes from "./Canvas.module.scss";

import { renderToString } from "react-dom/server";
import ComponentTypeManager from "../ComponentTypeManager/ComponentTypeManager";
import CreateRowManager from "../CreateRowManager/CreateRowManage";

import convertPageConfig from "../../util/convert-page-config";
import ComponentContentManager from "../ComponentContentManager/ComponentContentManager";

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

  const generateComponent = (type, position) => {
    const row = position
      .split("#")[0]
      .charAt(position.split("#")[0].length - 1);
    const number = position
      .split("#")[1]
      .charAt(position.split("#")[1].length - 1);
    console.log(number);
    let component = {};
    if (type == "Text") {
      component = {
        type: "Text",
        background: "none",
        color: "#000",
        fontFamily: "arial",
        fontSize: 14,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 20,
        paddingBottom: 20,
        content: [],
        position: number,
      };
    }
    if (type == "List") {
      component = {
        type: "List",
        background: "none",
        color: "#000",
        fontFamily: "arial",
        fontSize: 14,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        content: [],
        position: number,
      };
    }
    if (type == "Image") {
      component = {
        type: "Image",
        url: "",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        position: number,
      };
    }

    const newPageContent = [];
    pageConfig.content.map((rowConfig) => {
      if (rowConfig.position != row) {
        newPageContent.push(rowConfig);
      } else {
        newPageContent.push({
          ...rowConfig,
          contentComponents: [...rowConfig.contentComponents, component],
        });
      }
    });

    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: [...newPageContent],
    }));
  };

  const generateRow = (cols) => {
    const newRowConfig = {
      type: "row",
      columns: cols,
      position: pageConfig.content.length + 1,
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

  const confirmContent = () => {};

  useEffect(() => {
    if (root == null) {
      //If rows multiply, try moving the createRoot function out of the if
      root = createRoot(rootRef.current);
      const conversion = convertPageConfig(pageConfig);
      let fullStringContent = "";
      conversion.map((stringRow) => {
        fullStringContent += stringRow;
      });
      const reactContent = parse(fullStringContent, {
        replace: ({ attribs, children }) => {
          if (!attribs) {
            return;
          }

          if (attribs.id === "componentManager") {
            return (
              <ComponentTypeManager
                componentGeneration={generateComponent}
                elementPosition={attribs.name}
              />
            );
          }
          if (attribs.id === "componentContentManager") {
            return (
              <ComponentContentManager
                confirmContent={confirmContent}
                elementPosition={attribs.name}
              />
            );
          }
        },
      });
      // console.log(fullStringContent)
      setContent(reactContent);
    } else {
      const conversion = convertPageConfig(pageConfig);
      let fullStringContent = "";
      conversion.map((stringRow) => {
        fullStringContent += stringRow;
      });
      const reactContent = parse(fullStringContent, {
        replace: ({ attribs, children }) => {
          if (!attribs) {
            return;
          }

          if (attribs.id === "componentManager") {
            return (
              <ComponentTypeManager
                componentGeneration={generateComponent}
                elementPosition={attribs.name}
              />
            );
          }
          if (attribs.id === "componentContentManager") {
            return (
              <ComponentContentManager
                confirmContent={confirmContent}
                elementPosition={attribs.name}
              />
            );
          }
        },
      });
      // console.log(fullStringContent)
      setContent(reactContent);
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
