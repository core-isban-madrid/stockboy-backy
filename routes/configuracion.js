var express = require('express');
var Configuracion = require('../models/configuracion.js');
var app = express();

app.get('/', (req, res, next)=>{
    Configuracion.find({}).exec((err, configuraciones)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            configuraciones: configuraciones 
        });
    });
});

app.get('/:id', function(req, res, next){
    Configuracion.findById(req.params.id, (err, configuracion)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        }
        res.status(200).json({
            ok: true,
            configuracion: configuracion
        });
    });
});

app.post('/', function(req, res, next){
    var body = req.body;
    var configuracion = new Configuracion({
        pedidoMin: body.pedidoMin,
        pedidoMax: body.pedidoMax,
        mostrarEntrega: body.mostrarEntrega,
        registroAdm: body.registroAdm
    });
    configuracion.save((err, configuracionGuardada)=>{ 
        if(err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear configuración',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            mensaje: 'Configuración creada correctamente',
        });
    });
});

app.put('/:id', (req, res, next)=>{
    var body = req.body;
    Configuracion.findById(req.params.id, (err, configuracion)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión con servidor'
            });
        };
        configuracion.pedidoMin = body.pedidoMin;
        configuracion.pedidoMax = body.pedidoMax;
        configuracion.mostrarEntrega = body.mostrarEntrega;
        configuracion.registroAdm = body.registroAdm;

        configuracion.save((err, configuracionModificada)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al modificar configuración',
                    errores: err
                });
            };
            res.status(200).json({
                ok: true,
                mensaje: 'Configuración actualizado correctamente'
            });
        });
    });
});

app.delete('/:id', function(req, res, error){
    Configuracion.findByIdAndRemove(req.params.id, function(err, datos){
        if (err) return next(err);
        var mensaje = 'Configuracion eliminada';
        res.status(200).json({
            ok: 'true',
            mensaje: mensaje
        });
    });
});

module.exports = app;
