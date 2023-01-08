const { usuariosDao: usuariosApi } = require("../../models/daos/usuarios");

class UsuariosApi {
  constructor() {}

  async getAll() {
    try {
      const datos = await usuariosApi.getAll();
      return datos;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const datos = await usuariosApi.getById(id);
      return datos;
    } catch (error) {
      return error;
    }
  }

  async getByCategory(category) {
    try {
      const datos = await usuariosApi.getByCategory(category);
      return datos;
    } catch (error) {
      return error;
    }
  }

  async save(obj) {
    try {
      const respuesta = await usuariosApi.save(obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, obj) {
    try {
      const respuesta = await usuariosApi.updateById(id, obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const respuesta = await usuariosApi.deleteById(id);
      return respuesta;
    } catch (error) {
      return error;
    }
  }
}

module.exports = { UsuariosApi };
