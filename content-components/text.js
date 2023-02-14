const text = (
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  content,
  rowPosition,
  item,
  rowType,
  columnSizes
) => {
  const contentArray = [];
  const contentDistribution = content.map((paragraph) => {
    //Add functionality for recognition of content type. For example, the compiler should recognise if some text is an h1, h2, or a p. According
    //to the type of element, set the size accordingly, and depending on properties, add bold, or similar
    //Maybe check what the "paragraph" element is and then set it up depending on that
    let wholeParagraph = "";
    for (let i = 0; i < paragraph.children.length; i++) {
      if (paragraph.children[i].color && paragraph.children[i].background) {
        wholeParagraph += `<span style="color: ${paragraph.children[i].color}; background-color: ${paragraph.children[i].background}";>${paragraph.children[i].text}</span>`;
      } else if (paragraph.children[i].color) {
        wholeParagraph += `<span style="color: ${paragraph.children[i].color}";>${paragraph.children[i].text}</span>`;
      } else if (paragraph.children[i].background) {
        wholeParagraph += `<span style="background-color: ${paragraph.children[i].background}";>${paragraph.children[i].text}</span>`;
      } else {
        wholeParagraph += paragraph.children[i].text;
      }
    }
    contentArray.push(`<p style="font-family: arial;">${wholeParagraph}</p>`);
  });

  const componentSize = columnSizes["col" + item]

  let items = "";
  if (contentArray.length) {
    for (let i = 0; i < contentArray.length; i++) {
      items += contentArray[i];
    }
  }

  if (!contentArray.length) {
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Text"}"  data-columns="${rowType}"></span>`;
  }

  return `<table width=${componentSize}>
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                      <td>
                        <img src="http://welcome.hp-ww.com/img/s.gif" width="${
                          componentSize - paddingLeft - paddingRight
                        }" height="${paddingTop}" alt="" style="display:block; width: ${
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
                      <td>
                        <img src="http://welcome.hp-ww.com/img/s.gif" width="${
                          componentSize - paddingLeft - paddingRight
                        }" height="${paddingBottom}" alt="" style="display:block; width: ${
    600 - paddingLeft - paddingRight
  }px; height:${paddingTop}px;">
                      </td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
          </table>`;
};

export default text;
