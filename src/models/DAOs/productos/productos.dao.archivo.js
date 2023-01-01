const ArchivoContainer = require("../../Containers/archivo.container");

class ProductosDaoArchivo extends ArchivoContainer {
    constructor(ubicacion){
        super(ubicacion);
    }
}

module.exports = ProductosDaoArchivo;

