const express = require("express");
const { Router } = express;
const { AccesoController } = require("../controllers/acceso.controller");
const {
  passport,
  checkAuth,
} = require("../../middlewares/passport/passport.middleware");

class AccesoRouter {
  constructor() {
    this.accesoController = new AccesoController();
    this.router = Router();
  }

  init() {
    this.router.get("/", checkAuth, this.accesoController.raiz);
    this.router.get("/login", this.accesoController.login);
    this.router.get("/signup", checkAuth, this.accesoController.signup);
    this.router.get(
      "/error_login",
      checkAuth,
      this.accesoController.errorLogin
    );
    this.router.get(
      "/error_signup",
      checkAuth,
      this.accesoController.errorSignup
    );
    this.router.post(
      "/login",
      passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "/error_login",
      })
    );
    this.router.post(
      "/signup",
      passport.authorize("signup", {
        successRedirect: "pages/login",
        failureRedirect: "pages/error_signup",
      })
    );
    this.router.post("/logout", checkAuth, this.accesoController.logout);
    return this.router;
  }
}

module.exports = { AccesoRouter };
