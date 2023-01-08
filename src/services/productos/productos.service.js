const { productosDao: productosApi } = require("../../models/daos/productos");

class ProductosApi {
  constructor() {}

  async getAll() {
    try {
      const datos = await productosApi.getAll();
      return datos;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const datos = await productosApi.getById(id);
      return datos;
    } catch (error) {
      return error;
    }
  }

  async getByCategory(category) {
    try {
      const datos = await productosApi.getByCategory(category);
      return datos;
    } catch (error) {
      return error;
    }
  }

  async save(obj) {
    try {
      const respuesta = await productosApi.save(obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, obj) {
    try {
      const respuesta = await productosApi.updateById(id, obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const respuesta = await productosApi.deleteById(id);
      return respuesta;
    } catch (error) {
      return error;
    }
  }
}

module.exports = { ProductosApi };
