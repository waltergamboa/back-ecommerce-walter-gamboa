const express = require("express");
const { Router } = express;
const Contenedor = require("../contenedor");

const dbCarrito = "./database/carrito.db.json";


const getTimestamp = ()=>{
  return Date.now();
}

/* -------------------------------------------------------------------------- */
/*                              router Carrito                                */
/* -------------------------------------------------------------------------- */
const routerCarrito = Router();

routerCarrito.get("/", async (req, res) => {
  try {
    const contenedor = new Contenedor(dbCarrito);
    const carrito = await contenedor.getAll();
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
    const contenedor = new Contenedor(dbCarrito);
    const { id } = req.params;

    const carrito = await contenedor.getById(parseInt(id));
    carrito
      ? res.json(carrito)
      : res.json({ error: "Carrito no encontrado" });
  } catch (error) {
    res.json({ error });
  }
});

routerCarrito.post("/", async (req, res) => {
  try {
    const { productos } = req.body;
    const contenedor = new Contenedor(dbCarrito);

    const id = await contenedor.save({
      timestamp: getTimestamp(),
      productos
    });

    if (id > 0) {
      res.json({ mensaje: `Se genero el id ${id}` });
    } else {
      res.json({ mensaje: "No se pudo generar el carrito" });
    }
  } catch (error) {
    res.json(error);
  }
});

routerCarrito.put("/:id", async (req, res) => {
  try {
    const contenedor = new Contenedor(dbCarrito);
    const { id } = req.params;
    const item = req.body;

    const retorno = await contenedor.updateById(parseInt(id), item);
    retorno
      ? res.json({ mensaje: "El carrito se actualizo con exito" })
      : res.json({ error: "Carrito no encontrado" });
  } catch (error) {
    res.json(error);
  }
});

routerCarrito.delete("/:id", async (req, res) => {
  try {
    const contenedor = new Contenedor(dbCarrito);
    const { id } = req.params;

    const retorno = await contenedor.delete(parseInt(id));
    retorno
      ? res.json({ mensaje: "El carrito se borro con exito" })
      : res.json({ error: "Carrito no encontrado" });
  } catch (error) {
    res.json(error);
  }
});

routerCarrito.delete("/:id/productos/:idProducto", async (req, res) => {
  try {
    const contenedor = new Contenedor(dbCarrito);
    const { id, idProducto } = req.params;

    const retorno = await contenedor.deleteItem(parseInt(id), parseInt(idProducto));
    retorno
      ? res.json({ mensaje: "El producto del carrito se borro con exito" })
      : res.json({ error: "Producto del carrito no encontrado" });
  } catch (error) {
    res.json(error);
  }
});

module.exports  = routerCarrito;