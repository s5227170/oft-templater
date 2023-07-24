import formatText from "../util/text-format-process"

const list = (
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  content,
  rowPosition,
  item,
  rowType,
  align,
  columnSizes
) => {
  const contentArray = []
  const componentSize = columnSizes["col" + item]
  const unrefinedContent = nestingManagement(content, contentArray)
  // console.log(unrefinedContent)

  let items = ""
  if (unrefinedContent.length) {
    for (let i = 0; i < unrefinedContent.length; i++) {
      items += unrefinedContent[i]
    }
  } else {
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"List"}"  data-columns="${rowType}" data-padding-left="${paddingLeft}" data-padding-right="${paddingRight}" data-padding-top="${paddingTop}" data-padding-bottom="${paddingBottom}" data-column-sizes="${componentSize}"></span>`

  }

  return `<table width=${componentSize} border="0" cellspacing="0" cellpadding="0" style="
  border-spacing: 0;
  width: ${componentSize}px;
  max-width: ${componentSize}px;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
" valign="${align ? align : ""}">
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingTop}" width="1"></td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td></td>
                    <td width="${componentSize - paddingLeft - paddingRight
    }" valign="${align ? align : ""}">
                      <ul style="margin-top: 0px; margin-bottom: 0px;">
                      ${items}
                      </ul>
                      <div style="display:none;">&nbsp;</div>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingBottom}" width="1"></td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
          </table>`
}

export default list

// function performChanges(nestedArrays) {
//   for (let i = 0; i < nestedArrays.length; i++) {
//     let item = null
//     if (nestedArrays[i].children) {
//       item = nestedArrays[i].children
//     } else {
//       item = nestedArrays[i]
//     }
//     if (Array.isArray(item)) {
//       performChanges(item) // Recursively perform changes on nested arrays
//     } else if (typeof item === "object" && item.hasOwnProperty("text")) {
//       // Perform changes to the object containing "text" element
//       item.text.replace("<", "&#60;")
//     }
//   }
// }

function nestingManagement(nestedArrays, items) {
  let item = nestedArrays
  let elementType = "";
  if (item.type) {
    elementType = item.type;
  } else {
    elementType = "paragraph"
  }

  if (item.children) {
    if (Array.isArray(item.children)) {
      let sentence = ""
      let alignment = ""
      for (let m = 0; m < item.children.length; m++) {
        if (typeof item.children[m] === "object" && (item.children[m].hasOwnProperty("text") || Object.keys(item.children[m]).length == 0)) {
          if (item.children[m].children) {
            for (let k = 0; k < item.children[m].children.length; k++) {
              sentence += formatText(item.children[m].children[k].text)
              // if(item.children[m].align) {
              // alignment = item.children[m].align
              // }
            }
          } else {
            sentence += formatText(item.children[m])
            // alignment = item.children[m].align
          }
        } else {
          for (let f = 0; f < item.children.length; f++) {
            console.log(item[f])
            nestingManagement(item[f].children, items) // Recursively perform changes on nested arrays
          }
        }
      }
      // console.log(sentence)
      // console.log(item)
      // console.log(elementType)
      switch (elementType) {
        case "list-item":
          items.push(
            `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
            };">${sentence}</li>`
          )
          break;
        case "paragraph":
          items.push(
            `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
            };">${sentence}</p>`
          )
          break;
      }

      // console.log(items)
      return items
    }
  } else {
    if (Array.isArray(item)) {
      let alignment = ""
      let sentence = ""
      for (let m = 0; m < item.length; m++) {
        if (typeof item[m] === "object" && (item[m].hasOwnProperty("text"))) {
          if (item[m].children) {
            for (let k = 0; k < item[m].children.length; k++) {
              sentence += formatText(item[m].children[k])

            }
            // console.log(item)
            // console.log(elementType)
            switch (elementType) {
              case "list-item":
                items.push(
                  `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
                  };">${sentence}</li>`
                )
                break;
              case "paragraph":
                items.push(
                  `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${alignment ? alignment : "left"
                  };">${sentence}</p>`
                )
                break;
            }
          }
        } else {
          for (let f = 0; f < item[m].children.length; f++) {
            nestingManagement(item[m].children[f], items) // Recursively perform changes on nested arrays
          }
        }
      }
      // console.log(items)
      return items
    } else {
      if (item.text) {
        console.log("1")

        switch (elementType) {
          case "list-item":
            items.push(
              `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${item.align ? item.align : "left"
              };">${formatText(item)}</li>`
            )
            break;
          case "paragraph":
            items.push(
              `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${item.align ? item.align : "left"
              };">${formatText(item)}</p>`
            )
            break;
        }
      } else {
        console.log("2")
        //This else might not be needed

        switch (elementType) {
          case "list-type":
            items.push(
              `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${item.align ? item.align : "left"
              };">${formatText(item)}</li>`
            )
            break;
          case "paragraph":
            items.push(
              `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${item.align ? item.align : "left"
              };">${formatText(item)}</p>`
            )
            break;
        }
      }
      // console.log(items)
      return items
    }
  }
}
