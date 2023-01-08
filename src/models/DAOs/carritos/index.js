const { Carritos } = require("../../carritos.model");
const config = require("../../../config/config");

let carritosDao;

const opcion = config.TIPO_PERSISTENCIA;

switch (opcion) {
  case "archivo":
    const CarritosDaoArchivo = require("./carritos.dao.archivo");
    carritosDao = new CarritosDaoArchivo.getInstance("./src/data/carritos.data.json");
    break;
  case "mongodb":
    const CarritosDaoMongoDB = require("./carritos.dao.mongodb");
    carritosDao = CarritosDaoMongoDB.getInstance("carritos", Carritos);
    break;
  default:
    break;
}

module.exports = { carritosDao };
