const ArchivoContainer = require("../../Containers/archivo.container");

class MensajesDaoArchivo extends ArchivoContainer {
    constructor(ubicacion){
        super(ubicacion);
    }
}

module.exports = MensajesDaoArchivo;

