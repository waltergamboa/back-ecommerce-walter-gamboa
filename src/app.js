/* ------------------------------- declaraciones ------------------------------ */
// express
const express = require("express");
const config = require("./config/config");

// Rutas
const { UsuariosRouter } = require("./api/routes/usuarios.route");
const { MensajesRouter } = require("./api/routes/mensajes.route");
const { ProductosRouter } = require("./api/routes/productos.route");
const { CarritosRouter } = require("./api/routes/carritos.route");
const { OrdenesRouter } = require("./api/routes/ordenes.route");
const { ChatRouter } = require("./api/routes/chat.route");
const { AccesoRouter } = require("./api/routes/acceso.route");
const { ConfiguracionRouter } = require("./api/routes/configuracion.route");
const { ArchivosRouter } = require("./api/routes/archivos.route");
const routerUploads = require("./api/routes/upload.route");

// session
const session = require("express-session");

// mongo
const MongoStore = require("connect-mongo");

// passport
const { passport } = require("./middlewares/passport/passport.middleware");

// configuracion
const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/* ------------------------------- inicializar ------------------------------ */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/public"));
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: true,
    cookie: {
      maxAge: Number(config.COOKIE_MAX_AGE),
      expires: Number(config.COOKIE_EXPIRES),
    },
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: config.MONGO_DB,
      mongoOptions: mongoConfig,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", "./public/views");

// Inicializar Rutas
const accesoRouter = new AccesoRouter();
const usuariosRouter = new UsuariosRouter();
const mensajesRouter = new MensajesRouter();
const productosRouter = new ProductosRouter();
const carritosRouter = new CarritosRouter();
const ordenesRouter = new OrdenesRouter();
const chatRouter = new ChatRouter();
const configuracionRouter = new ConfiguracionRouter();
const archivosRouter = new ArchivosRouter();

// Asignar Rutas
app.use("/", accesoRouter.init());
app.use("/usuarios", usuariosRouter.init());
app.use("/mensajes", mensajesRouter.init());
app.use("/productos", productosRouter.init());
app.use("/carrito", carritosRouter.init());
app.use("/ordenes", ordenesRouter.init());
app.use("/chat", chatRouter.init());
app.use("/config", configuracionRouter.init());
app.use("/archivos", archivosRouter.init());
app.use("/uploads", routerUploads);

module.exports = app;
