const express = require("express");
const { Router } = express;
const { ProductosController } = require("../controllers/productos.controller");
const { checkAuth } = require("../../middlewares/passport/passport.middleware");

class ProductosRouter {
  constructor() {
    this.productosController = new ProductosController();
    this.router = Router();
  }

  init() {
    this.router.get("/", checkAuth, this.productosController.getAll);
    this.router.get("/:id", checkAuth, this.productosController.getById);
    this.router.get(
      "/categoria/:category",
      checkAuth,
      this.productosController.getByCategory
    );
    this.router.post("/", this.productosController.save);
    this.router.put("/:id", this.productosController.updateById);
    this.router.delete("/:id", this.productosController.deleteById);

    return this.router;
  }
}

module.exports = { ProductosRouter };
