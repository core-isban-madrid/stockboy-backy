var mongoose = require('mongoose');
// var unique = require('mongoose-unique-validator');

var EncuestaSchema = new mongoose.Schema({
    nombre: String,
    fecha: Object,
    pregunta1: String,
    pregunta2: String,
    pregunta3: String,
    pregunta4: String,
    pregunta5: String
});

// UsuarioSchema.plugin(unique, {message: 'Nombre de usuario ya se encuentra en uso'});

module.exports = mongoose.model('Encuesta', EncuestaSchema);