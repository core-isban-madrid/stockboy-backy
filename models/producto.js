var mongoose = require('mongoose');

var ProductoSchema = new mongoose.Schema({ 
    codigo: String,
    nombre: String,
    marca: String,
    stock: Number,
    categoriasSel: Array,
    descripcion: String,
    variantes: Array,
    fechaAlta: Object,
    imagenes: Array,
    opiniones: Array
});

module.exports = mongoose.model('Producto', ProductoSchema);
