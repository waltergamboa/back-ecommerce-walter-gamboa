const express = require("express");
const { Router } = express;
const { OrdenesController } = require("../controllers/ordenes.controller")

class OrdenesRouter{
    constructor(){
        this.ordenesController = new OrdenesController();
        this.router = Router();
    }

    init(){
        this.router.get("/", this.ordenesController.getAll);
        this.router.get("/:id", this.ordenesController.getById);
        this.router.post("/", this.ordenesController.save)
        this.router.put("/:id", this.ordenesController.updateById)
        this.router.delete("/:id", this.ordenesController.deleteById)        

        return this.router;
    }
}

module.exports =  { OrdenesRouter };