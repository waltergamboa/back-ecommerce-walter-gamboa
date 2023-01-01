const ArchivoContainer = require("../../Containers/archivo.container");

class UsuariosDaoArchivo extends ArchivoContainer {
    constructor(ubicacion){
        super(ubicacion);
    }
}

module.exports = UsuariosDaoArchivo;

