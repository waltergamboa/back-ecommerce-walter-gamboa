const ContenedorMongoDB = require("../contenedores/ContenedorMongoDB");

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super("productos", {
          timestamp: {
            type: Number,
            require: true,
          },
          nombre: {
            type: String,
            require: true,
            trim: true,
            max: 50,
          },
          descripcion: {
            type: String,
            require: true,
            trim: true,
            max: 150,
          },
          codigo: {
            type: String,
            require: true,
            trim: true,
            max: 10,
          },
          foto: {
            type: String,
            require: true,
            trim: true,
            max: 250,
          },
          precio: {
            type: Number,
            require: true,
          },
          stock: {
            type: Number,
            require: true,
          },
        });
    }
}

module.exports = ProductosDaoMongoDB;