var express = require('express');
var Cupon = require('../models/cupon.js')
var app = express();

app.get('/', (req, res, next)=>{ 
    Cupon.find({}).exec((err, cupones)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            cupones: cupones
        });
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var cupon = new Cupon({
        nombre: body.nombre,
        dtoPorcentual: body.dtoPorcentual,
        dtoImporte: body.dtoImporte,
        usado: 0
    });
    cupon.save((err, cuponGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear cupon',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            cupon: cuponGuardado
        });
    }); 
});

app.put('/', (req, res, next)=>{
    
    var body = req.body;

    Cupon.findOne({nombre: body.nombre}, (err, cupon)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }

        cupon.usado += 1;

        cupon.save((err, cuponModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el cupon',
                    errores: err
                })
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Cupon modificado correctamente'
            })
        })
    })
})

app.delete('/:id', function(req, res, error){
    
    Cupon.findByIdAndRemove(req.params.id, function(err, datos){
        var mensaje = 'Cupon eliminado';         
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })
});

module.exports = app;
