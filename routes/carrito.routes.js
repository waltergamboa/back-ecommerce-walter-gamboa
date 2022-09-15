const express = require("express");
const { Router } = express;

const { carritoDao: carritoApi } = require("../src/daos/index.js");

const getTimestamp = ()=>{
  return Date.now();
}

/* -------------------------------------------------------------------------- */
/*                              router Carrito                                */
/* -------------------------------------------------------------------------- */
const routerCarrito = Router();

routerCarrito.get("/", async (req, res) => {
  try {
  //  const contenedor = new Contenedor(dbCarrito);
    const carrito = await carritoApi.getAll();
    if (carrito) {
      res.json(carrito);
    } else {
      res.json({ mensaje: "Sin carrito" });
    }
  } catch (error) {
    res.json({ error });
  }
});

routerCarrito.get("/:id", async (req, res) => {
  try {
    //const contenedor = new Contenedor(dbCarrito);
    const { id } = req.params;

    const carrito = await carritoApi.getById(id);
    carrito
      ? res.json(carrito)
      : res.json({ error: "Carrito no encontrado" });
  } catch (error) {
    res.json({ error });
  }
});

routerCarrito.post("/", async (req, res) => {
  try {
    const { idcarrito, idproducto, nombre, precio, cantidad } = req.body;

     const id = await carritoApi.save({
       timestamp: getTimestamp(),
       idcarrito,
       idproducto,
       nombre,
       precio: Number(precio),
       cantidad: Number(cantidad)
     });

  //  if (id > 0) {
      res.json({ mensaje: `Se genero el item` });
  //  } else {
  //    res.json({ mensaje: "No se pudo generar el carrito" });
  //  }
  } catch (error) {
    res.json(error);
  }
});

routerCarrito.put("/:id", async (req, res) => {
  try {
    //const contenedor = new Contenedor(dbCarrito);
    const { id } = req.params;
    const item = req.body;

    const retorno = await carritoApi.updateById(id, item);
    retorno
      ? res.json({ mensaje: "El carrito se actualizo con exito" })
      : res.json({ error: "Carrito no encontrado" });
  } catch (error) {
    res.json(error);
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  try {
    //const contenedor = new Contenedor(dbCarrito);
    const { id } = req.params;

    const retorno = await carritoApi.deleteById(id);
   retorno
   ? res.json({ mensaje: "El carrito se borro con exito" })
   : res.json({ error: "Carrito no encontrado" });
}
   // res.json({ mensaje: "El carrito se borro con exito" })
   
    catch (error) {
    res.json(error);
  }
});

// routerCarrito.delete("/:id/productos/:idProducto", async (req, res) => {
//   try {
//     const contenedor = new Contenedor(dbCarrito);
//     const { id, idProducto } = req.params;

//     const retorno = await contenedor.deleteItem(parseInt(id), parseInt(idProducto));
//     retorno
//       ? res.json({ mensaje: "El producto del carrito se borro con exito" })
//       : res.json({ error: "Producto del carrito no encontrado" });
//   } catch (error) {
//     res.json(error);
//   }
// });

module.exports  = routerCarrito;