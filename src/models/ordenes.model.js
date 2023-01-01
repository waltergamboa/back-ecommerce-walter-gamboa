const mongoose = require("mongoose");

const OrdenesSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    max: 50
  },
  fyh: {
    type: String,
    require: true,
    trim: true,
    max: 20
  },
    timestamp: {
        type: Number,
        require: true,
    },            
    estado: {
      type: String,
      require: true,
      trim: true,
      max: 20
    },
    items:[{
      idproducto: {
        type: Number,
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
      precio: {
        type: Number,
        require: true,
      },
    }]
    });


const Ordenes = mongoose.model("Ordenes", OrdenesSchema);

module.exports = {
    Ordenes
};

