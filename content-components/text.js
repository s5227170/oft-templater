import nestingManagement from "../util/nesting-management"

const text = (
  paddings,
  content,
  rowPosition,
  item,
  rowType,
  align,
  columnSizes
) => {
  // console.log(align)
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
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Text"}"  data-columns="${rowType}" data-padding-left="${paddings.paddingLeft}" data-padding-right="${paddings.paddingRight}" data-padding-top="${paddings.paddingTop}" data-padding-bottom="${paddings.paddingBottom}" data-column-sizes="${componentSize}"></span>`
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
                    <td width="${paddings.paddingLeft}"></td>
                    <td height="${paddings.paddingTop}" width="1"></td>
                    <td width="${paddings.paddingRight}"></td>
                </tr>
                <tr>
                    <td></td>
                    <td width="${componentSize - paddings.paddingLeft - paddings.paddingRight
    }" valign="${align ? align : ""}">
                      ${items}
                      <div style="display:none;">&nbsp;</div>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td width="${paddings.paddingLeft}"></td>
                    <td height="${paddings.paddingBottom}" width="1"></td>
                    <td width="${paddings.paddingRight}"></td>
                </tr>
            </tbody>
          </table>`
}

export default text
