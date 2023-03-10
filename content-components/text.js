const text = (
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
  const contentDistribution = content.map((paragraph) => {
    let wholeParagraph = ""
    for (let i = 0; i < paragraph.children.length; i++) {
      let textContent = paragraph.children[i].text
      textContent = textContent.replace("<", "&#60;")
      if (paragraph.children[i].hyperlink) {
        textContent = `<a style="text-decoration: none;" href="${paragraph.children[i].hyperlink}">${textContent}</a>`
      }
      if (paragraph.children[i].underline) {
        textContent = `<u>${textContent}</u>`
      }
      if (paragraph.children[i].bold) {
        textContent = `<strong>${textContent}</strong>`
      }
      if (paragraph.children[i].small) {
        textContent = `<span style="font-size: 11px; line-height: 14px; display: inline-block;">${textContent}</span>`
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
    if (!paragraph.children[0].text.length) {
      contentArray.push(
        `<p style="font-size: 8px; line-height: 8px; display: block; margin: 0px">&nbsp;</p>`
      )
    }
    if (paragraph.type == "heading-two") {
      contentArray.push(
        `<h2 style="font-family: arial; font-size: 18px; margin: 0px; display: inline-block; line-height: 24px; text-align: ${
          paragraph.align ? paragraph.align : "left"
        };">${wholeParagraph}</h2>`
      )
    }
    if (paragraph.type == "heading-one") {
      contentArray.push(
        `<h1 style="font-family: arial; font-size: 20px; margin: 0px; display: inline-block; line-height: 24px; text-align: ${
          paragraph.align ? paragraph.align : "left"
        };">${wholeParagraph}</h1>`
      )
    }
    if (paragraph.type == "paragraph") {
      console.log(paragraph)
      contentArray.push(
        `<p style="font-family: arial; margin: 0px; font-size: 14px; line-height:22px; display: inline-block; text-align: ${
          paragraph.align ? paragraph.align : "left"
        };">${wholeParagraph}</p>`
      )
    }
  })

  let items = ""
  if (contentArray.length) {
    for (let i = 0; i < contentArray.length; i++) {
      items += contentArray[i]
    }
  }

  if (!contentArray.length) {
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Text"}"  data-columns="${rowType}" data-padding-left="${paddingLeft}" data-padding-right="${paddingRight}" data-padding-top="${paddingTop}" data-padding-bottom="${paddingBottom}" data-column-sizes="${componentSize}"></span>`
  }

  return `<table width=${componentSize} border="0" cellspacing="0" cellpadding="0" style="border-spacing: 0; width: ${componentSize}px; max-width: ${componentSize}px;mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="${
    align ? align : ""
  }">
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingTop}" width="1"></td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td></td>
                    <td width="${
                      componentSize - paddingLeft - paddingRight
                    }" valign="${align ? align : ""}">
                      ${items}
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

export default text
