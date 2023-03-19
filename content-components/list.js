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
  //Type 1, Type 2, and Type 3
  let type = ""
  const componentSize = columnSizes["col" + item]
  const contentDistribution = content.map((paragraph) => {
    let wholeParagraph = ""
    if (paragraph.children) {
      for (let i = 0; i < paragraph.children.length; i++) {
        if (paragraph.children[i].children) {
          for (let j = 0; j < paragraph.children[i].children.length; j++) {
            type = "Type 1"
            let textContent = paragraph.children[i].children[j].text
            textContent = textContent.replace("<", "&#60;")

            if (paragraph.children[i].children[j].hyperlink) {
              textContent = `<a style="text-decoration: none; color: ${paragraph.children[i].children[j].color
                ? paragraph.children[i].children[j].color
                : "inherit"
                };" href="${paragraph.children[i].children[j].hyperlink
                }">${textContent}</a>`
            }
            if (paragraph.children[i].children[j].underline) {
              textContent = `<u>${textContent}</u>`
            }
            if (paragraph.children[i].children[j].bold) {
              textContent = `<strong>${textContent}</strong>`
            }
            if (paragraph.children[i].children[j].small) {
              textContent = `<span style="font-size: 11px; line-height: 14px;">${textContent}</span>`
            }
            if (
              paragraph.children[i].children[j].color &&
              paragraph.children[i].children[j].background
            ) {
              wholeParagraph += `<span style="text-decoration: none; color: ${paragraph.children[i].children[j].color}; background-color: ${paragraph.children[i].children[j].background}";>${textContent}</span>`
            } else if (paragraph.children[i].children[j].color) {
              wholeParagraph += `<span style="text-decoration: none; color: ${paragraph.children[i].children[j].color}";>${textContent}</span>`
            } else if (paragraph.children[i].children[j].background) {
              wholeParagraph += `<span style="text-decoration: none; background-color: ${paragraph.children[i].children[j].background}";>${textContent}</span>`
            } else {
              wholeParagraph += textContent
            }
            if (wholeParagraph != "") {
              contentArray.push(
                `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${paragraph.align ? paragraph.align : "left"
                };">${wholeParagraph}</li>`
              )
            }
          }
          wholeParagraph = ""
        } else {
          type = "Type 2"
          let textContent = paragraph.children[i].text
          textContent = textContent.replace("<", "&#60;")
          if (paragraph.children[i].hyperlink) {
            textContent = `<a style="text-decoration: none; color: ${paragraph.children[i].color
              ? paragraph.children[i].color
              : "inherit"
              };" href="${paragraph.children[i].hyperlink}">${textContent}</a>`
          }
          if (paragraph.children[i].underline) {
            textContent = `<u>${textContent}</u>`
          }
          if (paragraph.children[i].bold) {
            textContent = `<strong>${textContent}</strong>`
          }
          if (paragraph.children[i].small) {
            textContent = `<span style="font-size: 11px; line-height: 14px;">${textContent}</span>`
          }
          if (paragraph.children[i].color && paragraph.children[i].background) {
            wholeParagraph += `<span style="text-decoration: none; color: ${paragraph.children[i].color}; background-color: ${paragraph.children[i].background}";>${textContent}</span>`
          } else if (paragraph.children[i].color) {
            wholeParagraph += `<span style="text-decoration: none; color: ${paragraph.children[i].color}";>${textContent}</span>`
          } else if (paragraph.children[i].background) {
            wholeParagraph += `<span style="text-decoration: none; background-color: ${paragraph.children[i].background}";>${textContent}</span>`
          } else {
            wholeParagraph += textContent
          }
        }
      }
    } else {
      type = "Type 3"
      wholeParagraph = wholeParagraph.replace("<", "&#60;")
      let textContent = paragraph.text
      textContent = textContent.replace("<", "&#60;")
      if (paragraph.hyperlink) {
        textContent = `<a style="text-decoration: none; color: ${paragraph.children[i].color ? paragraph.children[i].color : "inherit"
          };" href="${paragraph.hyperlink}">${textContent}</a>`
      }
      if (paragraph.underline) {
        textContent = `<u>${textContent}</u>`
      }
      if (paragraph.bold) {
        textContent = `<strong>${textContent}</strong>`
      }
      if (paragraph.small) {
        textContent = `<span style="font-size: 11px; line-height: 14px; display: inline-block;">${textContent}</span>`
      }
      if (paragraph.color && paragraph.background) {
        wholeParagraph += `<span style="color: ${paragraph.color}; background-color: ${paragraph.background}";>${textContent}</span>`
      } else if (paragraph.color) {
        wholeParagraph += `<span style="color: ${paragraph.color}">${textContent}</span>`
      } else if (paragraph.background) {
        wholeParagraph += `<span style="background-color: ${paragraph.background}">${textContent}</span>`
      } else {
        wholeParagraph += textContent
      }
    }
    if (wholeParagraph != "") {
      if (type != "type 1") {
        contentArray.push(
          `<li style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; text-align: ${paragraph.align ? paragraph.align : "left"
          };">${wholeParagraph}</li>`
        )
      }
    }
  })
  // })

  let items = ""
  if (contentArray.length) {
    for (let i = 0; i < contentArray.length; i++) {
      items += contentArray[i]
    }
  }

  if (!contentDistribution.length) {
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
