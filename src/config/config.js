require("dotenv").config({ path:"./src/config/.env"});
const dotenv = require("dotenv");
const path = require("path")

dotenv.config({ 
    path: path.resolve(process.cwd() + "/src/config", process.env.NODE_ENV + ".env") 
})

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || 8080,
    SESSION_SECRET: process.env.SESSION_SECRET || "secret",
    MONGO_DB: process.env.MONGO_DB,
    MAIL_ADMIN: process.env.MAIL_ADMIN || "waltergamboa@gmail.com",
    MAIL_PASS: process.env.MAIL_PASS,            
    ACCOUNTSID: process.env.ACCOUNTSID,
    AUTHTOKEN: process.env.AUTHTOKEN,
    TIPO_PERSISTENCIA: process.env.TIPO_PERSISTENCIA || 'archivo'
}
