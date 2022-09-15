const ContenedorMongoDB = require("../contenedores/ContenedorMongoDB");

class CarritoDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super("carritos", {
        timestamp: {
            type: Number,
            require: true,
        },            
          idcarrito: {
            type: Number,
            require: true,
          },
          idproducto: {
            type: Number,
            require: true,
          },
          nombre: {
            type: String,
            require: true,
            trim: true,
            max: 50,
          },
          precio: {
            type: Number,
            require: true,
          },
          cantidad: {
            type: Number,
            require: true,
          },
        });
    }
}

module.exports = CarritoDaoMongoDB;