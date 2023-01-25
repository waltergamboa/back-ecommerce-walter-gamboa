class AccesoController {
  constructor() {}

  raiz = (req, res) => {
    try {
      res.redirect("/productos");
    } catch (error) {
      res.json(error);
    }
  };

  login = (req, res) => {
    try {
      res.render("pages/login");
    } catch (error) {
      res.json(error);
    }
  };

  signup = (req, res) => {
    try {
      res.render("pages/signup");
    } catch (error) {
      res.json(error);
    }
  };

  errorLogin = (req, res) => {
    try {
      res.render("pages/error_login");
    } catch (error) {
      res.json(error);
    }
  };

  errorSignup = (req, res) => {
    try {
      res.render("pages/error_registrar");
    } catch (error) {
      res.json(error);
    }
  };

  postLogin = (req, res) => {
    try {
      const { user } = req.user;
      res.render("pages/ingresar", { nombre: req.user.name });
    } catch (error) {
      res.json(error);
    }
  };

  postSignup = (req, res) => {
    try {
      res.render("pages/login");
    } catch (error) {
      res.json(error);
    }
  };

  logout = (req, res, next) => {
    try {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/login");
      });
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { AccesoController };
