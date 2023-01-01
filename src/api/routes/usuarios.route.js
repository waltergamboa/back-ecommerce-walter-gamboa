const express = require("express");
const { Router } = express;
const { UsuariosController } = require("../controllers/usuarios.controller")

class UsuariosRouter{
    constructor(){
        this.usuariosController = new UsuariosController();
        this.router = Router();
    }

    init(){
        this.router.get("/", this.usuariosController.getAll);
        this.router.get("/:id", this.usuariosController.getById);
    //    this.router.get("/:category", this.usuariosController.getByCategory);        
        this.router.post("/", this.usuariosController.save)
        this.router.put("/:id", this.usuariosController.updateById)
        this.router.delete("/:id", this.usuariosController.deleteById)

        return this.router;
    }
}

module.exports =  { UsuariosRouter };