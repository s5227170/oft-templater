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

  const componentSize = columnSizes["col" + item]

  let items = "";
  if (contentDistribution.length) {
    for (let i = 0; i < contentDistribution.length; i++) {
      items += contentDistribution[i];
    }
  }

  if (!contentDistribution.length) {
    items = items.concat(
      `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Image"}" data-columns="${rowType}"></span>`
    );
  }

  if (rowType == 1) {
    return `<table width=${componentSize}>
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                      <td width="${
                        componentSize - paddingLeft - paddingRight
                      }" height="${paddingTop ? paddingTop : 1}">
                        <img src="http://welcome.hp-ww.com/img/s.gif" width="${
                          componentSize - paddingLeft - paddingRight
                        }" height="${
      paddingTop ? paddingTop : 1
    }" alt="" style="display:block; width: ${
      600 - paddingLeft - paddingRight
    }px; height:${paddingTop}px;">
                      </td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td></td>
                    <td>
                      ${items}
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                      <td width="${
                        componentSize - paddingLeft - paddingRight
                      }" height="${paddingBottom ? paddingBottom : 1}">
                        <img src="http://welcome.hp-ww.com/img/s.gif" width="${
                          componentSize - paddingLeft - paddingRight
                        }" height="${
      paddingBottom ? paddingBottom : 1
    }" alt="" style="display:block; width: ${
      600 - paddingLeft - paddingRight
    }px; height:${paddingTop}px;">
                      </td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
          </table>`;
  } else {
    return items;
  }
};

export default image;
