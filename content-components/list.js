const list = (
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  content,
  rowPosition,
  item,
  rowType
) => {
  console.log(content);
  const contentArray = [];
  const contentDistribution = content.map((list) => {
    //Add functionality for recognition of content type. For example, the compiler should recognise if some text is an h1, h2, or a p. According
    //to the type of element, set the size accordingly, and depending on properties, add bold, or similar
    //Maybe check what the "paragraph" element is and then set it up depending on that
    list.children.map((paragraph) => {
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
      contentArray.push(
        `<li style="font-family: arial;">${wholeParagraph}</li>`
      );
    });
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
  if (contentArray.length) {
    for (let i = 0; i < contentArray.length; i++) {
      items += contentArray[i];
    }
  }

  if (!contentDistribution.length) {
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"List"}"></span>`;
  }

  return `
    <table width=${componentSize}>
        <tbody>
            <tr>
                <td width="${paddingLeft}"></td>
                <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width=${componentSize} height="${paddingTop}" alt="" style="display:block;"></td>
                <td width="${paddingRight}"></td>
            </tr>
            <tr >
                <td width="${paddingLeft}"></td>
                <td >
                  <ul>
                    ${items}
                  </ul>
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
