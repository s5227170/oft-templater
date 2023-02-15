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
  const contentArray = [];
  const componentSize = columnSizes["col" + item];
  const contentDistribution = content.map((paragraph) => {
    //Add functionality for recognition of content type. For example, the compiler should recognise if some text is an h1, h2, or a p. According
    //to the type of element, set the size accordingly, and depending on properties, add bold, or similar
    //Maybe check what the "paragraph" element is and then set it up depending on that
    let wholeParagraph = "";
    for (let i = 0; i < paragraph.children.length; i++) {
      console.log(paragraph);
      console.log(paragraph.children[i]);
      if (paragraph.children[i].color && paragraph.children[i].background) {
        wholeParagraph += `<span style="color: ${paragraph.children[i].color}; background-color: ${paragraph.children[i].background}";>${paragraph.children[i].text}</span>`;
      } else if (paragraph.children[i].color) {
        wholeParagraph += `<span style="color: ${paragraph.children[i].color}";>${paragraph.children[i].text}</span>`;
      } else if (paragraph.children[i].background) {
        wholeParagraph += `<span style="background-color: ${paragraph.children[i].background}";>${paragraph.children[i].text}</span>`;
      } else {
        wholeParagraph += paragraph.children[i].text;
      }
      if (paragraph.children[i].bold) {
        wholeParagraph = `<strong>${wholeParagraph}</strong>`;
      }
    }
    if (paragraph.type == "heading-two") {
      contentArray.push(
        `<h2 style="font-family: arial;">${wholeParagraph}</h2>`
      );
    }
    if (paragraph.type == "heading-one") {
      contentArray.push(
        `<h1 style="font-family: arial;">${wholeParagraph}</h1>`
      );
    }
    if (paragraph.type == "paragraph") {
      contentArray.push(`<p style="font-family: arial;">${wholeParagraph}</p>`);
    }
  });

  let items = "";
  if (contentArray.length) {
    for (let i = 0; i < contentArray.length; i++) {
      items += contentArray[i];
    }
  }

  if (!contentArray.length) {
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"Text"}"  data-columns="${rowType}"></span>`;
  }
  console.log(componentSize);

  return `<table width=${componentSize} border="0" cellspacing="0" cellpadding="0" style="
  border-spacing: 0;
  width: ${componentSize}px;
  max-width: ${componentSize}px;
  mso-table-lspace: 0pt;
  mso-table-rspace: 0pt;
" valign="${align? align : ""}">
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
  }px; height:${paddingTop}px;">
                      </td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
          </table>`;
};

export default text;
