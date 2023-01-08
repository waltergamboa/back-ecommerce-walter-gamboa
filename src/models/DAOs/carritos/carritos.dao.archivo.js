const ArchivoContainer = require("../../Containers/archivo.container");
let instance = null;

class CarritosDaoArchivo extends ArchivoContainer {
  constructor(ubicacion) {
    super(ubicacion);
  }

  static getInstance(ubicacion) {
    if (!instance) {
      instance = new CarritosDaoArchivo(ubicacion);
    }

    return instance;
  }

  async deleteItem(id, idProducto) {
    try {
      let dataArchParse = await this.stringToObj().then((data) => data);

      let carrito = dataArchParse.find(
        (carrito) => parseInt(carrito.id) === id
      );

      let productos = carrito.productos;

      if (carrito) {
        const dataCarritoFiltrado = productos.filter(
          (producto) => parseInt(producto.id) !== idProducto
        );

        carrito.productos = dataCarritoFiltrado;

        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify(dataArchParse, null, 2)
        );
        return id;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CarritosDaoArchivo;
