var mongoose = require('mongoose');

var ManualSchema = new mongoose.Schema({ 
    cliente: Object,
    items: Object,
    total: Number,
    fecha: Object,
    situacion: String,
    fechaEnvio: Object,
    envio: String
});

module.exports = mongoose.model('Manuale', ManualSchema);