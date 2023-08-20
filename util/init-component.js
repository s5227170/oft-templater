const row = (cols, colSizes, position) => {
  return {
    type: "row",
    columns: cols,
    columnSizes: colSizes,
    background: "#fff",
    position: position,
    parameters: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    contentComponents: [],
  }
}

const text = (parameters, position) => {
  return {
    type: "Text",
    paddingLeft: parameters.paddingLeft,
    paddingRight: parameters.paddingRight,
    paddingTop: parameters.paddingTop,
    paddingBottom: parameters.paddingBottom,
    content: [],
    position: position,
    verticalAlign: "",
  }
}


const image = (parameters, position) => {
  return {
    type: "Image",
    paddingLeft: parameters.paddingLeft,
    paddingRight: parameters.paddingRight,
    paddingTop: parameters.paddingTop,
    paddingBottom: parameters.paddingBottom,
    url: [],
    imgWidth: 0,
    imgHeight: 0,
    position: position,
    hyperlink: "",
  }
}

const multiImage = (parameters, position) => {
  return {
    type: "MultiImage",
    paddingLeft: parameters.paddingLeft,
    paddingRight: parameters.paddingRight,
    paddingTop: parameters.paddingTop,
    paddingBottom: parameters.paddingBottom,
    url: [],
    imgWidth: 0,
    imgHeight: 0,
    position: position,
  }
}

export default { row, text, image, multiImage }
