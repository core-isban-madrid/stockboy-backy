var mongoose = require('mongoose');

var CategoriaSchema = new mongoose.Schema({ 
    nombre: String,
    especial: Boolean
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
