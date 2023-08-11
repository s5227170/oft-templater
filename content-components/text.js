import nestingManagement from "../util/nesting-management"

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
  const unrefinedContent = nestingManagement(content, contentArray)

  let items = ""
  const listStart = `<ul style="margin-top: 0px; margin-bottom: 0px;">`
  const listEnd = `</ul>`
  if (unrefinedContent.length) {
    for (let i = 0; i < unrefinedContent.length; i++) {
      let item = ""
      if (unrefinedContent[i].substr(0, 3) == "<li") {
        if (unrefinedContent[i - 1]) {
          if (unrefinedContent[i - 1].substr(0, 3) != "<li") {
            item = `${listStart + unrefinedContent[i]}`
            if (unrefinedContent[i + 1]) {
              if (unrefinedContent[i + 1].substr(0, 3) != "<li") {
                item += listEnd
              }
            }
          } else {
            item += unrefinedContent[i]
            if (unrefinedContent[i + 1]) {
              if (unrefinedContent[i + 1].substr(0, 3) != "<li") {
                item += listEnd
              }
            }
          }
        }
      }
      if (item.length) {
        items += item
      } else {
        items += unrefinedContent[i]
      }
    }
  } else {
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Text"}"  data-columns="${rowType}" data-padding-left="${paddingLeft}" data-padding-right="${paddingRight}" data-padding-top="${paddingTop}" data-padding-bottom="${paddingBottom}" data-column-sizes="${componentSize}"></span>`
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
                    <td width="${
                      componentSize - paddingLeft - paddingRight
                    }" valign="${align ? align : ""}">
                      ${items}
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

export default text
