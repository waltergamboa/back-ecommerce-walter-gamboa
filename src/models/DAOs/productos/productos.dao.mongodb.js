const MongoDBContainer = require("../../Containers/mongodb.container");
const { genericoDTO } = require("../../DTOs/generico.dto");
let instance = null;

class ProductosDaoMongoDB extends MongoDBContainer {
  constructor(coleccion, esquema) {
    super(coleccion, esquema);
  }

  static getInstance(colecion, esquema) {
    if (!instance) {
      instance = new ProductosDaoMongoDB(colecion, esquema);
    }

    return instance;
  }

  async getByCategory(category) {
    try {
      let documents = await this.model.find({ categoria: category });
      return documents;
    } catch (error) {
      console.log("Error al buscar los datos", error);
      return [];
    }
  }

  async save(document) {
    try {
      let documentNew = genericoDTO(document);
      let documents = await super.save(documentNew);
      return documents;
    } catch (error) {
      return null;
    }
  }
}

module.exports = ProductosDaoMongoDB;
