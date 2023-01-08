const { Productos } = require("../../productos.model");
const config = require("../../../config/config");

let productosDao;

const opcion = config.TIPO_PERSISTENCIA;

switch (opcion) {
  case "archivo":
    const ProductosDaoArchivo = require("./productos.dao.archivo");
    productosDao = new ProductosDaoArchivo.getInstance("./src/data/productos.data.json");
    break;
  case "mongodb":
    const ProductosDaoMongoDB = require("./productos.dao.mongodb");
    productosDao = ProductosDaoMongoDB.getInstance("productos", Productos);
    break;
  default:
    break;
}

module.exports = { productosDao };
