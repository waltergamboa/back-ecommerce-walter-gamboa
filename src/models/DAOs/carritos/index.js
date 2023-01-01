const { Carritos } = require("../../carritos.model")

let carritosDao;

const opcion = process.env.TIPO_PERSISTENCIA;

switch(opcion){
    case "archivo":
        const CarritosDaoArchivo = require("./carritos.dao.archivo");
        carritosDao = new CarritosDaoArchivo("./src/data/carritos.data.json");
        break;
    case "mongodb":
        const CarritosDaoMongoDB = require("./carritos.dao.mongodb");
        carritosDao = CarritosDaoMongoDB.getInstance("carritos", Carritos);
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

module.exports = { carritosDao }