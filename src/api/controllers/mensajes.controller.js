//const MensajeDto = require("../../models/DTOs/productos.dto");
const { MensajesApi } = require("../../services/mensajes/mensajes.service");

class MensajesController {
  constructor() {
    this.mensajesApi = new MensajesApi();
  }

  getTimestamp = () => {
    return Date.now();
  };

  getAll = async (req, res) => {
    try {
      const datos = await this.mensajesApi.getAll();
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = await this.mensajesApi.getById(id);
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  save = async (req, res) => {
    try {
      const { email, tipo, fyh, cuerpomensaje } = req.body;

      //  const mensajeDto = new MensajeDto(nombre, descripcion, codigo, foto, precio, stock)

      const obj = {
        email,
        tipo,
        fyh,
        cuerpomensaje,
      };

      const respuesta = await this.mensajesApi.save(obj);

      // sacar id

      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const obj = req.body;

      const respuesta = await this.mensajesApi.updateById(id, obj);

      // sacar id

      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const respuesta = await this.mensajesApi.deleteById(id);
      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { MensajesController };
