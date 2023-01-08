const mongoose = require("mongoose");

const MensajesSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    max: 50,
  },
  tipo: {
    type: String,
    require: true,
    trim: true,
    max: 20,
  },
  fyh: {
    type: String,
    require: true,
    trim: true,
    max: 20,
  },
  cuerpomensaje: {
    type: String,
    require: true,
    trim: true,
    max: 150,
  },
});

const Mensajes = mongoose.model("Mensajes", MensajesSchema);

module.exports = {
  Mensajes,
};
