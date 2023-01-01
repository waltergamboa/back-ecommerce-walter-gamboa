const mongoose = require("mongoose");

let instance = null;

class ConnectMongoDb {
    constructor(){
        ;( async () => {   const url = process.env.MONGO_DB;
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            console.log("aca")
            console.log("MongoDB conectada")})();
    }

    static getInstance(){
        if(!instance){
            instance = new ConnectMongoDb();
        }

        return instance;
    }
}


module.exports = ConnectMongoDb;