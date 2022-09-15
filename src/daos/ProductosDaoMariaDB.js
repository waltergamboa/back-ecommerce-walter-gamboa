const ContenedorMariaDB = require("../contenedores/ContenedorMariaDB");

class ProductosDaoMariaDB extends ContenedorMariaDB {
    constructor(){
        super("productos", {
            client: "mysql",
            connection: {
                host: "127.0.0.1",
                user: "root",
                password: "",
                database: "ecommerce"
            }});
    }
}

module.exports = ProductosDaoMariaDB;