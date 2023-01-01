const nodemailer = require("nodemailer");
const { logger, loggerWarn, loggerError } = require("../logger/logger");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: process.env.MAIL_ADMIN,
    pass: process.env.MAIL_PASS,
  },
});

const mailNuevoRegistro = async (username, email) => {
  try {
    const info = await transporter.sendMail({
      from: "Backend Walter Gamboa",
      to: process.env.MAIL_ADMIN,
      subject: "Nuevo Registro",
      html: `<h1 style="color: blue;">Se registro el usuario: ${username} </br></h1><h3>con el mail ${email}.</h3></br><span>Saludos...</span>`,
    });
    logger.info("Se envio un email a %s", process.env.MAIL_ADMIN);
    return null;
  } catch (error) {
    loggerError.error("Error en el envio de un mail: %s", error)
  }
};

const mailNuevaOrden = async (username, email) => {
  try {
    const info = await transporter.sendMail({
      from: "Backend Walter Gamboa",
      to: process.env.MAIL_ADMIN,
      subject: "Nueva Orden",
      html: `<h1 style="color: blue;">Test Nueva Orden Se registro  usuario: ${username} </br></h1><h3>con el mail ${email}.</h3></br><span>Saludos...</span>`,
    });
    logger.info("Se envio un email a %s", process.env.MAIL_ADMIN);
    return null;
  } catch (error) {
    loggerError.error("Error en el envio de un mail: %s", error)
  }
};

module.exports = {
    mailNuevoRegistro,
    mailNuevaOrden
}

// test
// const { mailNuevoRegistro } = require("./helpers/mensajes/mail.mensaje");

// ;(async ()=>{
//     try {
//         const res = await mailNuevoRegistro(username, email);
//      } catch (error) {
//         loggerError.error("Error en el envio de un mail: %s", error)
//      }
// })();
