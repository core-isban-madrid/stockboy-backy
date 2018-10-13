var mongoose = require('mongoose');

var PedidoSchema = new mongoose.Schema({ 
    cliente: Object,
    items: Object,
    total: Number,
    fecha: Object,
    situacion: String,
    fechaEnvio: Object
});

module.exports = mongoose.model('Pedido', PedidoSchema);