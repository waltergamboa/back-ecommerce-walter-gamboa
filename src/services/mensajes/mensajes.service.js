const { mensajesDao: mensajesApi } = require("../../models/daos/mensajes");

class MensajesApi {
  constructor() {}

  async getAll() {
    try {
      const datos = await mensajesApi.getAll();
      return datos;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const datos = await mensajesApi.getById(id);
      return datos;
    } catch (error) {
      return error;
    }
  }

  async save(obj) {
    try {
      const respuesta = await mensajesApi.save(obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, obj) {
    try {
      const respuesta = await mensajesApi.updateById(id, obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const respuesta = await mensajesApi.deleteById(id);
      return respuesta;
    } catch (error) {
      return error;
    }
  }
}

module.exports = { MensajesApi };
