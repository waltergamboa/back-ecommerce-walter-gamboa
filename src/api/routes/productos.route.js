const express = require("express");
const { Router } = express;
const { ProductosController } = require("../controllers/productos.controller")

class ProductosRouter{
    constructor(){
        this.productosController = new ProductosController();
        this.router = Router();
    }

    init(){
        this.router.get("/", this.productosController.getAll);
        this.router.get("/:id", this.productosController.getById);
        this.router.get("/categoria/:category", this.productosController.getByCategory);        
        this.router.post("/", this.productosController.save)
        this.router.put("/:id", this.productosController.updateById)
        this.router.delete("/:id", this.productosController.deleteById)

        return this.router;
    }
}

module.exports =  { ProductosRouter };
