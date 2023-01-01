const express = require("express");
const { Router } = express;
const { CarritosController } = require("../controllers/carritos.controller")

class CarritosRouter{
    constructor(){
        this.carritosController = new CarritosController();
        this.router = Router();
    }

    init(){
        this.router.get("/", this.carritosController.getAll);
        this.router.get("/:id", this.carritosController.getById);
        this.router.post("/", this.carritosController.save)
        this.router.put("/:id", this.carritosController.updateById)
        this.router.delete("/:id", this.carritosController.deleteById)        

        return this.router;
    }
}

module.exports =  { CarritosRouter };