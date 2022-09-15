const ContenedorMariaDB = require("../contenedores/ContenedorMariaDB");

class CarritoDaoMariaDB extends ContenedorMariaDB {
    constructor(){
        super("carritos", {
            client: "mysql",
            connection: {
                host: "127.0.0.1",
                user: "root",
                password: "",
                database: "ecommerce"
            }});
    }
}

module.exports = CarritoDaoMariaDB;