const MongoDBContainer = require("../../Containers/mongodb.container");

const mongoose = require("mongoose");
const ConnectMongoDb = require("../../../connections/mongodb.connection")

let instance = null;

class MensajesDaoMongoDB extends MongoDBContainer{
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
            instance = new MensajesDaoMongoDB(colecion, esquema);
        }

        return instance;
    }

}

module.exports = MensajesDaoMongoDB;
