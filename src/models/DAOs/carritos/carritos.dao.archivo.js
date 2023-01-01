const ArchivoContainer = require("../../Containers/archivo.container");

class CarritosDaoArchivo extends ArchivoContainer {
    constructor(ubicacion){
        super(ubicacion);
    }

    
  async deleteItem(id, idProducto) {
    try {
      // let dataArch = await fs.promises.readFile(this.ubicacion, "utf-8");
      // let dataArchParse = JSON.parse(dataArch);

      let dataArchParse = await this.stringToObj().then((data) => data);

      let carrito = dataArchParse.find((carrito) => parseInt(carrito.id) === id);
 
      let productos = carrito.productos;

      if (carrito) {
          const dataCarritoFiltrado = productos.filter(
          (producto) => parseInt(producto.id) !== idProducto
          );

        carrito.productos = dataCarritoFiltrado

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
