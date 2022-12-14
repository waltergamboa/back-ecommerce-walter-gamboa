const mongoose = require("mongoose");

const CarritosSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    max: 50,
  },
  fyh: {
    type: String,
    require: true,
    trim: true,
    max: 20,
  },
  direccionentrega: {
    type: String,
    require: true,
    trim: true,
    max: 150,
  },
  items: [
    {
      idproducto: {
        type: String,
        require: true,
      },
      descripcion: {
        type: String,
        require: true,
        trim: true,
        max: 50,
      },
      cantidad: {
        type: Number,
        require: true,
      },
    },
  ],
});

const Carritos = mongoose.model("Carritos", CarritosSchema);

module.exports = {
  Carritos,
};
