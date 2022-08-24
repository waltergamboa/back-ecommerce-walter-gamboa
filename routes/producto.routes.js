const express = require("express");
const { Router } = express;
const Contenedor = require("../contenedor");

const dbProductos = "./database/productos.db.json";

const getTimestamp = ()=>{
  return Date.now();
}

/* -------------------------------------------------------------------------- */
/*                              router Productos                              */
/* -------------------------------------------------------------------------- */
const routerProductos = Router();

routerProductos.get("/", async (req, res) => {
  try {
    const contenedor = new Contenedor(dbProductos);
    const productos = await contenedor.getAll();
    if (productos) {
      res.json(productos);
    } else {
      res.json({ mensaje: "Sin productos" });
    }
  } catch (error) {
    res.json({ error });
  }
});

routerProductos.get("/:id", async (req, res) => {
  try {
    const contenedor = new Contenedor(dbProductos);
    const { id } = req.params;

    const producto = await contenedor.getById(parseInt(id));
    producto
      ? res.json(producto)
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    res.json({ error });
  }
});

routerProductos.post("/", async (req, res) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const contenedor = new Contenedor(dbProductos);

    const id = await contenedor.save({
      timestamp: getTimestamp(), 
      nombre, 
      descripcion, 
      codigo, 
      foto, 
      precio: Number(precio), 
      stock: Number(stock)
    });

    if (id > 0) {
      res.json({ mensaje: `Se genero el id ${id}` });
    } else {
      res.json({ mensaje: "No se pudo generar el producto" });
    }
  } catch (error) {
    res.json(error);
  }
});

routerProductos.put("/:id", async (req, res) => {
  try {
    const contenedor = new Contenedor(dbProductos);
    const { id } = req.params;
    const item = req.body;

    const retorno = await contenedor.updateById(parseInt(id), item);
    retorno
      ? res.json({ mensaje: "El producto se actualizo con exito" })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    res.json(error);
  }
});

routerProductos.delete("/:id", async (req, res) => {
  try {
    const contenedor = new Contenedor(dbProductos);
    const { id } = req.params;

    const retorno = await contenedor.delete(parseInt(id));
    retorno
      ? res.json({ mensaje: "El producto se borro con exito" })
      : res.json({ error: "Producto no encontrado" });
  } catch (error) {
    res.json(error);
  }
});

module.exports  = routerProductos;