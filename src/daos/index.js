let productosDao;
let carritoDao;

switch("mongodb"){
    case "archivo":
        const ProductosDaoArchivo = require("./ProductosDaoArchivo");
        const CarritoDaoArchivo = require("./CarritoDaoArchivo");
        productosDao = new ProductosDaoArchivo();
        carritoDao = new CarritoDaoArchivo();
        break;
    case "mongodb":
        const ProductosDaoMongoDB = require("./ProductosDaoMongoDB");
        const CarritoDaoMongoDB = require("./CarritoDaoMongoDB");
        productosDao = new ProductosDaoMongoDB();
        carritoDao = new CarritoDaoMongoDB();
        break;
    case "firebase":
        const ProductosDaoFirebase  = require("./ProductosDaoFirebase");
        const CarritoDaoFirebase  = require("./CarritoDaoFirebase");
        productosDao = new ProductosDaoFirebase();
        carritoDao = new CarritoDaoFirebase();
        break;
    case "mariadb":
        const ProductosDaoMariaDB = require("./ProductosDaoMariaDB");
        const CarritoDaoMariaDB = require("./CarritoDaoMariaDB");
        productosDao = new ProductosDaoMariaDB();
        carritoDao = new CarritoDaoMariaDB();
        break;        
    default:
        break;

}

module.exports = { productosDao, carritoDao }