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
                    <p style="background: ${background}; color: ${color}; font-family: ${fontFamily}; font-size: ${fontSize};">${paragraph}</p>
                </td>
                <td></td>
            </tr >
        `;
  });
  console.log(contentDistribution);

  return `
    <table>
        <tbody>
            <tr>
                <td width="${paddingLeft}"></td>
                <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width="600" height="${paddingTop}" alt="" style="display:block;"></td>
                <td width="${paddingRight}"></td>
            </tr>
            <tr>
                <td width="${paddingLeft}"></td>
                    <td>
                        <table>
                            ${contentDistribution}
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
