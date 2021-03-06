var express = require('express');
var bodyParser = require('body-parser');

var producto = require('./routes/producto.js');
var categoria = require('./routes/categoria.js');
var cupon = require('./routes/cupon.js');
var campana = require('./routes/campana.js');
var pedido = require('./routes/pedido.js');
var email = require('./routes/email');
var usuario = require('./routes/usuario.js');
var login = require('./routes/login');
var encuesta = require('./routes/encuesta');
var configuracion = require('./routes/configuracion');
var reserva = require('./routes/reserva');
var manual = require('./routes/manual.js')

var app = express();
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://pedroj:firstbook1234@ds125263.mlab.com:25263/tienda', {promiseLibrary: require('bluebird')})     
    .then(()=>{
        console.log('Conectado a Base de Datos');
    })
    .catch((err)=>{
        console.error(err);
    });

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({'extended':false}));

app.use('/producto', producto);
app.use('/categoria', categoria);
app.use('/cupon', cupon);
app.use('/campana', campana);
app.use('/pedido', pedido);
app.use('/email', email);
app.use('/usuario', usuario);
app.use('/login', login);
app.use('/encuesta', encuesta);
app.use('/configuracion', configuracion);
app.use('/reserva', reserva);
app.use('/manual', manual);



app.listen(3000, function(){
    console.log('Servidor escuchando en puerto 3000');
});
