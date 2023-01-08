const { ordenesDao: ordenesApi } = require("../../models/daos/ordenes");
// mensajes
const { mailNuevaOrden } = require("../../helpers/mensajes/mail.mensaje");

class OrdenesApi {
  constructor() {}

  async getAll() {
    try {
      const datos = await ordenesApi.getAll();
      return datos;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const datos = await ordenesApi.getById(id);
      return datos;
    } catch (error) {
      return error;
    }
  }

  async save(obj) {
    try {
      const ultimaOrden = await ordenesApi.getLastOrder();
      console.log(ultimaOrden)
      obj["orden"] = ultimaOrden;
      const respuesta = await ordenesApi.save(obj);
      if (respuesta) {
        (async () => {
          try {
            const res = await mailNuevaOrden(
              "username",
              "waltergamboa@gmail.com",
              obj
            );
          } catch (error) {
            loggerError.error("Error en el envio de un mail: %s", error);
          }
        })();
      }
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, obj) {
    try {
      const respuesta = await ordenesApi.updateById(id, obj);
      return respuesta;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const respuesta = await ordenesApi.deleteById(id);
      return respuesta;
    } catch (error) {
      return error;
    }
  }
}

module.exports = { OrdenesApi };
