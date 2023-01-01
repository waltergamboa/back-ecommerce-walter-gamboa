const twilio = require("twilio");
const { logger, loggerWarn, loggerError } = require("../logger/logger");

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken);

const options = {
  from: "whatsapp:+14155238886",
};

const whatsappMensaje = async (to, message) => {
  try {
    const info = await client.messages.create({
      ...options,
      body: message,
      to: "whatsapp:"+to,
    });
    logger.info("Se envio un sms a %s", to);
    return null;
  } catch (error) {
    loggerError.error("Error en el envio de un sms: %s", error);
  }
};

module.exports = {
  whatsappMensaje,
};


// test
//const { whatsappMensaje } = require("./helpers/mensajes/sms.mensaje");

// ;(async ()=>{
//     try {
//         const res = await whatsappMensaje("+541163071967", "test");
//      } catch (error) {
//         loggerError.error("Error en el envio de un whats app: %s", error)
//      }
// })();
