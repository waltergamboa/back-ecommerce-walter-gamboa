const { Mensajes } = require("../../mensajes.model");
const config = require("../../../config/config");

let mensajesDao;

const opcion = config.TIPO_PERSISTENCIA;

switch (opcion) {
  case "archivo":
    const MensajesDaoArchivo = require("./mensajes.dao.archivo");
    mensajesDao = new MensajesDaoArchivo.getInstance("./src/data/mensajes.data.json");
    break;
  case "mongodb":
    const MensajesDaoMongoDB = require("./mensajes.dao.mongodb");
    mensajesDao = MensajesDaoMongoDB.getInstance("mensajes", Mensajes);
    break;
  default:
    break;
}

module.exports = { mensajesDao };
