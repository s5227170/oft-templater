const row = (cols, colSizes, position) => {
  return {
    type: "row",
    columns: cols,
    columnSizes: colSizes,
    background: "#fff",
    position: position,
    paddings: {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    contentComponents: [],
  }
}

const text = (paddings, position) => {
  return {
    type: "Text",
    paddings: {
      paddingLeft: paddings.paddingLeft,
      paddingRight: paddings.paddingRight,
      paddingTop: paddings.paddingTop,
      paddingBottom: paddings.paddingBottom,
    },
    content: [],
    position: position,
    verticalAlign: "top",
    created: false
  }
}


const image = (paddings, position) => {
  return {
    type: "Image",
    paddings: {
      paddingLeft: paddings.paddingLeft,
      paddingRight: paddings.paddingRight,
      paddingTop: paddings.paddingTop,
      paddingBottom: paddings.paddingBottom,
    },
    url: [],
    imgWidth: 0,
    imgHeight: 0,
    position: position,
    hyperlink: "",
    verticalAlign: "top",
    created: false
  }
}

const multiImage = (paddings, position) => {
  return {
    type: "MultiImage",
    paddings: {
      paddingLeft: paddings.paddingLeft,
      paddingRight: paddings.paddingRight,
      paddingTop: paddings.paddingTop,
      paddingBottom: paddings.paddingBottom,
    },
    url: [],
    imgWidth: 0,
    imgHeight: 0,
    position: position,
  }
}

export default { row, text, image, multiImage }
