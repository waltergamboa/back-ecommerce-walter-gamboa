const express = require("express");
const { Router } = express;
const { MensajesController } = require("../controllers/mensajes.controller")

class MensajesRouter{
    constructor(){
        this.mensajesController = new MensajesController();
        this.router = Router();
    }

    init(){
        this.router.get("/", this.mensajesController.getAll);
        this.router.get("/:id", this.mensajesController.getById);
        this.router.post("/", this.mensajesController.save)
        this.router.put("/:id", this.mensajesController.updateById)
        this.router.delete("/:id", this.mensajesController.deleteById)

        return this.router;
    }
}

module.exports =  { MensajesRouter };