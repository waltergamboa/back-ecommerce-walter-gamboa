const express = require("express");
const { Router } = express;
const { AccesoController } = require("../controllers/acceso.controller");
const { passport } = require("../../middlewares/passport/passport.middleware");
const { checkAuth } = require("../../middlewares/auth/auth.middleware");

class AccesoRouter {
  constructor() {
    this.accesoController = new AccesoController();
    this.router = Router();
  }

  init() {
    this.router.get("/", checkAuth, this.accesoController.raiz);
    this.router.get("/login", this.accesoController.login);
    this.router.get("/signup", this.accesoController.signup);
    this.router.get("/error_login", this.accesoController.errorLogin);
    this.router.get("/error_signup", this.accesoController.errorSignup);
    this.router.post(
      "/login",
      passport.authenticate("login", {
        successRedirect: "/",
        failureRedirect: "error_login",
      }),
      this.accesoController.postLogin
    );
    this.router.post(
      "/signup",
      passport.authorize("signup", {
        successRedirect: "/",
        failureRedirect: "error_signup",
      }),
      this.accesoController.postSignup
    );
    this.router.post("/logout", this.accesoController.logout);

    return this.router;
  }
}

module.exports = { AccesoRouter };
