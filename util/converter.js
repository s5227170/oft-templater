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
        {
          paddingLeft: row.paddings.paddingLeft,
          paddingRight: row.paddings.paddingRight,
          paddingTop: row.paddings.paddingTop,
          paddingBottom: row.paddings.paddingBottom
        },
        resultArray[0],
        row.contentComponents[0] ? row.contentComponents[0].verticalAlign : "top"
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
        {
          paddingLeft: row.paddings.paddingLeft,
          paddingRight: row.paddings.paddingRight,
          paddingTop: row.paddings.paddingTop,
          paddingBottom: row.paddings.paddingBottom
        },
        resultArray[0],
        resultArray[1],
        row.contentComponents[0] ? row.contentComponents[0].verticalAlign : "top",
        row.contentComponents[1] ? row.contentComponents[1].verticalAlign : "top"
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
        {
          paddingLeft: row.paddings.paddingLeft,
          paddingRight: row.paddings.paddingRight,
          paddingTop: row.paddings.paddingTop,
          paddingBottom: row.paddings.paddingBottom
        },
        resultArray[0],
        resultArray[1],
        resultArray[2],
        row.contentComponents[0] ? row.contentComponents[0].verticalAlign : "top",
        row.contentComponents[1] ? row.contentComponents[1].verticalAlign : "top",
        row.contentComponents[2] ? row.contentComponents[2].verticalAlign : "top",
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
    console.log(row.contentComponents)

    htmlContent.push(
      fourColumns(
        row.columnSizes,
        row.position,
        row.background,
        {
          paddingLeft: row.paddings.paddingLeft,
          paddingRight: row.paddings.paddingRight,
          paddingTop: row.paddings.paddingTop,
          paddingBottom: row.paddings.paddingBottom
        },
        resultArray[0],
        resultArray[1],
        resultArray[2],
        resultArray[3],
        row.contentComponents[0] ? row.contentComponents[0].verticalAlign ? row.contentComponents[0].verticalAlign : "top" : "top",
        row.contentComponents[1] ? row.contentComponents[1].verticalAlign ? row.contentComponents[1].verticalAlign : "top" : "top",
        row.contentComponents[2] ? row.contentComponents[2].verticalAlign ? row.contentComponents[2].verticalAlign : "top" : "top",
        row.contentComponents[3] ? row.contentComponents[3].verticalAlign ? row.contentComponents[3].verticalAlign : "top" : "top",
      )
    );
  }

  return htmlContent;
};

export default converter;
