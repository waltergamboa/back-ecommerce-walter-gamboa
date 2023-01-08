const ArchivoContainer = require("../../Containers/archivo.container");
let instance = null;

class UsuariosDaoArchivo extends ArchivoContainer {
    constructor(ubicacion){
        super(ubicacion);
    }

    static getInstance(ubicacion) {
        if (!instance) {
          instance = new UsuariosDaoArchivo(ubicacion);
        }
    
        return instance;
      }     
}

module.exports = UsuariosDaoArchivo;

