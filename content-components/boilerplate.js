const boilerplate = (bodyContent, title) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <style type="text/css"></style>
  </head>
  <body style="
        margin: 0;
        padding: 0;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        background: #fff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
      " leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
    <table width="600" border="0" cellspacing="0" cellpadding="0" style="
          border-spacing: 0;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 600px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        " align="center">
      <tbody>
        <tr>
          <td>
            ${bodyContent}
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`

export default boilerplate;