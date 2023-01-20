const text = (
  background,
  color,
  fontFamily,
  fontSize,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  content
) => {
  const contentDistribution = content.map((paragraph) => {
    console.log(paragraph);
    return `
            <tr>
                <td></td>
                <td>
                    <p style="background: ${background}; color: ${color}; font-family: ${fontFamily}; font-size: ${fontSize}px;">${paragraph}</p>
                </td>
                <td></td>
            </tr >
        `;
  });

  let items = "";
  for (let i = 0; i < contentDistribution.length; i++) {
    items = items.concat(contentDistribution[i]);
  }

  return `
    <table width="600">
        <tbody>
            <tr>
                <td width="${paddingLeft}"></td>
                <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width="600" height="${paddingTop}" alt="" style="display:block;"></td>
                <td width="${paddingRight}"></td>
            </tr>
            <tr width="600">
                <td width="${paddingLeft}"></td>
                    <td width="600">
                        <table width="600">
                            <tbody>
                                ${items}
                            </tbody>
                        </table>
                    </td>
                <td width="${paddingRight}"></td>
            </tr>
            <tr>
                <td width="${paddingLeft}"></td>
                <td height="${paddingBottom}"><img src="http://welcome.hp-ww.com/img/s.gif" width="600" height="${paddingBottom}" alt="" style="display:block;"></td>
                <td width="${paddingRight}"></td>
            </tr>
        </tbody>
    </table>
`;
};

export default text;
