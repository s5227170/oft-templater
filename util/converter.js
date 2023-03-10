import {
  oneColumn,
  twoColumns,
  threeColumns,
  fourColumns,
} from "../content-components/row";

const converter = (row, subComponents) => {
  console.log(subComponents)
  const components = [];
  const htmlContent = [];
  switch (row.columns) {
    case 1:
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
      break;
    case 2:
      if (row.contentComponents.length) {
        for (let l = 1; l <= 2; l++) {
          for (let j = 0; j < row.contentComponents.length; j++) {
            if (row.contentComponents[j].position == l) {
              components.push(subComponents[j]);
            }
          }
        }
      } else {
        for (let l = 1; l <= 2; l++) {
          components.push(
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${l}"></span>`
          );
        }
      }
      console.log(components)

      htmlContent.push(
        twoColumns(
          row.columnSizes,
          row.position,
          row.background,
          row.parameters.paddingLeft,
          row.parameters.paddingRight,
          row.parameters.paddingTop,
          row.parameters.paddingBottom,
          components[0],
          components[1]
        )
      );

      break;
    case 3:
      if (row.contentComponents.length) {
        for (let l = 1; l <= 3; l++) {
          for (let j = 0; j < row.contentComponents.length; j++) {
            if (row.contentComponents[j].position == l) {
              components.push(subComponents[j]);
            } else {
              components.push(
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${l}"></span>`
              );
            }
          }
        }
      } else {
        for (let l = 1; l <= 3; l++) {
          components.push(
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${l}"></span>`
          );
        }
      }

      htmlContent.push(
        threeColumns(
          row.columnSizes,
          row.position,
          row.background,
          row.parameters.paddingLeft,
          row.parameters.paddingRight,
          row.parameters.paddingTop,
          row.parameters.paddingBottom,
          components[0],
          components[1],
          components[2]
        )
      );
      break;
    case 4:
      if (row.contentComponents.length) {
        for (let l = 1; l <= 4; l++) {
          for (let j = 0; j < row.contentComponents.length; j++) {
            if (row.contentComponents[j].position == l) {
              components.push(subComponents[j]);
            } else {
              components.push(
                `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${l}"></span>`
              );
            }
          }
        }
      } else {
        for (let l = 1; l <= 4; l++) {
          components.push(
            `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${l}"></span>`
          );
        }
      }

      htmlContent.push(
        fourColumns(
          row.columnSizes,
          row.position,
          row.background,
          row.parameters.paddingLeft,
          row.parameters.paddingRight,
          row.parameters.paddingTop,
          row.parameters.paddingBottom,
          components[0],
          components[1],
          components[2],
          components[3]
        )
      );
      break;
  }
  return htmlContent;
};

export default converter;
