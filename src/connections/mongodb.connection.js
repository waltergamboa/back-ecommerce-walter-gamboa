const mongoose = require("mongoose");
const config = require("../config/config");
const { logger, loggerWarn, loggerError } = require("../helpers/logger/logger");

let instance = null;

class ConnectMongoDb {
    constructor(){
        ;( async () => {   const url = config.MONGO_DB;
            await mongoose.connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            logger.info("Se a la base %s", "mongodb");
        })();
    }

    static getInstance(){
        if(!instance){
            instance = new ConnectMongoDb();
        }

        return instance;
    }
}


module.exports = ConnectMongoDb;