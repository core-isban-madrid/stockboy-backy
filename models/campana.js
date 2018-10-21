var mongoose = require('mongoose');

var CampanaSchema = new mongoose.Schema({ 
    asunto: String,
    fecha: Object
});

module.exports = mongoose.model('Campana', CampanaSchema);