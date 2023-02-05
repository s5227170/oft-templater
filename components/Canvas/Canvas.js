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
    console.log(position);
    const row = position
      .split("#")[0]
      .charAt(position.split("#")[0].length - 1);
    const number = position
      .split("#")[1]
      .charAt(position.split("#")[1].length - 1);
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
        paddingTop: 0,
        paddingBottom: 0,
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
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        url: [],
        imgWidth: 0,
        imgHeight: 0,
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

  const confirmContent = (row, item, content) => {
    //Currently, setting the content will automatically update the contents, this means that
    //to get the actual content, we just need to add the contents to the baseConfig.
    //This means that the text should go as an array of string elements, and the different
    //properties to the contentinside the baseConfig. The list element is very similar, if not the 
    //same. The image will have the url string, and the different properties that go with it.

    //New updated pageConfig content
    const newPageContent = [];

    pageConfig.content.map(rowConfig => {
      if (rowConfig.position == row) {
        rowConfig.contentComponents.map(component => {
          const newRowComponentContent = [];
          if (component.position == item) {
            const updatedComponent = {}
            //Check what type the component is and add the content depending on that
            if (component.type == "Text") {
              updatedComponent.type = component.type;
              updatedComponent.background = content.background;
              updatedComponent.color = content.color;
              updatedComponent.fontFamily = content.fontFamily;
              updatedComponent.fontSize = content.fontSize;
              updatedComponent.paddingLeft = component.paddingLeft;
              updatedComponent.paddingRight = component.paddingRight;
              updatedComponent.paddingTop = component.paddingTop;
              updatedComponent.paddingBottom = component.paddingBottom;
              updatedComponent.content = component.content;
              updatedComponent.position = component.position;

              // type: "Text",
              // background: "none",
              // color: "#000",
              // fontFamily: "arial",
              // fontSize: 14,
              // paddingLeft: 0,
              // paddingRight: 0,
              // paddingTop: 0,
              // paddingBottom: 0,
              // content: [],
              // position: number,
            }
            if (component.type == "List") { }
            if (component.type == "Image") { }

            //The line underneath adds the modified component to the row
            newRowComponentContent.push(updatedComponent)
          } else {
            //Push all components to the updated row that are not to be touched
            newRowComponentContent.push(component)
          }
          //Create the new updated row and add the updated components
          const newRowConfig = { ...rowConfig, contentComponents: newRowComponentContent }

          //Push the new updated row object to the array of rowConfigs
          newPageContent.push(newRowConfig)
        })
      } else {
        //Push all rowConfigs that are not to be touched to the the pageConfig content
        newPageContent.push(rowConfig)
      }
    })

    //Push the new pageConfig content with the updated values
    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: [...newPageContent],
    }));
  };

  const deleteContent = (row, item) => {
    console.log(pageConfig.content);
    const newPageContent = [];
    pageConfig.content.map((rowConfig) => {
      if (rowConfig.position != row) {
        newPageContent.push(rowConfig);
      } else {
        const newContentComponents = [];
        for (let i = 0; i < rowConfig.contentComponents.length; i++) {
          // console.log(rowConfig.contentComponents[i].position);
          // console.log(item);
          if (rowConfig.contentComponents[i].position != item) {
            newContentComponents.push(rowConfig.contentComponents[i]);
          }
        }
        rowConfig.contentComponents = newContentComponents
        newPageContent.push(rowConfig);
      }
    });

    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: [...newPageContent],
    }));
    // setPageConfig(newPageContent);
  };

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
                componentType={attribs.role}
                deleteFunction={deleteContent}
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
                componentType={attribs.role}
                deleteFunction={deleteContent}
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
