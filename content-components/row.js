//Content components are either images, lists, or text
const oneColumn = (
    position,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    contentComponentOne
) => {
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
                    <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${600 - paddingLeft - paddingRight}" height="${paddingTop}" alt="" style="display:block; width: ${600 - paddingLeft - paddingRight}px; height:${paddingTop}px;"></td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingLeft}" alt="" style="display:block; width: ${paddingLeft}px;"></td>
                    <td>
                        ${contentComponentOne}
                    </td>
                    <td width="${paddingRight}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingRight}" alt="" style="display:block; width: ${paddingRight}px;"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingBottom}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${600 - paddingLeft - paddingRight}" height="${paddingBottom}" alt="" style="display:block; width: ${600 - paddingLeft - paddingRight}px; height:${paddingTop}px;"></td>
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
                                <td width="300">${contentComponentOne}</td>
                                <td width="300">${contentComponentTwo}</td>
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
            <td height="${paddingTop}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${600 - paddingLeft - paddingRight}" height="${paddingTop}" alt="" style="display:block; width: ${600 - paddingLeft - paddingRight}px; height:${paddingTop}px;"></td>
            <td width="${paddingRight}"></td>
        </tr>
        <tr>
            <td width="${paddingLeft}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingLeft}" alt="" style="display:block; width: ${paddingLeft}px;"></td>
            <td>
                <table>
                    <tr>
                        <td width="200">${contentComponentOne}</td>
                        <td width="200">${contentComponentTwo}</td>
                        <td width="200">${contentComponentThree}</td>
                    </tr>
                </table>
            </td>
            <td width="${paddingRight}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${paddingRight}" alt="" style="display:block; width: ${paddingRight}px;"></td>
        </tr>
        <tr>
            <td width="${paddingLeft}"></td>
            <td height="${paddingBottom}"><img src="http://welcome.hp-ww.com/img/s.gif" width="${600 - paddingLeft - paddingRight}" height="${paddingBottom}" alt="" style="display:block; width: ${600 - paddingLeft - paddingRight}px; height:${paddingTop}px;"></td>
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