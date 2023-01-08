const ConnectMongoDb = require("../../connections/mongodb.connection");
let instance = null;

class MongoDBContainer {
  constructor(coleccion, esquema) {
    this.coleccion = coleccion;
    this.esquema = esquema;
    this.model = esquema;
    ConnectMongoDb.getInstance();
  }

  static getInstance(colecion, esquema) {
    if (!instance) {
      instance = new CarritosDaoMongoDB(colecion, esquema);
    }

    return instance;
  }

  async getAll() {
    try {
      let documents = await this.model.find();
      return documents;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      let document = await this.model.findById(id);
      return document;
    } catch (error) {
      return error;
    }
  }

  async save(document) {
    try {
      let documents = await this.model(document).save();
      return documents;
      return null;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, document) {
    try {
      let documents = await this.model.findByIdAndUpdate(id, document);
      return documents;
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      let documents = await this.model.findByIdAndDelete(id);
      return documents;
    } catch (error) {
      return error;
    }
  }
}

module.exports = MongoDBContainer;
