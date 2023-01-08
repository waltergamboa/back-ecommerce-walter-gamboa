const { carritosDao: carritosApi } = require("../../models/daos/carritos");

class CarritosApi {
  constructor() {}

  async getAll() {
    try {
      const datos = await carritosApi.getAll();
      return datos;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const datos = await carritosApi.getById(id);
      return datos;
    } catch (error) {
      return error;
    }
  }

  async save(obj) {
    try {
      const respuesta = await carritosApi.save(obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, obj) {
    try {
      const respuesta = await carritosApi.updateById(id, obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const respuesta = await carritosApi.deleteById(id);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async deleteItem(id, idProduct) {
    try {
      const respuesta = await carritosApi.deleteItem(id, idProduct);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async updateItem(id, idProduct, document) {
    try {
      const respuesta = await carritosApi.updateItem(id, idProduct, document);
      return respuesta;
    } catch (error) {
      return error;
    }
  }
}

module.exports = { CarritosApi };
