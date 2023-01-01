const { Usuarios } = require("../../usuarios.model")

let usuariosDao;

const opcion = process.env.TIPO_PERSISTENCIA;

switch(opcion){
    case "archivo":
        const UsuariosDaoArchivo = require("./usuarios.dao.archivo");
        usuariosDao = new UsuariosDaoArchivo("./src/data/usuarios.data.json");
        break;
    case "mongodb":
        const UsuariosDaoMongoDB = require("./usuarios.dao.mongodb");
        usuariosDao = UsuariosDaoMongoDB.getInstance("usuarios", Usuarios);
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

module.exports = { usuariosDao }