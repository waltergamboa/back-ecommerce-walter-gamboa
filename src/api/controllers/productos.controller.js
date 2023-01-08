const { ProductosApi } = require("../../services/productos/productos.service");

class ProductosController {
  constructor() {
    this.productosApi = new ProductosApi();
  }

  getTimestamp = () => {
    return Date.now();
  };

  getAll = async (req, res) => {
    try {
      const datos = await this.productosApi.getAll();
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const datos = await this.productosApi.getById(id);
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  getByCategory = async (req, res) => {
    try {
      const { category } = req.params;
      const datos = await this.productosApi.getByCategory(category);
      res.json(datos);
    } catch (error) {
      res.json(error);
    }
  };

  save = async (req, res) => {
    try {
      const { descripcion, categoria, precio, imagen } = req.body;

      //   const mensajeDto = new MensajeDto(nombre, descripcion, codigo, foto, precio, stock)

      const obj = {
        timestamp: this.getTimestamp(),
        descripcion,
        categoria,
        precio: Number(precio),
        imagen,
      };

      const respuesta = await this.productosApi.save(obj);

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

      const respuesta = await this.productosApi.updateById(id, obj);

      // sacar id

      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };

  deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const respuesta = await this.productosApi.deleteById(id);
      res.json(respuesta);
    } catch (error) {
      res.json(error);
    }
  };
}

module.exports = { ProductosController };
