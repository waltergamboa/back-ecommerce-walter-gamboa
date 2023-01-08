const { UsuariosApi } = require("../../services/usuarios/usuarios.service");

class UsuariosController {
  constructor() {
    this.usuariosApi = new UsuariosApi();
  }

  getTimestamp = () => {
    return Date.now();
  };

  getAll = async (req, res) => {
    try {
      const datos = await this.usuariosApi.getAll();
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = await this.usuariosApi.getById(id);
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  save = async (req, res) => {
    try {
      const { name, email, password } = req.body;

      //   const mensajeDto = new MensajeDto(nombre, descripcion, codigo, foto, precio, stock)

      const obj = {
        name,
        email,
        password,
      };

      const respuesta = await this.usuariosApi.save(obj);

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

      const respuesta = await this.usuariosApi.updateById(id, obj);

      // sacar id

      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const respuesta = await this.usuariosApi.deleteById(id);
      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { UsuariosController };
