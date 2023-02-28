const list = (
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
  const contentDistribution = content.map((list) => {
    //Add functionality for recognition of content type. For example, the compiler should recognise if some text is an h1, h2, or a p. According
    //to the type of element, set the size accordingly, and depending on properties, add bold, or similar
    //Maybe check what the "paragraph" element is and then set it up depending on that
    list.children.map((paragraph) => {
      console.log(paragraph);
      let wholeParagraph = "";
      if (paragraph.children) {
        for (let i = 0; i < paragraph.children.length; i++) {
          let textContent = paragraph.children[i].text;
          textContent = textContent.replace("<", "&#60;");
          if (paragraph.children[i].hyperlink) {
            textContent = `<a style="text-decoration: none;" href="${paragraph.children[i].hyperlink}">${textContent}</a>`;
          }
          if (paragraph.children[i].underline) {
            textContent = `<u>${textContent}</u>`;
          }
          if (paragraph.children[i].bold) {
            textContent = `<strong>${textContent}</strong>`;
          }
          if (paragraph.children[i].small) {
            textContent = `<span style="font-size: 11px;">${textContent}</span>`;
          }
          if (paragraph.children[i].color && paragraph.children[i].background) {
            wholeParagraph += `<span style="text-decoration: none; color: ${paragraph.children[i].color}; background-color: ${paragraph.children[i].background}";>${textContent}</span>`;
          } else if (paragraph.children[i].color) {
            wholeParagraph += `<span style="text-decoration: none; color: ${paragraph.children[i].color}";>${textContent}</span>`;
          } else if (paragraph.children[i].background) {
            wholeParagraph += `<span style="text-decoration: none; background-color: ${paragraph.children[i].background}";>${textContent}</span>`;
          } else {
            wholeParagraph += textContent;
          }
        }
      } else {
        wholeParagraph = wholeParagraph.replace("<", "&#60;");
        if (paragraph.children[i].hyperlink) {
          wholeParagraph = `<a href="${paragraph.children[i].hyperlink}">${paragraph.text}</a>`;
        }
        if (paragraph.children[i].underline) {
          wholeParagraph = `<u>${paragraph.text}</u>`;
        }
        if (paragraph.children[i].bold) {
          wholeParagraph = `<strong>${paragraph.text}</strong>`;
        }
        if (paragraph.children[i].small) {
          wholeParagraph = `<span style="font-size: 11px;">${paragraph.text}</span>`;
        }
        if (paragraph.color && paragraph.background) {
          wholeParagraph += `<span style="color: ${paragraph.color}; background-color: ${paragraph.background}";>${paragraph.text}</span>`;
        } else if (paragraph.color) {
          wholeParagraph += `<span style="color: ${paragraph.color}">${paragraph.text}</span>`;
        } else if (paragraph.background) {
          wholeParagraph += `<span style="background-color: ${paragraph.background}">${paragraph.text}</span>`;
        } else {
          wholeParagraph += paragraph.text;
        }
      }
      contentArray.push(
        `<li style="font-family: arial; margin: 0px;">${wholeParagraph}</li>`
      );
    });
  });

  let items = "";
  if (contentArray.length) {
    for (let i = 0; i < contentArray.length; i++) {
      items += contentArray[i];
    }
  }

  if (!contentDistribution.length) {
    items += `<span id="componentContentManager" name="row${rowPosition}#item${item}" role="${"List"}"  data-columns="${rowType}" data-padding-left="${paddingLeft}" data-padding-right="${paddingRight}" data-padding-top="${paddingTop}" data-padding-bottom="${paddingBottom}" data-column-sizes="${componentSize}"></span>`;
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
                      <ul>
                      ${items}
                      </ul>
                    </td>
                    <td></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingBottom}" width="1"></td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
          </table>`;
};

export default list;
