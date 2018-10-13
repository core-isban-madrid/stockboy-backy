var mongoose = require('mongoose');

var CategoriaSchema = new mongoose.Schema({ 
    nombre: String
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
