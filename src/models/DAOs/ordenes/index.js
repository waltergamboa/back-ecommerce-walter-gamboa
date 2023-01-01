const { Ordenes } = require("../../ordenes.model")

let ordenesDao;

const opcion = process.env.TIPO_PERSISTENCIA;

switch(opcion){
    case "archivo":
        const OrdenesDaoArchivo = require("./ordenes.dao.archivo");
        ordenesDao = new OrdenesDaoArchivo("./src/data/ordenes.data.json");
        break;
    case "mongodb":
        const OrdenesDaoMongoDB = require("./ordenes.dao.mongodb");
        ordenesDao = OrdenesDaoMongoDB.getInstance("ordenes", Ordenes);
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

module.exports = { ordenesDao }