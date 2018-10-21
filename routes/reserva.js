var express = require('express');
var Reserva = require('../models/reserva.js')
var app = express();

app.get('/', (req, res, next)=>{ 
    Reserva.find({}).exec((err, reservas)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            reservas: reservas
        });
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var reserva = new Reserva({
        cliente: body.cliente,
        nombre: body.nombre,
        marca: body.marca,
        codigo: body.codigo
    });
    reserva.save((err, reservaGuardada)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear reserva',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            reserva: reservaGuardada
        });
    }); 
});

app.delete('/:id', function(req, res, error){
    
    Pedido.findByIdAndRemove(req.params.id, function(err, datos){
        var mensaje = 'Pedido eliminado';         
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })
});

module.exports = app;
