const MongoDBContainer = require("../../Containers/mongodb.container");
const { genericoDTO } = require("../../DTOs/generico.dto");
let instance = null;

class UsuariosDaoMongoDB extends MongoDBContainer {
  constructor(coleccion, esquema) {
    super(coleccion, esquema);
  }

  static getInstance(colecion, esquema) {
    if (!instance) {
      instance = new UsuariosDaoMongoDB(colecion, esquema);
    }

    return instance;
  }

  async save(document) {
    try {
      let documentNew = genericoDTO(document);
      let documents = await super.save(documentNew);
      return documents;
    } catch (error) {
      return error;
    }
  }
}

module.exports = UsuariosDaoMongoDB;
