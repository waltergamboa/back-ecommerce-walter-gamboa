const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    max: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    max: 50,
  },
  direccion: {
    type: String,
    require: true,
    trim: true,
    max: 150,
  },
  telefono: {
    type: String,
    require: true,
    trim: true,
    max: 50,
  },
  admin: {
    type: Boolean,
    default: false
}
});

const Usuarios = mongoose.model("Usuarios", UserSchema);

module.exports = {
  Usuarios,
};
