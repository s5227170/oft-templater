const list = (
  background,
  color,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  content,
  rowPosition,
  item,
  rowType
) => {
  const contentDistribution = content.map((paragraph) => {
    //Add functionality for recognition of content type. For example, the compiler should recognise if some text is an h1, h2, or a p. According
    //to the type of element, set the size accordingly, and depending on properties, add bold, or similar
    //Maybe check what the "paragraph" element is and then set it up depending on that
    return `
                <li style="background: ${background}; color: ${color}; font-family: arial; font-size: 16px;">${paragraph}</li>
                
        `;
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
      `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"List"}"></span>`
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
                    <td width=${componentSize}>
                        <table width=${componentSize}>
                            <tbody>
                                ${items}
                            </tbody>
                        </table>
                    </td>
                <td width="${paddingRight}"></td>
            </tr>
            <tr>
                <td width="${paddingLeft}"></td>
                <td height="${paddingBottom}"><img src="http://welcome.hp-ww.com/img/s.gif" width=${componentSize} height="${paddingBottom}" alt="" style="display:block;"></td>
                <td width="${paddingRight}"></td>
            </tr>
        </tbody>
    </table>`;
};

export default list;
