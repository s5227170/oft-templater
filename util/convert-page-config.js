import {
  oneColumn,
  twoColumns,
  threeColumns,
  fourColumns,
} from "../content-components/row"
import text from "../content-components/text"
import image from "../content-components/image"
import multiImage from "../content-components/multiImage"
import converter from "./converter"

//Function is utilised to take the page config and add all rows and their components into an array of string html rows

const convertPageConfig = (config) => {
  //array of all rows and their components, all in string format, they require a parse
  let htmlContent = []

  //Format the htmlContent array to have its contents aligned by vallue of position from smallest to biggest
  function sortElementsByPosition(elements) {
    elements.sort((a, b) => {
      return a.position - b.position
    })

    return elements
  }

  sortElementsByPosition(config.content)

  config.content.map((row, index) => {
    let subComponents = []
    if (row.contentComponents.length) {
      for (let i = 0; i < row.contentComponents.length; i++) {
        if (row.contentComponents[i].type == "Text") {
          //Fill the component content and settings
          subComponents.push(
            text(
              {
                paddingLeft: row.contentComponents[i].paddings.paddingLeft,
                paddingRight: row.contentComponents[i].paddings.paddingRight,
                paddingTop: row.contentComponents[i].paddings.paddingTop,
                paddingBottom: row.contentComponents[i].paddings.paddingBottom
              },
              row.contentComponents[i].content,
              row.position,
              row.contentComponents[i].position,
              row.columns,
              row.contentComponents[i].verticalAlign,
              row.columnSizes
              
            )
          )
        }
        if (row.contentComponents[i].type == "Image") {
          //Fill the component content and settings
          subComponents.push(
            image(
              //Add the attributes just like for the text type
              {
                paddingLeft: row.contentComponents[i].paddings.paddingLeft,
                paddingRight: row.contentComponents[i].paddings.paddingRight,
                paddingTop: row.contentComponents[i].paddings.paddingTop,
                paddingBottom: row.contentComponents[i].paddings.paddingBottom
              },
              row.contentComponents[i].url,
              row.contentComponents[i].imgWidth,
              row.contentComponents[i].imgHeight,
              row.position,
              row.contentComponents[i].position,
              row.columns,
              row.columnSizes,
              row.contentComponents[i].hyperlink,
              row.contentComponents[i].verticalAlign,
            )
          )
        }
        if (row.contentComponents[i].type == "MultiImage") {
          //Fill the component content and settings
          subComponents.push(
            multiImage(
              //Add the attributes just like for the text type
              {
                paddingLeft: row.contentComponents[i].paddings.paddingLeft,
                paddingRight: row.contentComponents[i].paddings.paddingRight,
                paddingTop: row.contentComponents[i].paddings.paddingTop,
                paddingBottom: row.contentComponents[i].paddings.paddingBottom
              },
              row.contentComponents[i].url,
              row.contentComponents[i].imgWidth,
              row.contentComponents[i].imgHeight,
              row.position,
              row.contentComponents[i].position,
              row.columns,
              row.columnSizes
            )
          )
        }
      }
    }

    htmlContent.push(converter(row, subComponents))
  })

  return htmlContent
}

export default convertPageConfig
