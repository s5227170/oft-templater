import {
  oneColumn,
  twoColumns,
  threeColumns,
  fourColumns,
} from "../content-components/row";

const converter = (row, subComponents) => {
  const htmlContent = [];

  subComponents = subComponents.sort((a, b) => a.position - b.position);

  if (row.columns == 1) {
    const resultArray = [undefined, undefined, undefined];

    for (let i = 1; i <= 1; i++) {
      if (row.contentComponents[i - 1]) {
        const position = row.contentComponents[i - 1].position - 1;
        resultArray[position] = subComponents[i - 1];
      }
    }

    // Loop through the result array and add missing string literals for any undefined positions
    for (let i = 0; i < 1; i++) {
      if (resultArray[i] === undefined) {
        resultArray[i] = `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${i + 1}"></span>`;
      }
    }
    htmlContent.push(
      oneColumn(
        row.columnSizes,
        row.position,
        row.background,
        row.parameters.paddingLeft,
        row.parameters.paddingRight,
        row.parameters.paddingTop,
        row.parameters.paddingBottom,
        resultArray[0]
      )
    );
  }
  if (row.columns == 2) {
    const resultArray = [undefined, undefined, undefined];

    for (let i = 1; i <= 2; i++) {
      if (row.contentComponents[i - 1]) {
        const position = row.contentComponents[i - 1].position - 1;
        resultArray[position] = subComponents[i - 1];
      }
    }

    // Loop through the result array and add missing string literals for any undefined positions
    for (let i = 0; i < 2; i++) {
      if (resultArray[i] === undefined) {
        resultArray[i] = `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${i + 1}"></span>`;
      }
    }

    htmlContent.push(
      twoColumns(
        row.columnSizes,
        row.position,
        row.background,
        row.parameters.paddingLeft,
        row.parameters.paddingRight,
        row.parameters.paddingTop,
        row.parameters.paddingBottom,
        resultArray[0],
        resultArray[1]
      )
    );
  }
  if (row.columns == 3) {
    const resultArray = [undefined, undefined, undefined];

    for (let i = 1; i <= 3; i++) {
      if (row.contentComponents[i - 1]) {
        const position = row.contentComponents[i - 1].position - 1;
        resultArray[position] = subComponents[i - 1];
      }
    }

    // Loop through the result array and add missing string literals for any undefined positions
    for (let i = 0; i < 3; i++) {
      if (resultArray[i] === undefined) {
        resultArray[i] = `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${i + 1}"></span>`;
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
        resultArray[0],
        resultArray[1],
        resultArray[2]
      )
    );
  }
  if (row.columns == 4) {
    const resultArray = [undefined, undefined, undefined];

    for (let i = 1; i <= 4; i++) {
      if (row.contentComponents[i - 1]) {
        const position = row.contentComponents[i - 1].position - 1;
        resultArray[position] = subComponents[i - 1];
      }
    }

    // Loop through the result array and add missing string literals for any undefined positions
    for (let i = 0; i < 4; i++) {
      if (resultArray[i] === undefined) {
        resultArray[i] = `<span data-columns="${row.columns}"  id="componentManager" name="row${row.position}#item${i + 1}"></span>`;
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
        resultArray[0],
        resultArray[1],
        resultArray[2],
        resultArray[3],
      )
    );
  }
  // console.log(subComponents)
  // console.log(htmlContent)

  return htmlContent;
};

export default converter;
