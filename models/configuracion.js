var mongoose = require('mongoose');

var ConfiguracionSchema = new mongoose.Schema({
    pedidoMin: Number,
    pedidoMax: Number,
    mostrarEntrega: Boolean,
    registroAdm: Boolean
});

module.exports = mongoose.model('Configuracione', ConfiguracionSchema);