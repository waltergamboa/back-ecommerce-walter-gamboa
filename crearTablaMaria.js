const { options } = require("./DBConexion/mariaDB/conexionDB");
const knex = require("knex")(options);

knex.schema.createTable("productos", table => {
    table.increments("id");
    table.integer("timestamp");
    table.string("nombre");
    table.string("descripcion");
    table.string("codigo");
    table.string("foto");
    table.integer("precio");
    table.integer("stock");
})
.then(()=>console.log("tabla creada"))
.catch((err)=>{console.log(err); throw err})
.finally(()=>knex.destroy())
