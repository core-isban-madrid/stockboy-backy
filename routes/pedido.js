var express = require('express');
var Pedido = require('../models/pedido.js')
var app = express();

app.get('/', (req, res, next)=>{ 
    Pedido.find({}).exec((err, pedidos)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            pedidos: pedidos
        });
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var pedido = new Pedido({
        cliente: body.cliente,
        items: body.items,
        total: body.total,
        fecha: body.fecha,
        situacion: body.situacion
    });
    pedido.save((err, pedidoGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear factura',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            pedido: pedidoGuardado
        });
    }); 
});

app.get('/:id', function(req, res, next){
    var id = req.params.id;
    Pedido.findById(req.params.id, (err, pedido)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            pedido: pedido
        })
    })
});

app.put('/:id', (req, res, next)=>{
    
    var body = req.body;

    Pedido.findById(req.params.id, (err, pedido)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }

        pedido.cliente = body.cliente;
        pedido.items = body.items;
        pedido.total = body.total;
        pedido.fecha = body.fecha;
        pedido.situacion = body.situacion;
        pedido.fechaEnvio = body.fechaEnvio;

        pedido.save((err, pedidoModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el pedido',
                    errores: err
                })
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Pedido modificado correctamente'
            })
        })
    })
})

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
