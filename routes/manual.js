var express = require('express');
var Manual = require('../models/manual.js')
var app = express();

app.get('/', (req, res, next)=>{ 
    Manual.find({}).exec((err, manuales)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            manuales: manuales
        });
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var manual = new Manual({
        cliente: body.cliente,
        items: body.items,
        total: body.total,
        fecha: body.fecha,
        envio: body.envio,
        situacion: body.situacion
    });
    manual.save((err, manualGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear manual',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            manual: manualGuardado
        });
    }); 
});

app.get('/:id', function(req, res, next){
    var id = req.params.id;
    Manual.findById(req.params.id, (err, manual)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            manual: manual
        })
    })
});

app.put('/:id', (req, res, next)=>{
    var body = req.body;
    Manual.findById(req.params.id, (err, manual)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }

        manual.cliente = body.cliente;
        manual.items = body.items;
        manual.total = body.total;
        manual.fecha = body.fecha;
        manual.envio = body.envio;
        manual.situacion = body.situacion;
        manual.fechaEnvio = body.fechaEnvio;

        manual.save((err, manualModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar manual',
                    errores: err
                })
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Manual modificado correctamente'
            })
        })
    })
})

app.delete('/:id', function(req, res, error){
    
    Manual.findByIdAndRemove(req.params.id, function(err, datos){
        var mensaje = 'Manual eliminado';         
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })
});

module.exports = app;
