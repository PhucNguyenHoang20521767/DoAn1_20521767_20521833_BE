const axios = require("axios");
const ErrorResponse = require("../utils/errorResponse");

// exports.sendEmail = async (to, subject, body) => {
//     const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Basic ${Buffer.from(
//             `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`
//         ).toString("base64")}`
//     };

//     const data = JSON.stringify({
//         Messages: [
//             {
//                 From: {
//                     Email: "nguyenshomefurniture@gmail.com",
//                     Name: "NGUYEN'S HOME Furniture",
//                 },
//                 To: [{ Email: to }],
//                 Subject: subject,
//                 TextPart: body
//             }
//         ]
//     });

//     try {
//         await axios.post("https://api.mailjet.com/v3.1/send", data, { headers });
//     } catch (error) {
//         console.error(error);
//         throw new ErrorResponse("Error sending email", 500);
//     }
// };

exports.sendEmail = async (to, subject, customerFirstName, otp) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
            `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`
        ).toString("base64")}`
    };

    const data = JSON.stringify({
        Messages: [
            {
                From: {
                    Email: "nguyenshomefurniture@gmail.com",
                    Name: "NGUYEN'S HOME Furniture",
                },
                To: [{ Email: to }],
                Subject: subject,
                HTMLPart: `<!doctype html>
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                
                <head>
                  <title>
                  </title>
                  <!--[if !mso]><!-->
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <!--<![endif]-->
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style type="text/css">
                    #outlook a {
                      padding: 0;
                    }
                
                    body {
                      margin: 0;
                      padding: 0;
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                    }
                
                    table,
                    td {
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                    }
                
                    img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                      -ms-interpolation-mode: bicubic;
                    }
                
                    p {
                      display: block;
                      margin: 13px 0;
                    }
                  </style>
                  <!--[if mso]>
                        <noscript>
                        <xml>
                        <o:OfficeDocumentSettings>
                          <o:AllowPNG/>
                          <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                        </xml>
                        </noscript>
                        <![endif]-->
                  <!--[if lte mso 11]>
                        <style type="text/css">
                          .mj-outlook-group-fix { width:100% !important; }
                        </style>
                        <![endif]-->
                  <style type="text/css">
                    @media only screen and (min-width:480px) {
                      .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                      }
                    }
                  </style>
                  <style media="screen and (min-width:480px)">
                    .moz-text-html .mj-column-per-100 {
                      width: 100% !important;
                      max-width: 100%;
                    }
                  </style>
                  <style type="text/css">
                    @media only screen and (max-width:480px) {
                      table.mj-full-width-mobile {
                        width: 100% !important;
                      }
                
                      td.mj-full-width-mobile {
                        width: auto !important;
                      }
                    }
                  </style>
                </head>
                
                <body style="word-spacing:normal;background-color:#F4F4F4;">
                  <div style="background-color:#F4F4F4;">
                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#A28982" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#A28982;background-color:#A28982;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#A28982;background-color:#A28982;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                          <tbody>
                                            <tr>
                                              <td style="width:400px;">
                                                <img height="auto" src="https://i.ibb.co/Z8DnWHK/image.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="400" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:0px 25px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                          <tbody>
                                            <tr>
                                              <td style="width:600px;">
                                                <img height="auto" src="https://johnlewis.scene7.com/is/image/JohnLewis/furnitureandlight-livingroom-carousel-gb-010323" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="600" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#F5F3F2" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#F5F3F2;background-color:#F5F3F2;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F3F2;background-color:#F5F3F2;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:25px;padding-bottom:5px;word-break:break-word;">
                                        <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575D;">
                                          <p style="line-height: 60px; text-align: center; margin: 10px 0;font-size:30px;color:#716864;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>XIN CHÀO, ${customerFirstName}</b></p>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:20px;word-break:break-word;">
                                        <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575D;">
                                          <p style="line-height: 30px; text-align: center; margin: 10px 0;color:#000000;font-size:22px;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>Cảm ơn bạn vì đã sử dụng thương hiệu của chúng tôi</b><br /><span style="color:#000000;font-style:italic;font-size:18px;font-family:'Times New Roman',Helvetica,Arial,sans-serif">Vui lòng sử dụng mã OTP dưới đây để hoàn tất quá trình đăng ký</span></p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#32435F" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#32435F;background-color:#32435F;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#32435F;background-color:#32435F;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;padding-bottom:40px;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" vertical-align="middle" style="font-size:0px;padding:50px 25px;padding-bottom:30px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                          <tr>
                                            <td align="center" bgcolor="#32435F" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#32435F;" valign="middle">
                                              <p style="display:inline-block;background:#32435F;color:#ffffff;font-family:Times New Roman, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;">
                                                <span style="color:#FFFFFF;font-weight:bold;font-size:30px">${otp}</span>
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </div>
                </body>
                
                </html>`
            }
        ]
    });

    try {
        await axios.post("https://api.mailjet.com/v3.1/send", data, { headers });
    } catch (error) {
        console.error(error);
        throw new ErrorResponse("Error sending email", 500);
    }
};

exports.sendEmailToResetPassword = async (to, subject, customerFirstName, otp) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
            `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`
        ).toString("base64")}`
    };

    const data = JSON.stringify({
        Messages: [
            {
                From: {
                    Email: "nguyenshomefurniture@gmail.com",
                    Name: "NGUYEN'S HOME Furniture",
                },
                To: [{ Email: to }],
                Subject: subject,
                HTMLPart: `<!doctype html>
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                
                <head>
                  <title>
                  </title>
                  <!--[if !mso]><!-->
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <!--<![endif]-->
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style type="text/css">
                    #outlook a {
                      padding: 0;
                    }
                
                    body {
                      margin: 0;
                      padding: 0;
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                    }
                
                    table,
                    td {
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                    }
                
                    img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                      -ms-interpolation-mode: bicubic;
                    }
                
                    p {
                      display: block;
                      margin: 13px 0;
                    }
                  </style>
                  <!--[if mso]>
                        <noscript>
                        <xml>
                        <o:OfficeDocumentSettings>
                          <o:AllowPNG/>
                          <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                        </xml>
                        </noscript>
                        <![endif]-->
                  <!--[if lte mso 11]>
                        <style type="text/css">
                          .mj-outlook-group-fix { width:100% !important; }
                        </style>
                        <![endif]-->
                  <style type="text/css">
                    @media only screen and (min-width:480px) {
                      .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                      }
                    }
                  </style>
                  <style media="screen and (min-width:480px)">
                    .moz-text-html .mj-column-per-100 {
                      width: 100% !important;
                      max-width: 100%;
                    }
                  </style>
                  <style type="text/css">
                    @media only screen and (max-width:480px) {
                      table.mj-full-width-mobile {
                        width: 100% !important;
                      }
                
                      td.mj-full-width-mobile {
                        width: auto !important;
                      }
                    }
                  </style>
                </head>
                
                <body style="word-spacing:normal;background-color:#F4F4F4;">
                  <div style="background-color:#F4F4F4;">
                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#A28982" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#A28982;background-color:#A28982;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#A28982;background-color:#A28982;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                          <tbody>
                                            <tr>
                                              <td style="width:400px;">
                                                <img height="auto" src="https://i.ibb.co/Z8DnWHK/image.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="400" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:0px 25px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                          <tbody>
                                            <tr>
                                              <td style="width:600px;">
                                                <img height="auto" src="https://johnlewis.scene7.com/is/image/JohnLewis/furnitureandlight-livingroom-carousel-gb-010323" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="600" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#F5F3F2" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#F5F3F2;background-color:#F5F3F2;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F3F2;background-color:#F5F3F2;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:25px;padding-bottom:5px;word-break:break-word;">
                                        <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575D;">
                                          <p style="line-height: 60px; text-align: center; margin: 10px 0;font-size:30px;color:#716864;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>XIN CHÀO, ${customerFirstName}</b></p>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:20px;word-break:break-word;">
                                        <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575D;">
                                          <p style="line-height: 30px; text-align: center; margin: 10px 0;color:#000000;font-size:22px;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>Chúng tôi đã nhận được yêu cầu reset mật khẩu</b><br /><span style="color:#000000;font-style:italic;font-size:18px;font-family:'Times New Roman',Helvetica,Arial,sans-serif">Nếu đó là bạn, vui lòng sử dụng mã OTP dưới đây để hoàn tất quá trình reset</span></p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#32435F" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#32435F;background-color:#32435F;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#32435F;background-color:#32435F;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;padding-bottom:40px;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" vertical-align="middle" style="font-size:0px;padding:50px 25px;padding-bottom:30px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                          <tr>
                                            <td align="center" bgcolor="#32435F" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#32435F;" valign="middle">
                                              <p style="display:inline-block;background:#32435F;color:#ffffff;font-family:Times New Roman, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;">
                                                <span style="color:#FFFFFF;font-weight:bold;font-size:30px">${otp}</span>
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </div>
                </body>
                
                </html>`
            }
        ]
    });

    try {
        await axios.post("https://api.mailjet.com/v3.1/send", data, { headers });
    } catch (error) {
        console.error(error);
        throw new ErrorResponse("Error sending email", 500);
    }
};

exports.sendEmailToConfirmOrder = async (to, subject, orderCode) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
            `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`
        ).toString("base64")}`
    };

    const data = JSON.stringify({
        Messages: [
            {
                From: {
                    Email: "nguyenshomefurniture@gmail.com",
                    Name: "NGUYEN'S HOME Furniture",
                },
                To: [{ Email: to }],
                Subject: subject,
                HTMLPart: `<!doctype html>
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                
                <head>
                  <title>
                  </title>
                  <!--[if !mso]><!-->
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <!--<![endif]-->
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style type="text/css">
                    #outlook a {
                      padding: 0;
                    }
                
                    body {
                      margin: 0;
                      padding: 0;
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                    }
                
                    table,
                    td {
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                    }
                
                    img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                      -ms-interpolation-mode: bicubic;
                    }
                
                    p {
                      display: block;
                      margin: 13px 0;
                    }
                  </style>
                  <!--[if mso]>
                        <noscript>
                        <xml>
                        <o:OfficeDocumentSettings>
                          <o:AllowPNG/>
                          <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                        </xml>
                        </noscript>
                        <![endif]-->
                  <!--[if lte mso 11]>
                        <style type="text/css">
                          .mj-outlook-group-fix { width:100% !important; }
                        </style>
                        <![endif]-->
                  <style type="text/css">
                    @media only screen and (min-width:480px) {
                      .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                      }
                    }
                  </style>
                  <style media="screen and (min-width:480px)">
                    .moz-text-html .mj-column-per-100 {
                      width: 100% !important;
                      max-width: 100%;
                    }
                  </style>
                  <style type="text/css">
                    @media only screen and (max-width:480px) {
                      table.mj-full-width-mobile {
                        width: 100% !important;
                      }
                
                      td.mj-full-width-mobile {
                        width: auto !important;
                      }
                    }
                  </style>
                </head>
                
                <body style="word-spacing:normal;background-color:#F4F4F4;">
                  <div style="background-color:#F4F4F4;">
                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#A28982" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#A28982;background-color:#A28982;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#A28982;background-color:#A28982;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                          <tbody>
                                            <tr>
                                              <td style="width:400px;">
                                                <img height="auto" src="https://i.ibb.co/Z8DnWHK/image.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="400" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:0px 25px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                          <tbody>
                                            <tr>
                                              <td style="width:600px;">
                                                <img height="auto" src="https://johnlewis.scene7.com/is/image/JohnLewis/furnitureandlight-livingroom-carousel-gb-010323" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="600" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#F5F3F2" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#F5F3F2;background-color:#F5F3F2;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F3F2;background-color:#F5F3F2;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:25px;padding-bottom:5px;word-break:break-word;">
                                        <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575D;">
                                          <p style="line-height: 60px; text-align: center; margin: 10px 0;font-size:30px;color:#716864;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>XIN CHÀO</b></p>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:20px;word-break:break-word;">
                                        <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575D;">
                                          <p style="line-height: 30px; text-align: center; margin: 10px 0;color:#000000;font-size:22px;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>Cảm ơn bạn vì đã lựa chọn thương hiệu của chúng tôi</b><br /><span style="color:#000000;font-style:italic;font-size:18px;font-family:'Times New Roman',Helvetica,Arial,sans-serif">Chúng tôi xin thông báo rằng đơn hàng #${orderCode} của bạn đã được xác nhận và đang trong quá trình vận chuyển</span></p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#32435F" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#32435F;background-color:#32435F;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#32435F;background-color:#32435F;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;padding-bottom:40px;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" vertical-align="middle" style="font-size:0px;padding:50px 25px;padding-bottom:30px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                          <tr>
                                            <td align="center" bgcolor="#32435F" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#32435F;" valign="middle">
                                              <p style="display:inline-block;background:#32435F;color:#ffffff;font-family:Times New Roman, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;">
                                                <span style="color:#FFFFFF;font-weight:bold;font-size:30px">NGUYEN'S HOME Furniture</span>
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </div>
                </body>
                
                </html>`
            }
        ]
    });

    try {
        await axios.post("https://api.mailjet.com/v3.1/send", data, { headers });
    } catch (error) {
        console.error(error);
        throw new ErrorResponse("Error sending email", 500);
    }
};

exports.sendEmailToCancelOrder = async (to, subject, orderCode,cancelReason) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
            `${process.env.MAILJET_API_KEY}:${process.env.MAILJET_SECRET_KEY}`
        ).toString("base64")}`
    };

    const data = JSON.stringify({
        Messages: [
            {
                From: {
                    Email: "nguyenshomefurniture@gmail.com",
                    Name: "NGUYEN'S HOME Furniture",
                },
                To: [{ Email: to }],
                Subject: subject,
                HTMLPart: `<!doctype html>
                <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                
                <head>
                  <title>
                  </title>
                  <!--[if !mso]><!-->
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <!--<![endif]-->
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1">
                  <style type="text/css">
                    #outlook a {
                      padding: 0;
                    }
                
                    body {
                      margin: 0;
                      padding: 0;
                      -webkit-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                    }
                
                    table,
                    td {
                      border-collapse: collapse;
                      mso-table-lspace: 0pt;
                      mso-table-rspace: 0pt;
                    }
                
                    img {
                      border: 0;
                      height: auto;
                      line-height: 100%;
                      outline: none;
                      text-decoration: none;
                      -ms-interpolation-mode: bicubic;
                    }
                
                    p {
                      display: block;
                      margin: 13px 0;
                    }
                  </style>
                  <!--[if mso]>
                        <noscript>
                        <xml>
                        <o:OfficeDocumentSettings>
                          <o:AllowPNG/>
                          <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                        </xml>
                        </noscript>
                        <![endif]-->
                  <!--[if lte mso 11]>
                        <style type="text/css">
                          .mj-outlook-group-fix { width:100% !important; }
                        </style>
                        <![endif]-->
                  <style type="text/css">
                    @media only screen and (min-width:480px) {
                      .mj-column-per-100 {
                        width: 100% !important;
                        max-width: 100%;
                      }
                    }
                  </style>
                  <style media="screen and (min-width:480px)">
                    .moz-text-html .mj-column-per-100 {
                      width: 100% !important;
                      max-width: 100%;
                    }
                  </style>
                  <style type="text/css">
                    @media only screen and (max-width:480px) {
                      table.mj-full-width-mobile {
                        width: 100% !important;
                      }
                
                      td.mj-full-width-mobile {
                        width: auto !important;
                      }
                    }
                  </style>
                </head>
                
                <body style="word-spacing:normal;background-color:#F4F4F4;">
                  <div style="background-color:#F4F4F4;">
                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#A28982" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#A28982;background-color:#A28982;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#A28982;background-color:#A28982;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                          <tbody>
                                            <tr>
                                              <td style="width:400px;">
                                                <img height="auto" src="https://i.ibb.co/Z8DnWHK/image.png" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="400" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#000000" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#000000;background-color:#000000;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#000000;background-color:#000000;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" style="font-size:0px;padding:0px 25px;padding-right:0px;padding-bottom:0px;padding-left:0px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                          <tbody>
                                            <tr>
                                              <td style="width:600px;">
                                                <img height="auto" src="https://johnlewis.scene7.com/is/image/JohnLewis/furnitureandlight-livingroom-carousel-gb-010323" style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" title="" width="600" />
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#F5F3F2" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#F5F3F2;background-color:#F5F3F2;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#F5F3F2;background-color:#F5F3F2;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:25px;padding-bottom:5px;word-break:break-word;">
                                        <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575D;">
                                          <p style="line-height: 60px; text-align: center; margin: 10px 0;font-size:30px;color:#716864;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>XIN CHÀO</b></p>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;padding-bottom:20px;word-break:break-word;">
                                        <div style="font-family:Arial, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#55575D;">
                                          <p style="line-height: 30px; text-align: center; margin: 10px 0;color:#000000;font-size:22px;font-family:'Times New Roman',Helvetica,Arial,sans-serif"><b>Cảm ơn bạn vì đã lựa chọn thương hiệu của chúng tôi</b><br /><span style="color:#000000;font-style:italic;font-size:18px;font-family:'Times New Roman',Helvetica,Arial,sans-serif">Rất xin lỗi khi phải thông báo rằng đơn hàng #${orderCode} của bạn đã bị hủy với lý do: ${cancelReason}.</span></p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" bgcolor="#32435F" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#32435F;background-color:#32435F;margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#32435F;background-color:#32435F;width:100%;">
                        <tbody>
                          <tr>
                            <td style="direction:ltr;font-size:0px;padding:0 0 0 0;padding-bottom:40px;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="center" vertical-align="middle" style="font-size:0px;padding:50px 25px;padding-bottom:30px;word-break:break-word;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                          <tr>
                                            <td align="center" bgcolor="#32435F" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#32435F;" valign="middle">
                                              <p style="display:inline-block;background:#32435F;color:#ffffff;font-family:Times New Roman, Helvetica, Arial, sans-serif;font-size:18px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;">
                                                <span style="color:#FFFFFF;font-weight:bold;font-size:30px">NGUYEN'S HOME Furniture</span>
                                              </p>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]-->
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]-->
                  </div>
                </body>
                
                </html>`
            }
        ]
    });

    try {
        await axios.post("https://api.mailjet.com/v3.1/send", data, { headers });
    } catch (error) {
        console.error(error);
        throw new ErrorResponse("Error sending email", 500);
    }
};