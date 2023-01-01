const mongoose = require("mongoose");

//const mongodb = require("mongodb");
//const { MongoClient, ObjectId } = mongodb;

const {MongoClient, ObjectId} = require('mongodb');

class ProductosDaoMongoDB_{
    constructor(coleccion, esquema){
        this.coleccion = coleccion;
        this.esquema = esquema;
        this.model = esquema; // mongoose.model(this.coleccion, this.esquema);

        const database = "test";
        const collection = "productos";
       // this.connectDB();
       ;(async () => {
        console.log('Connecting to MongoDB...')

        const uri = "mongodb+srv://wgamboa:wgamboa1@cluster0.jqgfgcs.mongodb.net/?retryWrites=true&w=majority"
        const client = new MongoClient(uri);

        this.connection = await client.connect();

        // this.connection = await MongoClient.connect('mongodb+srv://wgamboa:wgamboa1@cluster0.jqgfgcs.mongodb.net/?retryWrites=true&w=majority', {
        //     useNewUrlParse: true,
        //     useUnifiedTopology: true
        // })

        const db = this.connection.db(database)
        this.collection = db.collection(collection)
        console.log(db)
        console.log(this.collection)
        console.log('Connected to MongoDB!')
    })() 
    }

    async connectDB(){
        try {
            const url = "mongodb+srv://wgamboa:wgamboa1@cluster0.jqgfgcs.mongodb.net/?retryWrites=true&w=majority"
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log("MongoDB conectada")
        } catch (error) {
            console.log(error);
        }
    }

    getAll = async ()=>{
        try {
            let documents = await this.collection.find({}).toArray();
            return documents;
        } catch (error) {
            console.log("Error al buscar los datos", error);
            return [];
        } 
    }

    async getById(id){
        try {
            let document = await this.model.findById(id);
            return document;
        } catch (error) {
            console.log("Error al buscar los datos", error);
            return null;
        } 
    }

    async save(document){
        try {
            let documents = await this.model(document).save();
            return documents;
        } catch (error) {
            console.log("Error al insertar los datos", error);
            return null;
        } 
    }

    async updateById(id, document){
        try {
            let documents = await this.model.findByIdAndUpdate(id, document);
            return documents;
        } catch (error) {
            console.log("Error al insertar los datos", error);
            return null;
        } 
    }

    async deleteById(id){
        try {
            let documents = await this.model.findByIdAndDelete(id);
            return documents;
        } catch (error) {
            console.log("Error al buscar los datos", error);
            return null;
        } 
    }    
}

module.exports = ProductosDaoMongoDB_;

// const ContenedorMongoDB = require("../contenedores/ContenedorMongoDB");

// class ProductosDaoMongoDB extends ContenedorMongoDB {
//     constructor(){
//         super("productos", {
//           timestamp: {
//             type: Number,
//             require: true,
//           },
//           nombre: {
//             type: String,
//             require: true,
//             trim: true,
//             max: 50,
//           },
//           descripcion: {
//             type: String,
//             require: true,
//             trim: true,
//             max: 150,
//           },
//           codigo: {
//             type: String,
//             require: true,
//             trim: true,
//             max: 10,
//           },
//           foto: {
//             type: String,
//             require: true,
//             trim: true,
//             max: 250,
//           },
//           precio: {
//             type: Number,
//             require: true,
//           },
//           stock: {
//             type: Number,
//             require: true,
//           },
//         });
//     }
// }

// module.exports = ProductosDaoMongoDB;