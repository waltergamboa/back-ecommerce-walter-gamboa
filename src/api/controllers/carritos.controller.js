const { CarritosApi } = require("../../services/carritos/carritos.service");

class CarritosController {
  constructor() {
    this.carritosApi = new CarritosApi();
  }

  getTimestamp = () => {
    return Date.now();
  };

  getAll = async (req, res) => {
    try {
      const datos = await this.carritosApi.getAll();
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = await this.carritosApi.getById(id);
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  save = async (req, res) => {
    try {
      const { email, direccionentrega, items } = req.body;

      const obj = {
        email,
        direccionentrega,
        items: items,
      };

      const respuesta = await this.carritosApi.save(obj);

      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;

      const respuesta = await this.carritosApi.updateById(id, obj);

      // sacar id

      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const respuesta = await this.carritosApi.deleteById(id);
      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  deleteItem = async (req, res) => {
    try {
      const { id, idProduct } = req.params;
      const respuesta = await this.carritosApi.deleteItem(id, idProduct);
      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  updateItem = async (req, res) => {
    try {
      const { id, idProduct } = req.params;
      const { items } = req.body;
      const respuesta = await this.carritosApi.updateItem(id, idProduct, items);
      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { CarritosController };
