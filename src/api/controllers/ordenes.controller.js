const { OrdenesApi } = require("../../services/ordenes/ordenes.service");

class OrdenesController {
  constructor() {
    this.ordenesApi = new OrdenesApi();
  }

  getTimestamp = () => {
    return Date.now();
  };

  getAll = async (req, res) => {
    try {
      const datos = await this.ordenesApi.getAll();
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = await this.ordenesApi.getById(id);
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  save = async (req, res) => {
    try {
      const { email, estado, items } = req.body;

      const obj = {
        email,
        estado,
        items: items,
      };

      const respuesta = await this.ordenesApi.save(obj);

      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;

      const respuesta = await this.ordenesApi.updateById(id, obj);

      // sacar id

      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const respuesta = await this.ordenesApi.deleteById(id);
      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { OrdenesController };
