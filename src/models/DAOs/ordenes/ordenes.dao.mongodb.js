const MongoDBContainer = require("../../Containers/mongodb.container");
const { genericoDTO } = require("../../DTOs/generico.dto");
let instance = null;

class OrdenesDaoMongoDB extends MongoDBContainer {
  constructor(coleccion, esquema) {
    super(coleccion, esquema);
  }

  static getInstance(colecion, esquema) {
    if (!instance) {
      instance = new OrdenesDaoMongoDB(colecion, esquema);
    }

    return instance;
  }

  async getLastOrder() {
    try {
      let ultimo = await this.model.find().sort({ orden: -1 }).limit(1);
      if (ultimo.length > 0) {
        return (parseInt(ultimo[0].orden) + 1);
      } else {
        return 1;
      }
    } catch (error) {
      console.log("Error al buscar los datos", error);
      return null;
    }
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

module.exports = OrdenesDaoMongoDB;
