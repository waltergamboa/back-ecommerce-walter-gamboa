const express = require("express");
//const { Router } = express;
//require("dotenv").config({ path:"./src/config/.env"});

const config = require("./config/config")


const jwt = require("jsonwebtoken");
const PRIVATE_KEY = "mysecret";


const { UsuariosRouter } = require('./api/routes/usuarios.route');
const usuariosRouter = new UsuariosRouter();

const { MensajesRouter } = require('./api/routes/mensajes.route');
const mensajesRouter = new MensajesRouter();



const { ProductosRouter } = require('./api/routes/productos.route');
const productosRouter = new ProductosRouter();

//const routerCarrito = require('./routes/carrito.route');

const { CarritosRouter } = require('./api/routes/carritos.route');
const carritosRouter = new CarritosRouter();

const { OrdenesRouter } = require('./api/routes/ordenes.route');
const ordenesRouter = new OrdenesRouter();


const routerUploads = require('./api/routes/upload.route');


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
  useUnifiedTopology: true
}



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



//app.use(cookieParser(process.env.SESSION_SECRET));

// mensajes
const { mailNuevoRegistro } = require("./helpers/mensajes/mail.mensaje");
const { smsMensaje } = require("./helpers/mensajes/sms.mensaje");
const { whatsappMensaje } = require("./helpers/mensajes/whatsapp.mensaje");



const ConnectMongoDb = require("../src/connections/mongodb.connection")
ConnectMongoDb.getInstance();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  cookie: {
 //   maxAge: 1000 * 60 * 10,
 //   expires: 60000
  },
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: config.MONGO_DB, mongoOptions: mongoConfig})
})) 

app.use(passport.initialize())
app.use(passport.session())




// jwt
function generarToken(user){
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: "24h" });
  return token;
}

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if(!token){
      res.status(401).json({ error: "Usuario no autorizado" });
  }

  jwt.verify(token, PRIVATE_KEY, (err, decode)=>{
      if(err){
          res.status(491).json({ error: "Usuario no autorizado" })
      }
      req.user = decode.data;
      next();
  })

  next();
  
}





// session


// utils
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
}

const createHash = (password)=>{
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

const checkAuth = (req, res, next)=>{
  if (req.isAuthenticated()){
      next()
  }else{
      res.redirect("/login")
  }
}



// midelware
passport.use("login", new LocalStrategy(
  async (username, password, done)=>{
     
     let user = await Usuarios.findOne({name: username});

      if (!user){
          return done(null, false, {message: "User not found"});
      }

        if (!isValidPassword(user, password)){
            return done(null, false, {message: "Password incorrect"});
        }


      done(null, user)
  }
))

passport.use("signup", new LocalStrategy({
  passReqToCallback: true
}, async (req, username, password, done)=>{
  
  const registro = await Usuarios.findOne({name: username});
  const { name, email } = req.body;
  if(registro){
      return done(null, false, {message: "Usuario ya existe"})
  }

   let usuario = new Usuarios({
         name: username,
         email: email,
         password: createHash(password)
     });
     await usuario.save();




     ;(async ()=>{
        try {
            const res = await mailNuevoRegistro(username, email);
         } catch (error) {
            loggerError.error("Error en el envio de un mail: %s", error)
         }
    })();
    
    
  return done(null, usuario.id);

}))


passport.serializeUser((user, done) => {
  done(null, user.id);
})


passport.deserializeUser(async (id, done) => {
  

let  user = await Usuarios.findById(id);
  done(null, user);
})


// modularizar chat
app.get("/chat", checkAuth, (req, res)=>{
  res.render("pages/chat", {nombre: req.user.name, email: req.user.email, mismensajes: "false", admin: "true"});
})


app.get("/chat/:email", checkAuth, (req, res)=>{
  const { email } = req.params;
  res.render("pages/chat", {nombre: req.user.name, email: req.user.email, mismensajes: email, admin: "true"});
})

// check
app.get("/", checkAuth, (req, res)=>{
  res.redirect("/productos");
 // res.render("pages/ingresar", {nombre: req.user.name});
})


// login
app.get('/login', (req, res) => {
  res.render('login')
})

app.post("/login", passport.authenticate("login", {
  successRedirect: "/",
  failureRedirect: "/error_login"
}),(req, res)=>{
  const { username, password } = req.body;
  const { user } = req.user;
  res.render("pages/ingresar", {nombre: req.user.name});
})


// signup
app.get('/signup', (req, res) => {
  res.render('signup')
})



app.post("/signup", passport.authorize("signup",{
  successRedirect: "/login",
  failureRedirect: "/error_signup"
}), (req, res)=>{
  res.render("login");
})


// logout
app.post('/logout', (req, res, next) => {
  req.logout((err) => {
      if (err) { return next(err) }
      res.redirect('/login')
  })
})

// error
app.get('/error_login', (req, res) => {
  res.render('error_login')
})

app.get('/error_signup', (req, res) => {
  res.render('error_registrar')
})



app.use("/usuarios", usuariosRouter.init());
app.use("/mensajes", mensajesRouter.init());
app.use("/productos", productosRouter.init());
app.use("/carrito", carritosRouter.init());
app.use("/ordenes", ordenesRouter.init());
app.use("/uploads", routerUploads);



// // multer
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, _file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         // console.dir(cb)
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })

// const upload = multer({ storage })

// ///////////////////////////// routes ///////////////////////////////

// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//     const { file } = req
//     // console.log(file)
//     // console.log(Date.now())
//     if (!file) {
//         const error =   new Error('Por favor suba un archivo')
//         error.httpStatusCode = 400  
//         return next(error)
//     }
//     res.send(file)
// })
// /// Muchos archivos
// app.post('/uploadfiles', upload.array('myFiles'), (req, res, next)=>{
//     const { files } = req
//     // console.log(files)
//     if (!files || files.length === 0) {
//         const error =   new Error('Por favor suba un archivo como mínimo')
//         error.httpStatusCode = 400  
//         return next(error)
//     }
//     res.send(files)
// } )






// app.use("*", (req, res) => {
//   const { method, baseUrl } = req;
//   const mensajeError = { error : -2, descripcion: `Ruta ${baseUrl} Método ${method} no implementada` };
//   loggerWarn.warn("Ruta %s %s no implementada", baseUrl, method);
//   res.send(mensajeError);
// })









module.exports = app;