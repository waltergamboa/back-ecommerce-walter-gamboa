const ArchivoContainer = require("../../Containers/archivo.container");
let instance = null;

class MensajesDaoArchivo extends ArchivoContainer {
  constructor(ubicacion) {
    super(ubicacion);
  }

  static getInstance(ubicacion) {
    if (!instance) {
      instance = new MensajesDaoArchivo(ubicacion);
    }

    return instance;
  }
}

module.exports = MensajesDaoArchivo;
