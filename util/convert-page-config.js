import { oneColumn, twoColumns, threeColumns } from "../content-components/row";
import text from "../content-components/text";
import list from "../content-components/list";
import image from "../content-components/image";

//Function is utilised to take the page config and add all rows and their components into an array of string html rows

const convertPageConfig = (config) => {
  //array of all rows and their components, all in string format, they require a parse
  let htmlContent = [];

  config.content.map((row, index) => {
    const subComponents = [];
    if (row.contentComponents.length) {
      //Check what type the component is
      for (let i = 0; i < row.contentComponents.length; i++) {
        console.log(row.contentComponents[i]);
        if (row.contentComponents[i].type == "Text") {
          //Fill the component content and settings
          subComponents.push(
            text(
              row.contentComponents[i].background,
              row.contentComponents[i].color,
              row.contentComponents[i].fontFamily,
              row.contentComponents[i].fontSize,
              row.contentComponents[i].paddingLeft,
              row.contentComponents[i].paddingRight,
              row.contentComponents[i].paddingTop,
              row.contentComponents[i].paddingBottom,
              ["Hello Bitch", "I am working", "How do you feel"]
              // row.contentComponents[i].content
            )
          );
        }
        if (row.contentComponents[i].type == "List") {
          //Fill the component content and settings
          subComponents.push(
            list(
              //Add the attributes just like for the text type
              row.contentComponents[i].background,
              row.contentComponents[i].color,
              row.contentComponents[i].fontFamily,
              row.contentComponents[i].fontSize,
              row.contentComponents[i].paddingLeft,
              row.contentComponents[i].paddingRight,
              row.contentComponents[i].paddingTop,
              row.contentComponents[i].paddingBottom,
              row.contentComponents[i].content
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
              row.contentComponents[i].paddingBottom
            )
          );
        }
      }
    }
    console.log(subComponents[0]);

    const position = row.position;
    if (row.columns == 1) {
      if (!row.contentComponents.length) {
        htmlContent.push(
          oneColumn(
            row.parameters.paddingBottom,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            `<span id="componentManager" name="row${position}#item1"></span>`
          )
        );
      } else {
        htmlContent.push(
          oneColumn(
            row.parameters.paddingBottom,
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
            row.parameters.paddingBottom,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            `<span id="componentManager" name="row${position}#item1"></span>`,
            `<span id="componentManager" name="row${position}#item2"></span>`
          )
        );
      } else {
        htmlContent.push(
          twoColumns(
            row.parameters.paddingBottom,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            subComponents[0],
            subComponents[1]
          )
        );
      }
    }
    if (row.columns == 3) {
      if (!row.contentComponents.length) {
        htmlContent.push(
          threeColumns(
            row.parameters.paddingBottom,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            `<span id="componentManager" name="row${position}#item1"></span>`,
            `<span id="componentManager" name="row${position}#item2"></span>`,
            `<span id="componentManager" name="row${position}#item3"></span>`
          )
        );
      } else {
        htmlContent.push(
          threeColumns(
            row.parameters.paddingBottom,
            row.parameters.paddingRight,
            row.parameters.paddingTop,
            row.parameters.paddingBottom,
            subComponents[0],
            subComponents[1],
            subComponents[2]
          )
        );
      }
    }
  });

  console.log(htmlContent);

  return htmlContent;
};

export default convertPageConfig;

//Check if the row has any components and if it doesn't keep the subComponent variable empty
