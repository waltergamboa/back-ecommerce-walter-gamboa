const MongoDBContainer = require("../../Containers/mongodb.container");

const mongoose = require("mongoose");
const ConnectMongoDb = require("../../../connections/mongodb.connection")

let instance = null;

class ProductosDaoMongoDB extends MongoDBContainer{
    constructor(coleccion, esquema){
        super(coleccion, esquema)
//        this.coleccion = coleccion;
  //      this.esquema = esquema;
  //      this.model = esquema; // mongoose.model(this.coleccion, this.esquema);
        //this.connectDB();
    //    ConnectMongoDb.getInstance();


    }

    static getInstance(colecion, esquema){
        if(!instance){
            instance = new ProductosDaoMongoDB(colecion, esquema);
        }

        return instance;
    }

    async getByCategory(category){
        try {
            let documents = await this.model.find({categoria: category});
            return documents;
        } catch (error) {
            console.log("Error al buscar los datos", error);
            return [];
        } 
    }

}

module.exports = ProductosDaoMongoDB;
