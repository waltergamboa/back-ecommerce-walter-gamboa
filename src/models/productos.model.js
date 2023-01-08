const mongoose = require("mongoose");

const ProductosSchema = new mongoose.Schema({
  descripcion: {
    type: String,
    require: true,
    trim: true,
    max: 150,
  },
  categoria: {
    type: String,
    require: true,
    trim: true,
    max: 50,
  },
  precio: {
    type: Number,
    require: true,
  },
  imagen: {
    type: String,
    require: true,
    trim: true,
    max: 250,
  },
});

const Productos = mongoose.model("Productos", ProductosSchema);

module.exports = {
  Productos,
};
