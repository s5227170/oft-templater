const image = (
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  url,
  imgWIdth,
  imgHeight
) => {
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
                                    <img src="${url}" width="${imgWIdth}" height="${imgHeight}">
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

export default image;
