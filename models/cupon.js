var mongoose = require('mongoose');

var CuponSchema = new mongoose.Schema({ 
    nombre: String,
    dtoPorcentual: Number,
    dtoImporte: Number,
    usado: Number
});

module.exports = mongoose.model('Cupon', CuponSchema);
