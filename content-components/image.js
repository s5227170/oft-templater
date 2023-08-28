const image = (
  paddings,
  url,
  imgWIdth,
  imgHeight,
  rowPosition,
  item,
  rowType,
  columnSizes,
  hyperlink,
  align,
) => {
  let height = "";
  let width = "";
  if (imgHeight != 0) {
    height = imgHeight;
  }
  if (imgWIdth != 0) {
    width = imgWIdth;
  }
  const contentDistribution = url.map((url) => {
    if (hyperlink.length) {
      return `<a href=${hyperlink}><img style="height:${height}px; width:${width}px;"  width="${width}" height="${height}" src="${url}" /></a>`;
    } else {
      return `<img style="height:${height}px; width:${width}px;"  width="${width}" height="${height}" src="${url}" />`;
    }
  });

  const componentSize = columnSizes["col" + item];

  let items = "";
  if (contentDistribution.length) {
    for (let i = 0; i < contentDistribution.length; i++) {
      items += contentDistribution[i];
    }
  }

  if (!contentDistribution.length) {
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Image"}" data-columns="${rowType}" data-padding-left="${paddings.paddingLeft}" data-padding-right="${paddings.paddingRight}" data-padding-top="${paddings.paddingTop}" data-padding-bottom="${paddings.paddingBottom}" data-column-sizes="${componentSize}"></span>`;
  }

  return `<table width=${componentSize} border="0" cellspacing="0" cellpadding="0" style="border-spacing: 0; width: ${componentSize}px; max-width: ${componentSize}px;mso-table-lspace: 0pt; mso-table-rspace: 0pt;" valign="${align ? align : ""}">
            <tbody>
                <tr>
                    <td width="${paddings.paddingLeft}"></td>
                    <td height="${paddings.paddingTop}" width="1"></td>
                    <td width="${paddings.paddingRight}"></td>
                </tr>
                <tr>
                    <td></td>
                    <td width="${componentSize - paddings.paddingLeft - paddings.paddingRight}" valign="${align ? align : ""}">
                      ${items}
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td width="${paddings.paddingLeft}"></td>
                    <td height="${paddings.paddingBottom}" width="1"></td>
                    <td width="${paddings.paddingRight}"></td>
                </tr>
            </tbody>
          </table>`;
};

export default image;
