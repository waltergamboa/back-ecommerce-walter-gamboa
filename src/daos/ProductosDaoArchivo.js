const ContenedorArchivo = require("../contenedores/ContenedorArchivo");

class ProductosDaoArchivo extends ContenedorArchivo {
    constructor(){
        super("./database/productos.db.json");
    }
}

module.exports = ProductosDaoArchivo;


