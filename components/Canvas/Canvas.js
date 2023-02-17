import { useEffect, useState, useRef} from "react";
import parse from "html-react-parser";

import classes from "./Canvas.module.scss";

import ComponentTypeManager from "../ComponentTypeManagement/ComponentTypeManager/ComponentTypeManager";
import CreateRowManager from "../CreateRowManagement/CreateRowManager/CreateRowManager";

import convertPageConfig from "../../util/convert-page-config";
import ComponentContentManager from "../ComponentContentManagement/ComponentContentManager/ComponentContentManager";
import RowSettingsManager from "../RowSettingsManagement/RowSettingsManager/RowSettingsManager";

const Canvas = (props) => {
  const rootRef = useRef(null);
  const [rowSettings, setRowSettings] = useState([]);
  const [content, setContent] = useState();
  const [defaultComponentPadding] = useState({
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  })
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
  const [rowPositionConfig, setRowPositionConfig] = useState([]);
  let root = null;

  const generateComponent = (type, position, columns) => {
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
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        content: [],
        position: number,
        verticalAlign: "",
      };
    }
    if (type == "List") {
      component = {
        type: "List",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        content: [],
        position: number,
        verticalAlign: "",
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

  const generateRow = (cols, colSizes) => {
    const newRowConfig = {
      type: "row",
      columns: cols,
      columnSizes: colSizes,
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
    const newPageContent = [];

    pageConfig.content.map((rowConfig) => {
      if (rowConfig.position == row) {
        const newRowComponentContent = [];
        let newPaddings = {
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 0,
          paddingBottom: 0,
        };
        rowConfig.contentComponents.map((component) => {
          if (component.position == item) {
            const updatedComponent = {};
            //Check what type the component is and add the content depending on that
            if (component.type == "Text") {
              updatedComponent.type = component.type;
              updatedComponent.paddingLeft = content.paddingLeft;
              updatedComponent.paddingRight = content.paddingRight;
              updatedComponent.paddingTop = content.paddingTop;
              updatedComponent.paddingBottom = content.paddingBottom;
              updatedComponent.content = content.content;
              updatedComponent.position = content.position;
              updatedComponent.verticalAlign = content.verticalAlign;
            }
            if (component.type == "List") {
              updatedComponent.type = component.type;
              updatedComponent.paddingLeft = content.paddingLeft;
              updatedComponent.paddingRight = content.paddingRight;
              updatedComponent.paddingTop = content.paddingTop;
              updatedComponent.paddingBottom = content.paddingBottom;
              updatedComponent.content = content.content;
              updatedComponent.position = content.position;
              updatedComponent.verticalAlign = content.verticalAlign;
            }
            if (component.type == "Image") {
              updatedComponent.type = component.type;
              updatedComponent.paddingLeft = content.paddingLeft;
              updatedComponent.paddingRight = content.paddingRight;
              updatedComponent.paddingTop = content.paddingTop;
              updatedComponent.paddingBottom = content.paddingBottom;
              updatedComponent.url = content.url;
              updatedComponent.imgWidth = content.imgWidth;
              updatedComponent.imgHeight = content.imgHeight;
              updatedComponent.position = content.position;
            }

            if (rowConfig.cols == 1) {
              newPaddings.paddingLeft = content.paddingLeft;
              newPaddings.paddingRight = content.paddingRight;
              newPaddings.paddingTop = content.paddingTop;
              newPaddings.paddingBottom = content.paddingBottom;
            }

            //The line underneath adds the modified component to the row
            newRowComponentContent.push(updatedComponent);
          } else {
            //Push all components to the updated row that are not to be touched
            newRowComponentContent.push(component);
          }
          //Create the new updated row and add the updated components
        });
        const newRowConfig = {
          ...rowConfig,
          parameters: newPaddings,
          contentComponents: newRowComponentContent,
        };

        //Push the new updated row object to the array of rowConfigs
        newPageContent.push(newRowConfig);
      } else {
        //Push all rowConfigs that are not to be touched to the the pageConfig content
        newPageContent.push(rowConfig);
      }
    });

    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: newPageContent,
    }));
  };

  const deleteContent = (row, item) => {
    const newPageContent = [];
    pageConfig.content.map((rowConfig) => {
      if (rowConfig.position != row) {
        newPageContent.push(rowConfig);
      } else {
        const newContentComponents = [];
        for (let i = 0; i < rowConfig.contentComponents.length; i++) {
          if (rowConfig.contentComponents[i].position != item) {
            newContentComponents.push(rowConfig.contentComponents[i]);
          }
        }
        rowConfig.contentComponents = newContentComponents;
        newPageContent.push(rowConfig);
      }
    });
    const newPageConfig = pageConfig;
    newPageConfig.content = newPageContent;

    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: [...newPageContent],
    }));
    // setPageConfig(newPageContent);
  };

  const deleteRowHandler = (rowPosition) => {
    const newPageContent = [];
    for (let i = 0; i < pageConfig.content.length; i++) {
      if (pageConfig.content[i].position != rowPosition) {
        newPageContent.push(pageConfig.content[i]);
      }
    }
    for (let i = 0; i < newPageContent.length; i++) {
      if (
        newPageContent[i].position > 1 &&
        newPageContent[i].position > rowPosition
      ) {
        newPageContent[i].position = newPageContent[i].position - 1;
      }
    }
    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: [...newPageContent],
    }));
  };

  const confirmRowChanges = (row, newPosition) => {
    const oldRowPosition = row.position;
    const newPageContent = pageConfig.content;
    for (let i = 0; i < pageConfig.content.length; i++) {
      if (newPageContent[i].position == newPosition.value) {
        newPageContent[i].position = oldRowPosition;
      } else if (newPageContent[i].position == oldRowPosition) {
        newPageContent[i].position = newPosition.value;
      }
    }
    setPageConfig((pageConfig) => ({
      ...pageConfig,
      content: [...newPageContent],
    }));
  };

  useEffect(() => {
    if (root == null) {
      const conversion = convertPageConfig(pageConfig);
      let fullStringContent = "";
      conversion.map((stringRow) => {
        fullStringContent += stringRow;
      });
      props.setHTML(fullStringContent);
      const reactContent = parse(fullStringContent, {
        replace: ({ attribs, children }) => {
          if (!attribs) {
            return;
          }

          if (attribs.id === "componentManager") {
            console.log(attribs)
            return (
              <ComponentTypeManager
                componentGeneration={generateComponent}
                elementPosition={attribs.name}
                rowColumns={attribs["data-columns"]}
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
                row={attribs["data-columns"]}
              />
            );
          }
        },
      });
      setContent(reactContent);
      const newRowPositionConfig = [];
      for (let i = 0; i < pageConfig.content.length; i++) {
        newRowPositionConfig.push({
          title: "POSITION " + pageConfig.content[i].position,
          value: pageConfig.content[i].position,
        });
      }
      setRowPositionConfig(newRowPositionConfig);
    }
    // else {
    //   const conversion = convertPageConfig(pageConfig);
    //   let fullStringContent = "";
    //   conversion.map((stringRow) => {
    //     fullStringContent += stringRow;
    //   });
    //   props.setHTML(fullStringContent);
    //   const reactContent = parse(fullStringContent, {
    //     replace: ({ attribs, children }) => {
    //       if (!attribs) {
    //         return;
    //       }
    //       if (attribs.id === "componentManager") {
    //         return (
    //           <ComponentTypeManager
    //             componentGeneration={generateComponent}
    //             elementPosition={attribs.name}
    //           />
    //         );
    //       }
    //       if (attribs.id === "componentContentManager") {
    //         return (
    //           <ComponentContentManager
    //             confirmContent={confirmContent}
    //             elementPosition={attribs.name}
    //             componentType={attribs.role}
    //             deleteFunction={deleteContent}
    //             row={attribs["data-columns"]}
    //           />
    //         );
    //       }
    //     },
    //   });
    //   setContent(reactContent);
    //   const newRowPositionConfig = [];
    //   for (let i = 0; i < pageConfig.content.length; i++) {
    //     newRowPositionConfig.push({
    //       title: "POSITION " + pageConfig.content[i].position,
    //       value: pageConfig.content[i].position,
    //     });
    //   }
    //   setRowPositionConfig(newRowPositionConfig);
    // }
  }, [pageConfig]);

  useEffect(() => {
    if (content) {
      const newRowSettings = [];
      for (let i = 1; i <= pageConfig.content.length; i++) {
        const row = document.getElementById("position-" + i);
        if (row) {
          const rowRightCoordinates = row.getBoundingClientRect().right;
          const rowTopCoordinates = row.getBoundingClientRect().top;
          const rowHeight = row.offsetHeight;
          const settingsTriggerCoordinates = {
            position: i,
            coordinates: {
              right: rowRightCoordinates,
              top: rowTopCoordinates,
            },
            height: rowHeight,
          };
          newRowSettings.push(settingsTriggerCoordinates);
        }
      }
      setRowSettings(newRowSettings);
    }
  }, [content]);

  return (
    <div className={classes.CanvasWrapper}>
      <div id="targetDiv" ref={rootRef}>
        {content}
      </div>
      <CreateRowManager rowGeneration={generateRow} />
      {rowSettings.map((row) => {
        return (
          <RowSettingsManager
            key={"settingsButton" + row.position}
            rowSettings={row}
            row={pageConfig.content[row.position - 1]}
            confirmRowChanges={confirmRowChanges}
            deleteRowHandler={deleteRowHandler}
            positionOptions={rowPositionConfig}
            deleteComponent={deleteContent}
          />
        );
      })}
    </div>
  );
};

export default Canvas;
