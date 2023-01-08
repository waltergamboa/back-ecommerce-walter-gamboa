const ArchivoContainer = require("../../Containers/archivo.container");
let instance = null;

class OrdenesDaoArchivo extends ArchivoContainer {
  constructor(ubicacion) {
    super(ubicacion);
  }

  static getInstance(ubicacion) {
    if (!instance) {
      instance = new OrdenesDaoArchivo(ubicacion);
    }

    return instance;
  }
}

module.exports = OrdenesDaoArchivo;
