const { Mensajes } = require("../../mensajes.model")

let mensajesDao;

const opcion = process.env.TIPO_PERSISTENCIA;

switch(opcion){
    case "archivo":
        const MensajesDaoArchivo = require("./mensajes.dao.archivo");
        mensajesDao = new MensajesDaoArchivo("./src/data/mensajes.data.json");
        break;
    case "mongodb":
        const MensajesDaoMongoDB = require("./mensajes.dao.mongodb");
        mensajesDao = MensajesDaoMongoDB.getInstance("mensajes", Mensajes);
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

module.exports = { mensajesDao }