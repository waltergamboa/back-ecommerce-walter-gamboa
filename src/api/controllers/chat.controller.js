class ChatController {
  constructor() {}

  getAll = (req, res) => {
    try {
      res.render("pages/chat", {
        nombre: req.user.name,
        email: req.user.email,
        mismensajes: "false",
        admin: req.user.admin,
      });
    } catch (error) {
      res.json(error);
    }
  };

  getByEmail = (req, res) => {
    try {
      const { email } = req.params;
      res.render("pages/chat", {
        nombre: req.user.name,
        email: req.user.email,
        mismensajes: email,
        admin: req.user.admin,
      });
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { ChatController };
