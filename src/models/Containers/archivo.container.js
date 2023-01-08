const fs = require("fs");

class ArchivoContainer {
  constructor(ubicacion) {
    this.ubicacion = ubicacion;
    this.proximoId = 1;
  }

  async stringToObj() {
    try {
      let dataArch = await fs.promises
        .readFile(this.ubicacion, "utf-8")
        .then((data) => data);
      let dataArchParse = JSON.parse(dataArch);

      if (dataArchParse.length) {
        let proximoId = dataArchParse[dataArchParse.length - 1].id + 1;

        this.proximoId = proximoId;
      } else {
        this.proximoId = 1;
      }

      return dataArchParse;
    } catch (error) {
      return error;
    }
  }

  async save(obj) {
    try {
      let dataArchParse = await this.stringToObj().then((data) => data);
      if (dataArchParse.length) {
        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify(
            [...dataArchParse, { ...obj, id: this.proximoId }],
            null,
            2
          )
        );
      } else {
        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify([{ ...obj, id: this.proximoId }], null, 2)
        );
      }
      return this.proximoId;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      let dataArchParse = await this.stringToObj().then((data) => data);

      let producto = dataArchParse.find(
        (producto) => producto.id === Number(id)
      );
      return producto;
    } catch (error) {
      return error;
    }
  }

  async getAll() {
    try {
      let dataArchParse = await this.stringToObj().then((data) => data);

      if (dataArchParse.length) {
        return dataArchParse;
      } else {
        console.log("No hay productos");
      }
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      let dataArchParse = await this.stringToObj().then((data) => data);

      let producto = dataArchParse.find(
        (producto) => parseInt(producto.id) === parseInt(id)
      );
      if (producto) {
        const dataArchParseFiltrado = dataArchParse.filter(
          (producto) => parseInt(producto.id) !== parseInt(id)
        );
        await fs.promises.writeFile(
          this.ubicacion,
          JSON.stringify(dataArchParseFiltrado, null, 2)
        );
        return id;
      } else {
        return null;
      }
    } catch (error) {
      return error;
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(
        this.ubicacion,
        JSON.stringify([], null, 2),
        "utf-8"
      );
      return true;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, obj) {
    try {
      let dataArchParse = await this.stringToObj().then((data) => data);

      let item = dataArchParse.find((a) => parseInt(a.id) === parseInt(id));
      item = obj;

      const indice = dataArchParse.findIndex(
        (i) => parseInt(i.id) === parseInt(id)
      );
      dataArchParse[indice] = { ...item, id: id };

      await fs.promises.writeFile(
        this.ubicacion,
        JSON.stringify(dataArchParse, null, 2),
        "utf-8"
      );
      return id;
    } catch (error) {
      return error;
    }
  }

  async cantidadItems() {
    try {
      const productos = await this.getAll();
      return productos.length;
    } catch (error) {
      return error;
    }
  }
}

module.exports = ArchivoContainer;
