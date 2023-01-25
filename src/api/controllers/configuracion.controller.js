const config = require("../../config/config");

class ConfiguracionController {
  constructor() {}

  getAll = (req, res) => {
    try {
      const configuracionActual = [
        `NODE_ENV: ${config.NODE_ENV}`,
        `PORT: ${config.PORT}`,
        `SESSION_SECRET: ${config.SESSION_SECRET}`,
        `MONGO_DB: ${config.MONGO_DB}`,
        `MAIL_ADMIN: ${config.MAIL_ADMIN}`,
        `MAIL_PASS: ${config.MAIL_PASS}`,
        `ACCOUNTSID: ${config.ACCOUNTSID}`,
        `AUTHTOKEN: ${config.AUTHTOKEN}`,
        `TIPO_PERSISTENCIA: ${config.TIPO_PERSISTENCIA}`,
      ];

      res.render("pages/config", {
        configuracionActual,
        nombre: req.user.name,
      });
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { ConfiguracionController };
