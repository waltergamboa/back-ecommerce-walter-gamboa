const twilio = require("twilio");
const { logger, loggerWarn, loggerError } = require("../logger/logger");
const  config  = require("../../config/config")

const accountSid = config.ACCOUNTSID;
const authToken = config.AUTHTOKEN;
const client = twilio(accountSid, authToken);

const options = {
  from: "+18316535818",
};

const smsMensaje = async (to, message) => {
  try {
    const info = await client.messages.create({
      ...options,
      body: message,
      to: to,
    });
    logger.info("Se envio un sms a %s", to);
    return null;
  } catch (error) {
    loggerError.error("Error en el envio de un sms: %s", error);
  }
};

module.exports = {
  smsMensaje,
};


// test
//const { smsMensaje } = require("./helpers/mensajes/sms.mensaje");

// ;(async ()=>{
//     try {
//         const res = await smsMensaje("+541163071967", "test");
//      } catch (error) {
//         loggerError.error("Error en el envio de un mail: %s", error)
//      }
// })();
