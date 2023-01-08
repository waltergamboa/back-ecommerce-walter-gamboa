const { Usuarios } = require("../../usuarios.model");
const config = require("../../../config/config");

let usuariosDao;

const opcion = config.TIPO_PERSISTENCIA;

switch (opcion) {
  case "archivo":
    const UsuariosDaoArchivo = require("./usuarios.dao.archivo");
    usuariosDao = new UsuariosDaoArchivo.getInstance("./src/data/usuarios.data.json");
    break;
  case "mongodb":
    const UsuariosDaoMongoDB = require("./usuarios.dao.mongodb");
    usuariosDao = UsuariosDaoMongoDB.getInstance("usuarios", Usuarios);
    break;
  default:
    break;
}

module.exports = { usuariosDao };
