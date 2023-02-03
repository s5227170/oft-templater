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
  rowType
) => {

  console.log(item)
  const contentDistribution = url.map((url) => {
    return `<img width=${imgWIdth} height=${imgHeight} src="${url}" />`;
  });

  let componentSize = 0;

  if (rowType == 1) {
    componentSize = "600";
  }
  if (rowType == 2) {
    componentSize = "300";
  }

  if (rowType == 3) {
    componentSize = "200";
  }

  let items = "";
  if (contentDistribution.length) {
    for (let i = 0; i < contentDistribution.length; i++) {
      items = items.concat(contentDistribution[i]);
    }
  }

  if (!contentDistribution.length) {
    items = items.concat(
      `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Image"}"></span>`
    );
  }

  return `
            <table width=${componentSize}>
                <tbody>
                    <tr>
                        <td width="${paddingLeft}"></td>
                        <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width=${componentSize} height="${paddingTop}" alt="" style="display:block;"></td>
                        <td width="${paddingRight}"></td>
                    </tr>
                    <tr width=${componentSize}>
                        <td width="${paddingLeft}"></td>
                        <td>
                            ${items}
                        </td>
                        <td width="${paddingRight}"></td>
                    </tr>
                    <tr>
                        <td width="${paddingLeft}"></td>
                        <td height="${paddingBottom}"><img src="http://welcome.hp-ww.com/img/s.gif" width=${componentSize} height="${paddingBottom}" alt="" style="display:block;"></td>
                        <td width="${paddingRight}"></td>
                    </tr>
                </tbody>
            </table>
        `;
};

export default image;
