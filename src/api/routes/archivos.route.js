const express = require("express");
const { Router } = express;
const { ArchivosController } = require("../controllers/archivos.controller");
const { checkAuth } = require("../../middlewares/auth/auth.middleware");


class ArchivosRouter {
  constructor() {
    this.archivosController = new ArchivosController();
    this.router = Router();
  }

  init() {
    this.router.get("/", checkAuth, this.archivosController.getAll);

    return this.router;
  }
}

module.exports = { ArchivosRouter };
