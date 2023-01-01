const MongoDBContainer = require("../../Containers/mongodb.container");

let instance = null;

class OrdenesDaoMongoDB extends MongoDBContainer{
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
            instance = new OrdenesDaoMongoDB(colecion, esquema);
        }

        return instance;
    }

}


module.exports = OrdenesDaoMongoDB;

