const ArchivoContainer = require("../../Containers/archivo.container");
let instance = null;

class ProductosDaoArchivo extends ArchivoContainer {
  constructor(ubicacion) {
    super(ubicacion);
  }

  static getInstance(ubicacion) {
    if (!instance) {
      instance = new ProductosDaoArchivo(ubicacion);
    }

    return instance;
  }
}

module.exports = ProductosDaoArchivo;
