/* ------------------------------- constantes ------------------------------- */



const express = require("express");
const { Router } = express;
const dotenv = require('dotenv');

const routerProductos = require('./routes/producto.routes');
const routerCarrito = require('./routes/carrito.routes');

const { logger, loggerWarn, loggerError } = require("./logger.js");

// cokkie parser
const cookieParser = require("cookie-parser");
// session
const session = require("express-session");
// mongo
const MongoStore = require("connect-mongo");
// auth
const authMiddleware = require("./src/middlewares/auth/auth.middleware");

const mongoConfig = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
}

dotenv.config();

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


const bcrypt = require("bcrypt");

const Usuarios = require("./models/usuarios.model");
const connectDB = require("./mongoDB/connection");

//const documents = await productosApi.save(a).then((data)=>data);


// mail - whatsapp
const nodemailer = require("nodemailer");

const twilio = require('twilio');
const { TrustProductsChannelEndpointAssignmentInstance } = require("twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment");


const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = twilio(accountSid, authToken)

const options = {
  body: 'Hola soy un WSP desde Node.js!',
  mediaUrl: [ 'https://image.shutterstock.com/image-vector/green-button-phone-bubble-chat-260nw-1136309198.jpg' ],
  from: 'whatsapp:+14155238886',
  to: 'whatsapp:+5491163071967'
}

// test whats app
// ;(async ()=>{
//   try {
//       const message = await client.messages.create(options);
//       console.log(message)
//    } catch (error) {
//       console.log(error)
//    }
// })();


/* ------------------------------- inicializar ------------------------------ */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));



const admin = true;

app.set("view engine", "ejs");
app.set("views", "./public/views");



//app.use(cookieParser(process.env.SESSION_SECRET));


connectDB();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  cookie: {
    maxAge: 1000 * 60 * 10,
    expires: 60000
  },
  saveUninitialized: true,
  store: MongoStore.create({mongoUrl: process.env.MONGO_DB, mongoOptions: mongoConfig})
})) 

app.use(passport.initialize())
app.use(passport.session())


// session


const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
      user: process.env.MAIL_ADMIN,
      pass: 'dygskodrlluhlmhw'
  }
});

const mailOptions = {
  from: 'Backend Walter Gamboa',
  to: process.env.MAIL_ADMIN,
  subject: 'Nuevo Registro',
  html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
}




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
          const info = await transporter.sendMail({
  from: 'Backend Walter Gamboa',
  to: process.env.MAIL_ADMIN,
  subject: 'Nuevo Registro',
  html: `<h1 style="color: blue;">Se registro el usuario: ${username} </br></h1><h3>con el mail ${email}.</h3></br><span>Saludos...</span>`,
})
          console.log(info)
       } catch (error) {
          console.log(error)
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


// check
app.get("/", checkAuth, (req, res)=>{
  res.render("pages/index", {nombre: req.user.name});
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

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.use("*", (req, res) => {
  const { method, baseUrl } = req;
  const mensajeError = { error : -2, descripcion: `Ruta ${baseUrl} Método ${method} no implementada` };
  loggerWarn.warn("Ruta %s %s no implementada", baseUrl, method);
  res.send(mensajeError);
})

/* -------------------------------------------------------------------------- */
/*                                   server                                   */
/* -------------------------------------------------------------------------- */
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  logger.info("Servidor express escuchando en el puerto %s", PORT);
});
server.on("error", (error) => loggerError.error("Error en servidor: %s", error));
