const { Productos } = require("../../productos.model")

let productosDao;

const opcion = process.env.TIPO_PERSISTENCIA;

switch(opcion){
    case "archivo":
        const ProductosDaoArchivo = require("./productos.dao.archivo");
        productosDao = new ProductosDaoArchivo("./src/data/productos.data.json");
        break;
    case "mongodb":
        const ProductosDaoMongoDB = require("./productos.dao.mongodb");
        productosDao = ProductosDaoMongoDB.getInstance("productos", Productos);
        break;
    // case "firebase":
    //     const ProductosDaoFirebase  = require("../ProductosDaoFirebase");
    //     productosDao = new ProductosDaoFirebase();
    //     break;
    // case "mariadb":
    //     const ProductosDaoMariaDB = require("../ProductosDaoMariaDB");
    //     productosDao = new ProductosDaoMariaDB();
    //     break;        
    default:
        break;

}

module.exports = { productosDao }