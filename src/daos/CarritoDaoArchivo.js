const ContenedorArchivo = require("../contenedores/ContenedorArchivo");

class CarritoDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./database/carrito.db.json");
    }
}

module.exports = CarritoDaoArchivo;