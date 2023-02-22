const image = (
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  url,
  imgWIdth,
  imgHeight,
  rowPosition,
  item,
  rowType,
  columnSizes
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
    return `<img style="height:${height}px; width:${width}px;"  width="${width}" height="${height}" src="${url}" />`;
  });

  const componentSize = columnSizes["col" + item];

  let items = "";
  if (contentDistribution.length) {
    for (let i = 0; i < contentDistribution.length; i++) {
      items += contentDistribution[i];
    }
  }

  if (!contentDistribution.length) {
    // let paddings = {
    //   paddingValues: [
    //     paddingLeft: paddingLeft,
    //     paddingRight: paddingRight,
    //     paddingTop: paddingTop,
    //     paddingBottom: paddingBottom,
    //   ],
    // };
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Image"}" data-columns="${rowType}" data-padding-left="${paddingLeft}" data-padding-right="${paddingRight}" data-padding-top="${paddingTop}" data-padding-bottom="${paddingBottom}" data-column-sizes="${componentSize}"></span>`;
  }

  // if (rowType == 1) {
  return `<table width=${componentSize} border="0" cellspacing="0" cellpadding="0" style="
  border-spacing: 0;
  width: ${componentSize}px;
  max-width: ${componentSize}px;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;">
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                      <td>
                        <img src="http://welcome.hp-ww.com/img/s.gif" width="${
                          componentSize - paddingLeft - paddingRight
                        }" height="${
    paddingTop ? paddingTop : 1
  }" alt="" style="display:block; width: ${
    componentSize - paddingLeft - paddingRight
  }px; height:${paddingTop}px;">
                      </td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td></td>
                    <td width="${componentSize - paddingLeft - paddingRight}">
                      ${items}
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                      <td>
                        <img src="http://welcome.hp-ww.com/img/s.gif" width="${
                          componentSize - paddingLeft - paddingRight
                        }" height="${
    paddingBottom ? paddingBottom : 1
  }" alt="" style="display:block; width: ${
    componentSize - paddingLeft - paddingRight
  }px; height:${paddingBottom}px;">
                      </td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
          </table>`;
};

export default image;
