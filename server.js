/* ------------------------------- constantes ------------------------------- */
const express = require("express");
const { Router } = express;
const dotenv = require('dotenv');

const routerProductos = require('./routes/producto.routes');
const routerCarrito = require('./routes/carrito.routes');

//const ProductosApi = require("./src/daos/ProductosDaoMongoDB");
//const productosApi = new ProductosApi();


const test = async ()=>{
  //const ProductosApi = require("./src/daos/ProductosDaoFirebase");
  //const productosApi = new ProductosApi("productos");

const { productosDao: productosApi } = require("./src/daos/index.js")

  const a = {
    nombre: "aaanaranjaconindex",
    descripcion: "aaanaranjasconindex", 
    codigo: "mz1", 
    foto: "https://media.istockphoto.com/photos/red-apple-picture-id184276818?k=20&m=184276818&s=612x612&w=0&=QxOcueqAUVTdiJ7DVoCu-BkNCIuwliPEgtAQhgvBA_g=", 
   precio: 12, 
   stock: 100
}
 
//const documents = await productosApi.getAll().then((data)=>data);
const documents = await productosApi.save(a).then((data)=>data);



//get all
//const documents = await productosApi.getAll();

//get by id
//const documents = await productosApi.getById("1");

//delete
//const documents = await productosApi.deleteById("1");

// const a = {
//   nombre: "JOSE",
//   apellido: "perez",
//   edad: 20,
//   email: "j@gmail.com"

// }

// const documents = await productosApi.updateById("1", a);
  console.log(documents);
  
}

//test();


/* ------------------------------- inicializar ------------------------------ */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

dotenv.config();

const admin = true;

app.use((req, res, next)=>{
  const metodosValidar = ["post", "put", "delete"];
  const { method, url } = req;
  const mensajeError = { error : -1, descripcion: `ruta ${url} método ${method} no autorizada` };

  if (url.toLowerCase() === "/api/productos"){
    if(metodosValidar.includes(method.toLowerCase()) && !admin ){
      res.send(mensajeError)
    }else{
      next();
    }
  }else{
    next();
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error en el servidor!!!");
});

app.get("/", (req, res) => {
  let mensaje = `<h1>Proyecto Final</h1>
                    <h2>Primera Entrega</h2>
                    <h3>Productos</h3>
                    <ul>
                    <li>(GET) Productos (<a href="http://localhost:8080/api/productos">/api/productos</a>)</li>
                    <li>(GET por ID) Producto (<a href="http://localhost:8080/api/productos/1">/api/productos/1</a>)</li>                    
                    <li>Los otros metodos ejecutar por archivo productos.rest en carpeta tests</li>
                    </ul> <br>
                    <h3>Carrito de Compras</h3>
                    <ul>
                    <li>(GET) Carrito (<a href="http://localhost:8080/api/carrito">/api/carrito</a>)</li>
                    <li>(GET por ID) Carrito (<a href="http://localhost:8080/api/carrito/1">/api/carrito/1</a>)</li>                    
                    <li>Los otros metodos ejecutar por archivo carrito.rest en carpeta tests</li>
                    </ul>`;

  res.send(mensaje);
});

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.use("*", (req, res) => {
  const { method, baseUrl } = req;
  const mensajeError = { error : -2, descripcion: `Ruta ${baseUrl} Método ${method} no implementada` };
  console.log(req)
  res.send(mensajeError);
})

/* -------------------------------------------------------------------------- */
/*                                   server                                   */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${server.address().port}`);
});
