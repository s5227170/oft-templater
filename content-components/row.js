//Content components are either images, lists, or text
const oneColumn = (
  columnSizes,
  position,
  background,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  contentComponentOne,
  componentOneAlignment
) => {
  // let contentAlignment = "top";
  // if (contentComponentOne.verticalAlign == "top") {
  //   contentAlignment = "top";
  // }
  // if (contentComponentOne.verticalAlign == "middle") {
  //   contentAlignment = "middle";
  // }
  // if (contentComponentOne.verticalAlign == "bottom") {
  //   contentAlignment = "bottom";
  // }
  return `
        <table id="position-${position}" data-type="main-table" bgcolor="${
    background ? background : "#fff"
  }" width="600" border="0" cellspacing="0" cellpadding="0" style="
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            margin-left: auto;
            margin-right: auto;
            width: 600px;
            max-width: 600px;
            background: ${background ? background : "#fff"};">
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingTop ? paddingTop : 0}"></td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td valign="${componentOneAlignment}">
                        ${contentComponentOne}
                    </td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingBottom ? paddingBottom : 0}"></td>
                    <td width="${paddingRight}"></td>
                </tr>
            </tbody>
        </table>
    `
}

const twoColumns = (
  columnSizes,
  position,
  background,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  contentComponentOne,
  contentComponentTwo,
  componentOneAlignment,
  componentTwoAlignment
) => {
  return `
            <table id="position-${position}" data-type="main-table" bgcolor="${
    background ? background : "#fff"
  }" width="600" border="0" cellspacing="0" cellpadding="0" style="
            border-spacing: 0;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
            margin-left: auto;
            margin-right: auto;
            width: 600px;
            max-width: 600px;
            background: ${background ? background : "#fff"};">
            <tbody>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td height="${paddingTop}"></td>
                    <td width="${paddingRight}"></td>
                </tr>
                <tr>
                    <td width="${paddingLeft}"></td>
                    <td>
                        <table style="
                        border-spacing: 0;
                        mso-table-lspace: 0pt;
                        mso-table-rspace: 0pt;
                        width: 600px;
                        max-width: 600px;
                      " border="0" cellspacing="0" cellpadding="0" width="600">
                        <tbody>
                            <tr>
                                <td width="${
                                  columnSizes.col1
                                }" valign="${componentOneAlignment}">${contentComponentOne}</td>
                                <td width="${
                                  columnSizes.col2
                                }" valign="${componentTwoAlignment}">${contentComponentTwo}</td>
                            </tr>
                          </tbody>
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
    `
}

const threeColumns = (
  columnSizes,
  position,
  background,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  contentComponentOne,
  contentComponentTwo,
  contentComponentThree,
  componentOneAlignment,
  componentTwoAlignment,
  componentThreeAlignment
) => {
  return `
    <table id="position-${position}" data-type="main-table" bgcolor="${
    background ? background : "#fff"
  }" width="600" border="0" cellspacing="0" cellpadding="0" style="
    border-spacing: 0;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    margin-left: auto;
    margin-right: auto;
    width: 600px;
    max-width: 600px;
    background: ${background ? background : "#fff"};
    ">
    <tbody>
        <tr>
            <td width="${paddingLeft}"></td>
            <td height="${paddingTop}"></td>
            <td width="${paddingRight}"></td>
        </tr>
        <tr>
            <td width="${paddingLeft}"></td>
            <td>
                <table style="
                border-spacing: 0;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                margin-left: auto;
                width: 600px;
                max-width: 600px;
                margin-right: auto;
              " border="0" cellspacing="0" cellpadding="0" width="600">
              <tbody>
                    <tr>
                        <td width="${
                          columnSizes.col1
                        }" valign="${componentOneAlignment}">${contentComponentOne}</td>
                        <td width="${
                          columnSizes.col2
                        }" valign="${componentTwoAlignment}">${contentComponentTwo}</td>
                        <td width="${
                          columnSizes.col3
                        }" valign="${componentThreeAlignment}">${contentComponentThree}</td>
                    </tr>
                </tbody>
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
    `
}

const fourColumns = (
  columnSizes,
  position,
  background,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  contentComponentOne,
  contentComponentTwo,
  contentComponentThree,
  contentComponentFour,
  componentOneAlignment,
  componentTwoAlignment,
  componentThreeAlignment,
  componentFourAlignment
) => {
  return `
    <table id="position-${position}" data-type="main-table" bgcolor="${background}" width="600" border="0" cellspacing="0" cellpadding="0" style="
    border-spacing: 0;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    margin-left: auto;
    margin-right: auto;
    width: 600px;
    max-width: 600px;
    background: ${background ? background : "#fff"};
    ">
    <tbody>
        <tr>
            <td width="${paddingLeft}"></td>
            <td height="${paddingTop}"></td>
            <td width="${paddingRight}"></td>
        </tr>
        <tr>
            <td width="${paddingLeft}"></td>
            <td>
                <table style="
                border-spacing: 0;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                margin-left: auto;
                width: 600px;
                max-width: 600px;
                margin-right: auto;
              " border="0" cellspacing="0" cellpadding="0" width="600">
              <tbody>
                    <tr>
                        <td width="${
                          columnSizes.col1
                        }" valign="${componentOneAlignment}">${contentComponentOne}</td>
                        <td width="${
                          columnSizes.col2
                        }" valign="${componentTwoAlignment}">${contentComponentTwo}</td>
                        <td width="${
                          columnSizes.col3
                        }" valign="${componentThreeAlignment}">${contentComponentThree}</td>
                        <td width="${
                          columnSizes.col4
                        }" valign="${componentFourAlignment}">${contentComponentFour}</td>
                    </tr>
                </tbody>
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
    `
}

export { oneColumn, twoColumns, threeColumns, fourColumns }
