//Content components are either images, lists, or text
const oneColumn = (
  position,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  contentComponentOne
) => {
  let contentAlignment = ";";
  if (contentComponentOne.verticalAlign == "top") {
    contentAlignment = "top";
  }
  if (contentComponentOne.verticalAlign == "middle") {
    contentAlignment = "middle";
  }
  if (contentComponentOne.verticalAlign == "bottom") {
    contentAlignment = "bottom";
  }
  return `
        <table id="position-${position}" border="0" cellspacing="0" cellpadding="0" style="
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 600px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            background: #fff;
            " align="center">
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${
    600 - paddingLeft - paddingRight
  }" height="${paddingTop}" alt="" style="display:block; width: ${
    600 - paddingLeft - paddingRight
  }px; height:${paddingTop}px;"></td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingLeft}" alt="" style="display:block; width: ${paddingLeft}px;"></td>
                    <td valign="${contentAlignment}">
                        ${contentComponentOne}
                    </td>
                    <td width="${paddingRight}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingRight}" alt="" style="display:block; width: ${paddingRight}px;"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingBottom}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${
    600 - paddingLeft - paddingRight
  }" height="${paddingBottom}" alt="" style="display:block; width: ${
    600 - paddingLeft - paddingRight
  }px; height:${paddingTop}px;"></td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
        </table>
    `;
};

const twoColumns = (
  position,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  contentComponentOne,
  contentComponentTwo
) => {
  let contentAlignment = [];
  if (contentComponentOne.verticalAlign == "top") {
    contentAlignment[0] = "top";
  }
  if (contentComponentOne.verticalAlign == "middle") {
    contentAlignment[0] = "middle";
  }
  if (contentComponentOne.verticalAlign == "bottom") {
    contentAlignment[0] = "bottom";
  }
  if (contentComponentTwo.verticalAlign == "top") {
    contentAlignment[1] = "top";
  }
  if (contentComponentTwo.verticalAlign == "middle") {
    contentAlignment[1] = "middle";
  }
  if (contentComponentTwo.verticalAlign == "bottom") {
    contentAlignment[1] = "bottom";
  }
  return `
            <table id="position-${position}" border="0" cellspacing="0" cellpadding="0" style="
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            width: 600px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            background: #fff;
            " align="center">
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingTop}"></td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td>
                        <table>
                            <tr>
                                <td width="300" valign="${contentAlignment[0]}">${contentComponentOne}</td>
                                <td width="300" valign="${contentAlignment[1]}">${contentComponentTwo}</td>
                            </tr>
                        </table>
                    </td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingBottom}"></td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
        </table>
    `;
};

const threeColumns = (
  position,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  contentComponentOne,
  contentComponentTwo,
  contentComponentThree
) => {
  let contentAlignment = [];
  if (contentComponentOne.verticalAlign == "top") {
    contentAlignment[0] = "top";
  }
  if (contentComponentOne.verticalAlign == "middle") {
    contentAlignment[0] = "middle";
  }
  if (contentComponentOne.verticalAlign == "bottom") {
    contentAlignment[0] = "bottom";
  }
  if (contentComponentTwo.verticalAlign == "top") {
    contentAlignment[1] = "top";
  }
  if (contentComponentTwo.verticalAlign == "middle") {
    contentAlignment[1] = "middle";
  }
  if (contentComponentTwo.verticalAlign == "bottom") {
    contentAlignment[1] = "bottom";
  }
  if (contentComponentTwo.verticalAlign == "top") {
    contentAlignment[2] = "top";
  }
  if (contentComponentTwo.verticalAlign == "middle") {
    contentAlignment[2] = "middle";
  }
  if (contentComponentTwo.verticalAlign == "bottom") {
    contentAlignment[2] = "bottom";
  }
  return `
    <table id="position-${position}" border="0" cellspacing="0" cellpadding="0" style="
    border-spacing: 0;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    width: 600px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
    " align="center">
    <tbody>
        <tr>
            <td width="${paddingLeft}"></td>
            <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${
    600 - paddingLeft - paddingRight
  }" height="${paddingTop}" alt="" style="display:block; width: ${
    600 - paddingLeft - paddingRight
  }px; height:${paddingTop}px;"></td>
            <td width="${paddingRight}"></td>
        </tr>
        <tr>
            <td width="${paddingLeft}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingLeft}" alt="" style="display:block; width: ${paddingLeft}px;"></td>
            <td>
                <table>
                    <tr>
                        <td width="200" valign="${contentAlignment[0]}">${contentComponentOne}</td>
                        <td width="200" valign="${contentAlignment[1]}">${contentComponentTwo}</td>
                        <td width="200" valign="${contentAlignment[2]}">${contentComponentThree}</td>
                    </tr>
                </table>
            </td>
            <td width="${paddingRight}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingRight}" alt="" style="display:block; width: ${paddingRight}px;"></td>
        </tr>
        <tr>
            <td width="${paddingLeft}"></td>
            <td height="${paddingBottom}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${
    600 - paddingLeft - paddingRight
  }" height="${paddingBottom}" alt="" style="display:block; width: ${
    600 - paddingLeft - paddingRight
  }px; height:${paddingTop}px;"></td>
            <td width="${paddingRight}"></td>
        </tr>
    </tbody>
</table>
    `;
};

export { oneColumn, twoColumns, threeColumns };

//         <table id="position-${position}" border="0" cellspacing="0" cellpadding="0" style="
//     border-spacing: 0;
//     mso-table-lspace: 0pt;
//     mso-table-rspace: 0pt;
//     width: 600px;
//     max-width: 600px;
//     margin-left: auto;
//     margin-right: auto;
//     background: #fff;
//     " align="center">
//     <tbody>
//         <tr>
//             <td width="${paddingLeft}"></td>
//             <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${600 - paddingLeft - paddingRight}" height="${paddingTop}" alt="" style="display:block; width: ${600 - paddingLeft - paddingRight}px; height:${paddingTop}px;"></td>
//             <td width="${paddingRight}"></td>
//         </tr>
//         <tr>
//             <td width="${paddingLeft}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingLeft}" alt="" style="display:block; width: ${paddingLeft}px;"></td>
//             <td>
//                 <table>
//                     <tr>
//                         <td width="200">${contentComponentOne}</td>
//                         <td width="200">${contentComponentTwo}</td>
//                         <td width="200">${contentComponentThree}</td>
//                     </tr>
//                 </table>
//             </td>
//             <td width="${paddingRight}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingRight}" alt="" style="display:block; width: ${paddingRight}px;"></td>
//         </tr>
//         <tr>
//             <td width="${paddingLeft}"></td>
//             <td height="${paddingBottom}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${600 - paddingLeft - paddingRight}" height="${paddingBottom}" alt="" style="display:block; width: ${600 - paddingLeft - paddingRight}px; height:${paddingTop}px;"></td>
//             <td width="${paddingRight}"></td>
//         </tr>
//     </tbody>
// </table>
