// passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
// modelo usuarios
const { Usuarios } = require("../../models/usuarios.model");
// mensajes
const { mailNuevoRegistro } = require("../../helpers/mensajes/mail.mensaje");

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
    res.redirect("login");
  }
};

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
        telefono: telefono,
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

module.exports = { passport, checkAuth };
