import {
  oneColumn,
  twoColumns,
  threeColumns,
  fourColumns,
} from "../content-components/row";
import text from "../content-components/text";
import list from "../content-components/list";
import image from "../content-components/image";
import multiImage from "../content-components/multiImage";

//Function is utilised to take the page config and add all rows and their components into an array of string html rows

const convertPageConfig = (config) => {
  //array of all rows and their components, all in string format, they require a parse
  let htmlContent = [];

  //Format the htmlContent array to have its contents aligned by vallue of position from smallest to biggest
  function sortElementsByPosition(elements) {
    elements.sort((a, b) => {
      return a.position - b.position;
    });

    return elements;
  }

  sortElementsByPosition(config.content);

  config.content.map((row, index) => {
    const subComponents = [];
    if (row.contentComponents.length) {
      for (let i = 0; i < row.contentComponents.length; i++) {
        if (row.contentComponents[i].type == "Text") {
          //Fill the component content and settings
          subComponents.push(
            text(
              row.contentComponents[i].paddingLeft,
              row.contentComponents[i].paddingRight,
              row.contentComponents[i].paddingTop,
              row.contentComponents[i].paddingBottom,
              row.contentComponents[i].content,
              row.position,
              row.contentComponents[i].position,
              row.columns,
              row.contentComponents[i].verticalAlign,
              row.columnSizes
            )
          );
        }
        if (row.contentComponents[i].type == "List") {
          //Fill the component content and settings
          subComponents.push(
            list(
              //Add the attributes just like for the text type
              row.contentComponents[i].paddingLeft,
              row.contentComponents[i].paddingRight,
              row.contentComponents[i].paddingTop,
              row.contentComponents[i].paddingBottom,
              row.contentComponents[i].content,
              row.position,
              row.contentComponents[i].position,
              row.columns,
              row.contentComponents[i].verticalAlign,
              row.columnSizes
            )
          );
        }
        if (row.contentComponents[i].type == "Image") {
          //Fill the component content and settings
          subComponents.push(
            image(
              //Add the attributes just like for the text type
              row.contentComponents[i].paddingLeft,
              row.contentComponents[i].paddingRight,
              row.contentComponents[i].paddingTop,
              row.contentComponents[i].paddingBottom,
              row.contentComponents[i].url,
              row.contentComponents[i].imgWidth,
              row.contentComponents[i].imgHeight,
              row.position,
              row.contentComponents[i].position,
              row.columns,
              row.columnSizes,
              row.contentComponents[i].hyperlink
            )
          );
        }
        if (row.contentComponents[i].type == "MultiImage") {
          //Fill the component content and settings
          subComponents.push(
            multiImage(
              //Add the attributes just like for the text type
              row.contentComponents[i].paddingLeft,
              row.contentComponents[i].paddingRight,
              row.contentComponents[i].paddingTop,
              row.contentComponents[i].paddingBottom,
              row.contentComponents[i].url,
              row.contentComponents[i].imgWidth,
              row.contentComponents[i].imgHeight,
              row.position,
              row.contentComponents[i].position,
              row.columns,
              row.columnSizes
            )
          );
        }
        console.log(row.contentComponents);
      }
    } else {
    }
    if (row.columns == 1) {
      if (!row.contentComponents.length) {
        htmlContent.push(
          oneColumn(
            row.columnSizes,
            row.position,
            row.background,
            row.parameters.paddingLeft,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`
          )
        );
      } else {
        htmlContent.push(
          oneColumn(
            row.columnSizes,
            row.position,
            row.background,
            row.parameters.paddingLeft,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            subComponents[0]
          )
        );
      }
    }
    if (row.columns == 2) {
      if (!row.contentComponents.length) {
        htmlContent.push(
          twoColumns(
            row.columnSizes,
            row.position,
            row.background,
            row.parameters.paddingLeft,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`
          )
        );
      } else {
        if (subComponents.length == 1) {
          if (row.contentComponents[0].position == 1) {
            htmlContent.push(
              twoColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`
              )
            );
          } else if (row.contentComponents[0].position == 2) {
            htmlContent.push(
              twoColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0]
              )
            );
          }
        } else if (subComponents.length == 2) {
          if (row.contentComponents[0].position == 1) {
            htmlContent.push(
              twoColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1]
              )
            );
          } else if (row.contentComponents[0].position == 2) {
            htmlContent.push(
              twoColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[0]
              )
            );
          }
        }
      }
    }
    if (row.columns == 3) {
      if (!row.contentComponents.length) {
        htmlContent.push(
          threeColumns(
            row.columnSizes,
            row.position,
            row.background,
            row.parameters.paddingLeft,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`
          )
        );
      } else {
        //=============================
        if (subComponents.length == 1) {
          if (row.contentComponents[0].position == 1) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`
              )
            );
          }
          if (row.contentComponents[0].position == 2) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`
              )
            );
          }
          if (row.contentComponents[0].position == 3) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[0]
              )
            );
          }
        } else if (subComponents.length == 2) {
          if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 2
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 1
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 3
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 3
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 2
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[1],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 1
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[0]
              )
            );
          }
        } else if (subComponents.length == 3) {
          //========================================================
          if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[0],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[2].position == 2 &&
            row.contentComponents[1].position == 1
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[2],
                subComponents[0]
              )
            );
          }
          //========================================================
          else if (
            row.contentComponents[1].position == 1 &&
            row.contentComponents[0].position == 2 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[2],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[2].position == 1 &&
            row.contentComponents[1].position == 3
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[2].position == 1 &&
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 3
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[0],
                subComponents[1]
              )
            );
          }
          //========================================================
          else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[2],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              threeColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[2],
                subComponents[0]
              )
            );
          }
        }
      }
    }
    if (row.columns == 4) {
      if (!row.contentComponents.length) {
        htmlContent.push(
          fourColumns(
            row.columnSizes,
            row.position,
            row.background,
            row.parameters.paddingLeft,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
          )
        );
      } else {
        //=============================
        if (subComponents.length == 1) {
          if (row.contentComponents[0].position == 1) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          }
          if (row.contentComponents[0].position == 2) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          }
          if (row.contentComponents[0].position == 3) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          }
          if (row.contentComponents[0].position == 4) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                subComponents[0]
              )
            );
          }
        } else if (subComponents.length == 2) {
          if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0],
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[1],
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[1],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[0],
                subComponents[1]
              )
            );
          }
        } else if (subComponents.length == 3) {
          if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1],
                subComponents[2],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[2],
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[0],
                subComponents[2],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[0],
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[2],
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[1],
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item4"></span>`
              )
            );
          }
          //=====================================
          else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0],
                subComponents[1],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0],
                subComponents[2],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[1],
                subComponents[0],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[2],
                subComponents[0],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[1],
                subComponents[2],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[2],
                subComponents[1],
                subComponents[0]
              )
            );
          }
          //=====================================
          else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[1],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[2],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[0],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[0],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[2],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item2"></span>`,
                subComponents[1],
                subComponents[0]
              )
            );
          }
          //=====================================
          else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item3"></span>`,
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[2],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[0],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[2],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[1],
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item1"></span>`,
                subComponents[0]
              )
            );
          }
        } else if (subComponents.length == 4) {
          //=====================================
          //=====================================
          //=====================================
          if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 3 &&
            row.contentComponents[3].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1],
                subComponents[2],
                subComponents[3]
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 2 &&
            row.contentComponents[3].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[2],
                subComponents[1],
                subComponents[3]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 3 &&
            row.contentComponents[3].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[0],
                subComponents[2],
                subComponents[3]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 1 &&
            row.contentComponents[3].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[0],
                subComponents[1],
                subComponents[3]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 2 &&
            row.contentComponents[3].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[2],
                subComponents[0],
                subComponents[3]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 1 &&
            row.contentComponents[3].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[1],
                subComponents[0],
                subComponents[3]
              )
            );
          }
          //=====================================
          else if (
            row.contentComponents[3].position == 1 &&
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[3],
                subComponents[0],
                subComponents[1],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[3].position == 1 &&
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[3],
                subComponents[0],
                subComponents[2],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[3].position == 1 &&
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[3],
                subComponents[1],
                subComponents[0],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[3].position == 1 &&
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[3],
                subComponents[2],
                subComponents[0],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[3].position == 1 &&
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[3],
                subComponents[1],
                subComponents[2],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[3].position == 1 &&
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[3],
                subComponents[2],
                subComponents[1],
                subComponents[0]
              )
            );
          }
          //=====================================
          else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[3].position == 2 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[3],
                subComponents[1],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[3].position == 2 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[3],
                subComponents[2],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[3].position == 2 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[3],
                subComponents[0],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[3].position == 2 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[3],
                subComponents[0],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[3].position == 2 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[2].position == 3
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[3],
                subComponents[2],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[3].position == 2 &&
            row.contentComponents[1].position == 3 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[3],
                subComponents[1],
                subComponents[0]
              )
            );
          }
          //=====================================
          else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[3].position == 3 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[1],
                subComponents[3],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 1 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[3].position == 3 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[0],
                subComponents[2],
                subComponents[3],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[3].position == 3 &&
            row.contentComponents[2].position == 4
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[0],
                subComponents[3],
                subComponents[2]
              )
            );
          } else if (
            row.contentComponents[0].position == 2 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[3].position == 3 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[0],
                subComponents[3],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 1 &&
            row.contentComponents[3].position == 3 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[1],
                subComponents[2],
                subComponents[3],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 4 &&
            row.contentComponents[1].position == 2 &&
            row.contentComponents[3].position == 3 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[2],
                subComponents[1],
                subComponents[3],
                subComponents[0]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[3].position == 1 &&
            row.contentComponents[2].position == 2
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[3],
                subComponents[2],
                subComponents[0],
                subComponents[1]
              )
            );
          } else if (
            row.contentComponents[0].position == 3 &&
            row.contentComponents[1].position == 4 &&
            row.contentComponents[3].position == 2 &&
            row.contentComponents[2].position == 1
          ) {
            htmlContent.push(
              fourColumns(
                row.columnSizes,
                row.position,
                row.background,
                row.parameters.paddingLeft,
                row.parameters.paddingRight,
                row.parameters.paddingTop,
                row.parameters.paddingBottom,
                subComponents[3],
                subComponents[2],
                subComponents[0],
                subComponents[1]
              )
            );
          }
          //=====================================
          //=====================================
          //=====================================
        }
      }
    }
  });

  return htmlContent;
};

export default convertPageConfig;
