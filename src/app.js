const express = require("express");
const config = require("./config/config");

const { UsuariosRouter } = require("./api/routes/usuarios.route");
const usuariosRouter = new UsuariosRouter();

const { MensajesRouter } = require("./api/routes/mensajes.route");
const mensajesRouter = new MensajesRouter();

const { ProductosRouter } = require("./api/routes/productos.route");
const productosRouter = new ProductosRouter();

const { CarritosRouter } = require("./api/routes/carritos.route");
const carritosRouter = new CarritosRouter();

const { OrdenesRouter } = require("./api/routes/ordenes.route");
const ordenesRouter = new OrdenesRouter();

const routerUploads = require("./api/routes/upload.route");

// cokkie parser
const cookieParser = require("cookie-parser");
// session
const session = require("express-session");
// mongo
const MongoStore = require("connect-mongo");
// auth
const authMiddleware = require("./middlewares/auth/auth.middleware");

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const bcrypt = require("bcrypt");

const { Usuarios } = require("../src/models/usuarios.model");

const { logger, loggerWarn, loggerError } = require("./helpers/logger/logger");

/* ------------------------------- inicializar ------------------------------ */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/public"));

const admin = true;

app.set("view engine", "ejs");
app.set("views", "./public/views");

// mensajes
const { mailNuevoRegistro } = require("./helpers/mensajes/mail.mensaje");
const { smsMensaje } = require("./helpers/mensajes/sms.mensaje");
const { whatsappMensaje } = require("./helpers/mensajes/whatsapp.mensaje");

const ConnectMongoDb = require("../src/connections/mongodb.connection");
ConnectMongoDb.getInstance();

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

// utils
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

const checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
};

// midelware
passport.use(
  "login",
  new LocalStrategy(async (username, password, done) => {
    let user = await Usuarios.findOne({ email: username });
    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    if (!isValidPassword(user, password)) {
      return done(null, false, { message: "Password incorrect" });
    }

    done(null, user);
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      const { name, email, direccion, telefono } = req.body;
      const registro = await Usuarios.findOne({ email: email });

      if (registro) {
        return done(null, false, { message: "Usuario ya existe" });
      }

      let usuario = new Usuarios({
        name: username,
        email: email,
        password: createHash(password),
        direccion: direccion,
        telefono: telefono
      });
      await usuario.save();

      (async () => {
        try {
          const res = await mailNuevoRegistro(username, email);
        } catch (error) {
          loggerError.error("Error en el envio de un mail: %s", error);
        }
      })();

      return done(null, usuario.id);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user = await Usuarios.findById(id);
  done(null, user);
});

app.get("/chat", checkAuth, (req, res) => {
  res.render("pages/chat", {
    nombre: req.user.name,
    email: req.user.email,
    mismensajes: "false",
    admin: req.user.admin,
  });
});

app.get("/chat/:email", checkAuth, (req, res) => {
  const { email } = req.params;
  res.render("pages/chat", {
    nombre: req.user.name,
    email: req.user.email,
    mismensajes: email,
    admin: req.user.admin,
  });
});

app.get("/", checkAuth, (req, res) => {
  res.redirect("/productos");
});

// login
app.get("/login", (req, res) => {
  res.render("pages/login");
});

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "pages/error_login",
  }),
  (req, res) => {
    const { user } = req.user;
    res.render("pages/ingresar", { nombre: req.user.name });
  }
);

// signup
app.get("/signup", (req, res) => {
  res.render("pages/signup");
});

app.post(
  "/signup",
  passport.authorize("signup", {
    successRedirect: "pages/login",
    failureRedirect: "pages/error_signup",
  }),
  (req, res) => {
    res.render("pages/login");
  }
);

// logout
app.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

// error
app.get("/error_login", (req, res) => {
  res.render("pages/error_login");
});

app.get("/error_signup", (req, res) => {
  res.render("pages/error_registrar");
});

// config
app.get("/config", checkAuth, (req, res) => {
  const configuracionActual = [
    `NODE_ENV: ${config.NODE_ENV}`,
    `PORT: ${config.PORT}`,
    `SESSION_SECRET: ${config.SESSION_SECRET}`,
    `MONGO_DB: ${config.MONGO_DB}`,
    `MAIL_ADMIN: ${config.MAIL_ADMIN}`,
    `MAIL_PASS: ${config.MAIL_PASS}`,
    `ACCOUNTSID: ${config.ACCOUNTSID}`,
    `AUTHTOKEN: ${config.AUTHTOKEN}`,
    `TIPO_PERSISTENCIA: ${config.TIPO_PERSISTENCIA}`,
  ];

  res.render("pages/config", { configuracionActual, nombre: req.user.name });
});

app.get("/archivos", checkAuth, (req, res) => {
  res.render("pages/archivos", { nombre: req.user.name });
});

app.use("/usuarios", usuariosRouter.init());
app.use("/mensajes", mensajesRouter.init());
app.use("/productos", productosRouter.init());
app.use("/carrito", carritosRouter.init());
app.use("/ordenes", ordenesRouter.init());
app.use("/uploads", routerUploads);

module.exports = app;
