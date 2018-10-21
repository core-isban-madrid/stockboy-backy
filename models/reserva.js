var mongoose = require('mongoose');

var ReservaSchema = new mongoose.Schema({ 
    cliente: Object,
    nombre: String,
    marca: String,
    codigo: String
});

module.exports = mongoose.model('Reserva', ReservaSchema);