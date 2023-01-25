class ArchivosController {
  constructor() {}

  getAll = (req, res) => {
    try {
      res.render("pages/archivos", { nombre: req.user.name });
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { ArchivosController };
