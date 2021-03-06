var express = require('express');
var app = express();
var nodemailer = require('nodemailer');


app.post('/', (req, res)=>{
    const email = req.body.email;
    let asunto;
    let texto;
    if (req.body.tipo === 'Nuevo Pedido'){
        asunto = 'Nuevo pedido en QualitySoft';
        texto = 'Su pedido ha sido correctamente realizado, en breve recibirá otro correo electrónico con la confirmación de envío de los productos.'
    } else if (req.body.tipo === 'Pedido Enviado'){
        asunto = 'Su pedido ha sido enviado';
        texto = 'Su pedido ha sido enviado, en los próximos días recibirá en su domicilio los productos.'
    } else if (req.body.tipo === 'Pedido Entregado'){
        asunto = 'Su pedido ha sido entregado';
        texto = 'Su pedido ha sido entregado, gracias por su confianza.'
    } else if (req.body.tipo === 'Nuevo Cliente'){
      asunto = 'Bienvenido a nuestra tienda';
      texto = 'Bienvenido a nuestra tienda, gracias por su confianza, desde este momento estamos a su entera disposición.'
    } else if (req.body.tipo === 'Cliente Pendiente'){
      asunto = 'Bienvenido a nuestra tienda';
      texto = 'Bienvenido a nuestra tienda, gracias por su confianza, en breve recibirá otro correo electrónico con la confirmación y podra acceder con su nombre de usuario y contraseña.'
    } else if (req.body.tipo === 'Aviso Valido'){
      asunto = 'Su cuenta ha sido activada';
      texto = 'Su cuenta ha sido activada, ya puede acceder con su nombre de usuario y contraseña.'
    }
    const output = `
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Nuevo pedido</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"> 
      <script src="https://use.fontawesome.com/285c0f2452.js"></script>
      <style>
        /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%; }
  
        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0; 
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%; }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top; }
  
        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
  
        .body {
          background-color: #f6f6f6;
          width: 100%; }
  
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          Margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px; }
  
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          Margin: 0 auto;
          max-width: 580px;
          padding: 10px; }
  
        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #fff;
          border-radius: 0px;
          width: 100%; }
  
        .wrapper {
          box-sizing: border-box;
          padding: 20px; }
  
        .footer {
          clear: both;
          padding-top: 10px;
          text-align: center;
          width: 100%; }
          .footer td,
          .footer p,
          .footer span,
          .footer a {
            color: #999999;
            font-size: 12px;
            text-align: center; }
  
        /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
        h1,
        h2,
        h3,
        h4 {
          color: #000000;
          font-family: sans-serif;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          Margin-bottom: 30px; }
  
        h1 {
          font-size: 35px;
          font-weight: 300;
          text-align: center;
          text-transform: capitalize; }
  
        p,
        ul,
        ol {
          font-family: sans-serif;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
          Margin-bottom: 15px; }
          p li,
          ul li,
          ol li {
            list-style-position: inside;
            margin-left: 5px; }
  
        a {
          color: #3498db;
          text-decoration: underline; }
  
        /* -------------------------------------
            BUTTONS
        ------------------------------------- */
        .btn {
          box-sizing: border-box;
          width: 100%; }
          .btn > tbody > tr > td {
            padding-bottom: 15px; }
          .btn table {
            width: auto; }
          .btn table td {
            background-color: #ffffff;
            border-radius: 0px;
            text-align: center; }
          .btn a {
            background-color: #ffffff;
            border: solid 1px #3498db;
            border-radius: 0px;
            box-sizing: border-box;
            color: #3498db;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            padding: 12px 25px;
            text-decoration: none;
            text-transform: capitalize; }
  
        .btn-primary table td {
          background-color: #00448D; }
  
        .btn-primary a {
          background-color: #00448D;
          border-color: #00448D;
          color: #ffffff; }
  
        /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
        .last {
          margin-bottom: 0; }
  
        .first {
          margin-top: 0; }
  
        .align-center {
          text-align: center; }
  
        .align-right {
          text-align: right; }
  
        .align-left {
          text-align: left; }
  
        .clear {
          clear: both; }
  
        .mt0 {
          margin-top: 0; }
  
        .mb0 {
          margin-bottom: 0; }
  
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0; }
  
        .powered-by a {
          text-decoration: none; }
  
        hr {
          border: 0;
          border-bottom: 1px solid #f6f6f6;
          Margin: 20px 0; }
  
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important; }
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important; }
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important; }
          table[class=body] .content {
            padding: 0 !important; }
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important; }
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important; }
          table[class=body] .btn table {
            width: 100% !important; }
          table[class=body] .btn a {
            width: 100% !important; }
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important; }}
  
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%; }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%; }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important; } 
          .btn-primary table td:hover {
            background-color: #34495e !important; }
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important; } }
  
      </style>
    </head>
    <body class="">
      <table border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
  
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader"></span>
              <table class="main">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <div style="text-align: center;">
                            <img src="https://s3-us-west-2.amazonaws.com/coreandroid4/LogotipoBarra.png" alt="Logo">
                          </div>
                          <hr>
                            <h3 style="color: green; text-align: center;"><i class="fa fa-check-square"></i> ${asunto}</h3>
                          <hr>
                          <h3>Estimado Cliente,</h3>
  
                          <br>
                          <h3>${texto}</h3>
                          <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="left">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <div style="text-align: center;">
                                        <tr>
                                          <td> <a href="http://www.qualitysoft.es" target="_blank">Acceder</a> </td>
                                        </tr>
                                      </div>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <h3>Muchas gracias.</h3>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
                <!-- END MAIN CONTENT AREA -->
                </table>
  
              <!-- START FOOTER -->
              <div class="footer">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">Quality Soft by First Book, S.L.</span>
                      
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by">
                      En cumplimiento de la normativa vigente en materia de Servicios de la Sociedad de la Información y de Comercio Electrónico y de Protección de Datos de Carácter Personal, le comunicamos que sus datos de carácter personal forman parte de una base de datos gestionada bajo nuestra responsabilidad con la finalidad de mantener las relaciones comerciales y/o contractuales e informarle de novedades y ofertas relacionadas con nuestra actividad, sea por su condición de cliente o porque nos haya solicitado informacion comercial en algún momento.
  Es nuestra voluntad evitar el envío deliberado de correo no solicitado, por lo cual podrá en todo momento ejercitar sus derechos de acceso, rectificación, cancelación y oposición de sus datos de carácter personal ante First Book, S.L. email info@firstbook.es
   
  Este mensaje se dirige exclusivamente a su destinatario y puede contener información privilegiada o confidencial. Si usted no es el destinatario señalado, le informamos que cualquier divulgación o uso de los contenidos esta prohibida por ley. Si usted ha recibido este mensaje por error, por favor borre su contenido y comuníquenoslo en la dirección del remitente a la mayor brevedad posible
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
              
            <!-- END CENTERED WHITE CONTAINER -->
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.serviciodecorreo.es',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'info@firstbook.es', // generated ethereal user
          pass: 'Nohay2sin3'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Quality Soft" <info@firstbook.es>', // sender address
        // to: `${email}, 'testing@firstbook.es'`,  list of receivers
        subject: asunto, // Subject line
        text: 'No puede leer este correo?', // plain text body
        html: output // html body
    };

    mailOptions.to = [email];
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
});

app.post('/admin', (req, res)=>{
    let asunto;
    let texto;


    asunto = 'Nuevo pedido en tienda online';
    texto = 'Hemos recibido un nuevo pedido, pulsa para acceder y tramitarlo'
    


    const output = `
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Nuevo pedido</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"> 
      <script src="https://use.fontawesome.com/285c0f2452.js"></script>
      <style>
        /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%; }
  
        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0; 
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%; }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top; }
  
        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
  
        .body {
          background-color: #f6f6f6;
          width: 100%; }
  
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          Margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px; }
  
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          Margin: 0 auto;
          max-width: 580px;
          padding: 10px; }
  
        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #fff;
          border-radius: 0px;
          width: 100%; }
  
        .wrapper {
          box-sizing: border-box;
          padding: 20px; }
  
        .footer {
          clear: both;
          padding-top: 10px;
          text-align: center;
          width: 100%; }
          .footer td,
          .footer p,
          .footer span,
          .footer a {
            color: #999999;
            font-size: 12px;
            text-align: center; }
  
        /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
        h1,
        h2,
        h3,
        h4 {
          color: #000000;
          font-family: sans-serif;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          Margin-bottom: 30px; }
  
        h1 {
          font-size: 35px;
          font-weight: 300;
          text-align: center;
          text-transform: capitalize; }
  
        p,
        ul,
        ol {
          font-family: sans-serif;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
          Margin-bottom: 15px; }
          p li,
          ul li,
          ol li {
            list-style-position: inside;
            margin-left: 5px; }
  
        a {
          color: #3498db;
          text-decoration: underline; }
  
        /* -------------------------------------
            BUTTONS
        ------------------------------------- */
        .btn {
          box-sizing: border-box;
          width: 100%; }
          .btn > tbody > tr > td {
            padding-bottom: 15px; }
          .btn table {
            width: auto; }
          .btn table td {
            background-color: #ffffff;
            border-radius: 0px;
            text-align: center; }
          .btn a {
            background-color: #ffffff;
            border: solid 1px #3498db;
            border-radius: 0px;
            box-sizing: border-box;
            color: #3498db;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            padding: 12px 25px;
            text-decoration: none;
            text-transform: capitalize; }
  
        .btn-primary table td {
          background-color: #00448D; }
  
        .btn-primary a {
          background-color: #00448D;
          border-color: #00448D;
          color: #ffffff; }
  
        /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
        .last {
          margin-bottom: 0; }
  
        .first {
          margin-top: 0; }
  
        .align-center {
          text-align: center; }
  
        .align-right {
          text-align: right; }
  
        .align-left {
          text-align: left; }
  
        .clear {
          clear: both; }
  
        .mt0 {
          margin-top: 0; }
  
        .mb0 {
          margin-bottom: 0; }
  
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0; }
  
        .powered-by a {
          text-decoration: none; }
  
        hr {
          border: 0;
          border-bottom: 1px solid #f6f6f6;
          Margin: 20px 0; }
  
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important; }
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important; }
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important; }
          table[class=body] .content {
            padding: 0 !important; }
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important; }
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important; }
          table[class=body] .btn table {
            width: 100% !important; }
          table[class=body] .btn a {
            width: 100% !important; }
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important; }}
  
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%; }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%; }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important; } 
          .btn-primary table td:hover {
            background-color: #34495e !important; }
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important; } }
  
      </style>
    </head>
    <body class="">
      <table border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
  
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader"></span>
              <table class="main">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <div style="text-align: center;">
                            <img src="https://s3-us-west-2.amazonaws.com/coreandroid4/LogotipoBarra.png" alt="Logo">
                          </div>
                          <hr>
                            <h3 style="color: green; text-align: center;"><i class="fa fa-check-square"></i> ${asunto}</h3>
                          <hr>
                          <h3>Aviso</h3>
  
                          <br>
                          <h3>${texto}</h3>
                          <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="left">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <div style="text-align: center;">
                                        <tr>
                                          <td> <a href="http://www.qualitysoft.es" target="_blank">Acceder</a> </td>
                                        </tr>
                                      </div>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
                <!-- END MAIN CONTENT AREA -->
                </table>
  
              <!-- START FOOTER -->
              <div class="footer">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">Quality Soft by First Book, S.L.</span>
                      
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by">
                      En cumplimiento de la normativa vigente en materia de Servicios de la Sociedad de la Información y de Comercio Electrónico y de Protección de Datos de Carácter Personal, le comunicamos que sus datos de carácter personal forman parte de una base de datos gestionada bajo nuestra responsabilidad con la finalidad de mantener las relaciones comerciales y/o contractuales e informarle de novedades y ofertas relacionadas con nuestra actividad, sea por su condición de cliente o porque nos haya solicitado informacion comercial en algún momento.
  Es nuestra voluntad evitar el envío deliberado de correo no solicitado, por lo cual podrá en todo momento ejercitar sus derechos de acceso, rectificación, cancelación y oposición de sus datos de carácter personal ante First Book, S.L. email info@firstbook.es
   
  Este mensaje se dirige exclusivamente a su destinatario y puede contener información privilegiada o confidencial. Si usted no es el destinatario señalado, le informamos que cualquier divulgación o uso de los contenidos esta prohibida por ley. Si usted ha recibido este mensaje por error, por favor borre su contenido y comuníquenoslo en la dirección del remitente a la mayor brevedad posible
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
              
            <!-- END CENTERED WHITE CONTAINER -->
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.serviciodecorreo.es',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'info@firstbook.es', // generated ethereal user
          pass: 'Nohay2sin3'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Quality Soft" <info@firstbook.es>', // sender address
        // to: `${email}, 'testing@firstbook.es'`,  list of receivers
        subject: asunto, // Subject line
        text: 'No puede leer este correo?', // plain text body
        html: output // html body
    };

    mailOptions.to = ['testing@firstbook.es'];
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
});

app.post('/autenticacion', (req, res)=>{
    let asunto;
    let texto;
    let tipo;
    let usuario = req.body.usuario;
    let fecha = req.body.fecha;

  if (req.body.tipo === 'login'){
    asunto = `Nuevo login de ${usuario}`;
    texto = `Login con fecha ${fecha} de ${usuario}`;
  } else if (req.body.tipo === 'registro'){
    asunto = `Nuevo registro de ${usuario}`;
    texto = `Registro con fecha ${fecha} de ${usuario}`;
  }
    


    const output = `
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Nuevo pedido</title>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"> 
      <script src="https://use.fontawesome.com/285c0f2452.js"></script>
      <style>
        /* -------------------------------------
            GLOBAL RESETS
        ------------------------------------- */
        img {
          border: none;
          -ms-interpolation-mode: bicubic;
          max-width: 100%; }
  
        body {
          background-color: #f6f6f6;
          font-family: sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 14px;
          line-height: 1.4;
          margin: 0;
          padding: 0; 
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%; }
  
        table {
          border-collapse: separate;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          width: 100%; }
          table td {
            font-family: sans-serif;
            font-size: 14px;
            vertical-align: top; }
  
        /* -------------------------------------
            BODY & CONTAINER
        ------------------------------------- */
  
        .body {
          background-color: #f6f6f6;
          width: 100%; }
  
        /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
        .container {
          display: block;
          Margin: 0 auto !important;
          /* makes it centered */
          max-width: 580px;
          padding: 10px;
          width: 580px; }
  
        /* This should also be a block element, so that it will fill 100% of the .container */
        .content {
          box-sizing: border-box;
          display: block;
          Margin: 0 auto;
          max-width: 580px;
          padding: 10px; }
  
        /* -------------------------------------
            HEADER, FOOTER, MAIN
        ------------------------------------- */
        .main {
          background: #fff;
          border-radius: 0px;
          width: 100%; }
  
        .wrapper {
          box-sizing: border-box;
          padding: 20px; }
  
        .footer {
          clear: both;
          padding-top: 10px;
          text-align: center;
          width: 100%; }
          .footer td,
          .footer p,
          .footer span,
          .footer a {
            color: #999999;
            font-size: 12px;
            text-align: center; }
  
        /* -------------------------------------
            TYPOGRAPHY
        ------------------------------------- */
        h1,
        h2,
        h3,
        h4 {
          color: #000000;
          font-family: sans-serif;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          Margin-bottom: 30px; }
  
        h1 {
          font-size: 35px;
          font-weight: 300;
          text-align: center;
          text-transform: capitalize; }
  
        p,
        ul,
        ol {
          font-family: sans-serif;
          font-size: 14px;
          font-weight: normal;
          margin: 0;
          Margin-bottom: 15px; }
          p li,
          ul li,
          ol li {
            list-style-position: inside;
            margin-left: 5px; }
  
        a {
          color: #3498db;
          text-decoration: underline; }
  
        /* -------------------------------------
            BUTTONS
        ------------------------------------- */
        .btn {
          box-sizing: border-box;
          width: 100%; }
          .btn > tbody > tr > td {
            padding-bottom: 15px; }
          .btn table {
            width: auto; }
          .btn table td {
            background-color: #ffffff;
            border-radius: 0px;
            text-align: center; }
          .btn a {
            background-color: #ffffff;
            border: solid 1px #3498db;
            border-radius: 0px;
            box-sizing: border-box;
            color: #3498db;
            cursor: pointer;
            display: inline-block;
            font-size: 14px;
            font-weight: bold;
            margin: 0;
            padding: 12px 25px;
            text-decoration: none;
            text-transform: capitalize; }
  
        .btn-primary table td {
          background-color: #00448D; }
  
        .btn-primary a {
          background-color: #00448D;
          border-color: #00448D;
          color: #ffffff; }
  
        /* -------------------------------------
            OTHER STYLES THAT MIGHT BE USEFUL
        ------------------------------------- */
        .last {
          margin-bottom: 0; }
  
        .first {
          margin-top: 0; }
  
        .align-center {
          text-align: center; }
  
        .align-right {
          text-align: right; }
  
        .align-left {
          text-align: left; }
  
        .clear {
          clear: both; }
  
        .mt0 {
          margin-top: 0; }
  
        .mb0 {
          margin-bottom: 0; }
  
        .preheader {
          color: transparent;
          display: none;
          height: 0;
          max-height: 0;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          mso-hide: all;
          visibility: hidden;
          width: 0; }
  
        .powered-by a {
          text-decoration: none; }
  
        hr {
          border: 0;
          border-bottom: 1px solid #f6f6f6;
          Margin: 20px 0; }
  
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
          table[class=body] h1 {
            font-size: 28px !important;
            margin-bottom: 10px !important; }
          table[class=body] p,
          table[class=body] ul,
          table[class=body] ol,
          table[class=body] td,
          table[class=body] span,
          table[class=body] a {
            font-size: 16px !important; }
          table[class=body] .wrapper,
          table[class=body] .article {
            padding: 10px !important; }
          table[class=body] .content {
            padding: 0 !important; }
          table[class=body] .container {
            padding: 0 !important;
            width: 100% !important; }
          table[class=body] .main {
            border-left-width: 0 !important;
            border-radius: 0 !important;
            border-right-width: 0 !important; }
          table[class=body] .btn table {
            width: 100% !important; }
          table[class=body] .btn a {
            width: 100% !important; }
          table[class=body] .img-responsive {
            height: auto !important;
            max-width: 100% !important;
            width: auto !important; }}
  
        /* -------------------------------------
            PRESERVE THESE STYLES IN THE HEAD
        ------------------------------------- */
        @media all {
          .ExternalClass {
            width: 100%; }
          .ExternalClass,
          .ExternalClass p,
          .ExternalClass span,
          .ExternalClass font,
          .ExternalClass td,
          .ExternalClass div {
            line-height: 100%; }
          .apple-link a {
            color: inherit !important;
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            text-decoration: none !important; } 
          .btn-primary table td:hover {
            background-color: #34495e !important; }
          .btn-primary a:hover {
            background-color: #34495e !important;
            border-color: #34495e !important; } }
  
      </style>
    </head>
    <body class="">
      <table border="0" cellpadding="0" cellspacing="0" class="body">
        <tr>
          <td>&nbsp;</td>
          <td class="container">
            <div class="content">
  
              <!-- START CENTERED WHITE CONTAINER -->
              <span class="preheader"></span>
              <table class="main">
  
                <!-- START MAIN CONTENT AREA -->
                <tr>
                  <td class="wrapper">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td>
                          <div style="text-align: center;">
                            <img src="https://s3-us-west-2.amazonaws.com/coreandroid4/LogotipoBarra.png" alt="Logo">
                          </div>
                          <hr>
                            <h3 style="color: green; text-align: center;"><i class="fa fa-check-square"></i> ${asunto}</h3>
                          <hr>
                          <h3>Aviso</h3>
  
                          <br>
                          <h3>${texto}</h3>
                          <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                            <tbody>
                              <tr>
                                <td align="left">
                                  <table border="0" cellpadding="0" cellspacing="0">
                                    <tbody>
                                      <div style="text-align: center;">
                                        <tr>
                                          <td> <a href="http://www.qualitysoft.es" target="_blank">Acceder</a> </td>
                                        </tr>
                                      </div>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
  
                <!-- END MAIN CONTENT AREA -->
                </table>
  
              <!-- START FOOTER -->
              <div class="footer">
                <table border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td class="content-block">
                      <span class="apple-link">Quality Soft by First Book, S.L.</span>
                      
                    </td>
                  </tr>
                  <tr>
                    <td class="content-block powered-by">
                      En cumplimiento de la normativa vigente en materia de Servicios de la Sociedad de la Información y de Comercio Electrónico y de Protección de Datos de Carácter Personal, le comunicamos que sus datos de carácter personal forman parte de una base de datos gestionada bajo nuestra responsabilidad con la finalidad de mantener las relaciones comerciales y/o contractuales e informarle de novedades y ofertas relacionadas con nuestra actividad, sea por su condición de cliente o porque nos haya solicitado informacion comercial en algún momento.
  Es nuestra voluntad evitar el envío deliberado de correo no solicitado, por lo cual podrá en todo momento ejercitar sus derechos de acceso, rectificación, cancelación y oposición de sus datos de carácter personal ante First Book, S.L. email info@firstbook.es
   
  Este mensaje se dirige exclusivamente a su destinatario y puede contener información privilegiada o confidencial. Si usted no es el destinatario señalado, le informamos que cualquier divulgación o uso de los contenidos esta prohibida por ley. Si usted ha recibido este mensaje por error, por favor borre su contenido y comuníquenoslo en la dirección del remitente a la mayor brevedad posible
                    </td>
                  </tr>
                </table>
              </div>
              <!-- END FOOTER -->
              
            <!-- END CENTERED WHITE CONTAINER -->
            </div>
          </td>
          <td>&nbsp;</td>
        </tr>
      </table>
    </body>
  </html>
    `;
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.serviciodecorreo.es',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: 'info@firstbook.es', // generated ethereal user
          pass: 'Nohay2sin3'  // generated ethereal password
      },
      tls:{
        rejectUnauthorized:false
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Quality Soft" <info@firstbook.es>', // sender address
        // to: `${email}, 'testing@firstbook.es'`,  list of receivers
        subject: asunto, // Subject line
        text: 'No puede leer este correo?', // plain text body
        html: output // html body
    };

    mailOptions.to = ['pjimenez@qualitycw.com'];
  
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  
        res.render('contact', {msg:'Email has been sent'});
    });
});

module.exports = app;
