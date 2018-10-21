var express = require('express');
var Categoria = require('../models/categoria.js')
var app = express();

app.get('/', (req, res, next)=>{ 
    Categoria.find({}).exec((err, categorias)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            categorias: categorias
        });
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var categoria = new Categoria({
        nombre: body.nombre,
        especial: body.especial
    });
    categoria.save((err, categoriaGuardada)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear factura',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            categoria: categoriaGuardada
        });
    }); 
});

app.delete('/:id', function(req, res, error){
    
    Categoria.findByIdAndRemove(req.params.id, function(err, datos){
        var mensaje = 'Categoria eliminado';         
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })
});

module.exports = app;
