/* ------------------------------- constantes ------------------------------- */
const { Server: ServerHttp } = require("http");
const { Server: ServerIo } = require("socket.io");

const config = require("./src/config/config")

const app = require("./src/app");



const HttpServer = new ServerHttp(app);
const io = new ServerIo(HttpServer);


const { MensajesApi } = require("./src/services/mensajes/mensajes.service");
const mensajesApi = new MensajesApi();

const getMessages = async ()=>{
  const mensajes = await mensajesApi.getAll();
  if (mensajes){
    return mensajes;
  }else{
    return [];
  }
}

const saveMessages = async (mail, tipo, mensaje)=>{
  const obj = {
    email: mail,
    fyh: generarFechaHora(),
    tipo: tipo,
    cuerpomensaje: mensaje
  }

  

  const retorno = await mensajesApi.save(obj);

  console.log(retorno)

  return retorno

}

const generarFechaHora = ()=>{
  const fecha = new Date();
  const fechaStr =
  ("00" +  fecha.getDate()).slice(-2) + "/" +
  ("00" + (fecha.getMonth() + 1)).slice(-2) + "/" +
  fecha.getFullYear() + " " +
  ("00" + fecha.getHours()).slice(-2) + ":" +
  ("00" + fecha.getMinutes()).slice(-2) + ":" +
  ("00" + fecha.getSeconds()).slice(-2);

  return fechaStr;
}


io.on("connection", async (socket) => {
//  socket.emit("mensaje-productos", getProducts());


  socket.emit("mensaje-chat", await getMessages().then((data)=>data));


  //socket.emit("mensaje-chat", await getMyMessages(user.email).then((data)=>data));

  // socket.on("producto-nuevo", async (producto)=>{
  //   const contenedor = new Contenedor("./src/persistencias/archivos/productos.txt");
  //   const { nombre, precio, imagen } = producto;
  //   const id = await contenedor.save({
  //     nombre,
  //     precio,
  //     imagen,
  //   });
  //   io.sockets.emit("mensaje-productos",  getProducts())
  // })

  socket.on("chat-nuevo", async (chat)=>{
    const { mail, tipo, mensaje } = chat;

    const id = saveMessages(mail, tipo, mensaje)
    io.sockets.emit("mensaje-chat", await getMessages().then((data)=>data));
  })
});


// chat

const { logger, loggerWarn, loggerError } = require("./src/helpers/logger/logger");


const formDate = (time) => {
  const date = new Date(time);
  return date.toLocaleDateString();
}

/* -------------------------------------------------------------------------- */
/*                                   server                                   */
/* -------------------------------------------------------------------------- */
//const PORT = process.env.PORT || 8080;

const server = HttpServer.listen(config.PORT, () => {
  logger.info("Servidor express escuchando en el puerto %s", config.PORT);
});

server.on("error", (error) => loggerError.error("Error en servidor: %s", error));
