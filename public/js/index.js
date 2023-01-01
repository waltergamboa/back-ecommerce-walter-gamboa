const server = io().connect();
const admin = document.querySelector("#admin").value;

const cambioMail = (evt)=>{
    document.querySelector("#mail").value = evt.value;
}


const renderMensajes = (chat) => {

  const divMensajes = document.querySelector("#mensajes");
  let html = `<ul>`;

  let html2 = `<table class="table table-light">
                <thead>
                <tr>
                <th scope="col">email</th>
                <th scope="col">fyh</th>
                <th scope="col">mensaje</th>
                ${(admin == "true") ? `<th scope="col">Responder</th>` : null}
                </tr>
                </thead>
                <tbody>`;

  chat.map((item) => {
    html =
      html +
      `<li><span class="mensajeMail">${item.email}</span><span class="mensajeFechaHora">[${item.fyh}]:</span><span class="mensajeTexto">${item.cuerpomensaje}</span></li>`;

    html2 = html2 + `<tr>`;
    html2 = html2 + `<td class="mensajeMail">${item.email}</td>`;
    html2 = html2 + `<td class="mensajeFechaHora">${item.fyh}</td>`;
    html2 = html2 + `<td class=${(item.tipo == "usuarios") ? "mensajeTexto" : ""}>${item.cuerpomensaje}</td>`;
    if (admin == "true")
    html2 = html2 + `<td><input type="radio" id='optradio' name="optradio" value=${item.email} onClick=cambioMail(this)></td>`;
    
    html2 = html2 + `</tr>`;
  });

  html = html + `</ul>`;

  html2 = html2 + `</tbody></table>`;

  divMensajes.innerHTML = html2;
};

const agregarChat = (evt) => {
  try {
    const mail = document.querySelector("#mail").value;
    const mensaje = document.querySelector("#cuerpomensaje").value;

   // const optradio = document.querySelector("#optradio").selected;


  //  console.log(optradio)

    const tipo = (admin == "true") ? "sistema" : "usuarios";

    const chat = { mail, tipo, mensaje };
 
    server.emit("chat-nuevo", chat);

    document.querySelector("#cuerpomensaje").value = "";
    document.querySelector("#cuerpomensaje").focus();
    return false;
  } catch (error) {
    console.log(error);
  }
};

const mismensajes = document.querySelector("#mismensajes").value;
const mail = String(document.querySelector("#mail").value);

server.on("mensaje-chat", (obj) => {
  let chat = [];
  chat = obj;
  if (mismensajes != "false") {
    if (String(mail) != String(mismensajes)) {
      console.log("solo puedes filtrar tus mensajes");
      chat = [];
    } else {
      chat = [];
      obj.map((item) => {
        if (String(item.email) == mail) {
          chat.push(item);
        }
      });
    }
  }

  renderMensajes(chat);
});
