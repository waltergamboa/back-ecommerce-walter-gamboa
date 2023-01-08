const { Ordenes } = require("../../ordenes.model");
const config = require("../../../config/config");

let ordenesDao;

const opcion = config.TIPO_PERSISTENCIA;

switch (opcion) {
  case "archivo":
    const OrdenesDaoArchivo = require("./ordenes.dao.archivo");
    ordenesDao = new OrdenesDaoArchivo.getInstance("./src/data/ordenes.data.json");
    break;
  case "mongodb":
    const OrdenesDaoMongoDB = require("./ordenes.dao.mongodb");
    ordenesDao = OrdenesDaoMongoDB.getInstance("ordenes", Ordenes);
    break;
  default:
    break;
}

module.exports = { ordenesDao };
