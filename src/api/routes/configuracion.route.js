const express = require("express");
const { Router } = express;
const {
  ConfiguracionController,
} = require("../controllers/configuracion.controller");
const { checkAuth } = require("../../middlewares/auth/auth.middleware");

class ConfiguracionRouter {
  constructor() {
    this.configuracionController = new ConfiguracionController();
    this.router = Router();
  }

  init() {
    this.router.get("/", checkAuth, this.configuracionController.getAll);

    return this.router;
  }
}

module.exports = { ConfiguracionRouter };
