var express = require('express');
var Producto = require('../models/producto.js')
var app = express();

app.get('/', (req, res, next)=>{ 
    Producto.find({}).exec((err, productos)=>{
        if(err){ 
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            productos: productos
        });
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var producto = new Producto({
        codigo: body.codigo,
        nombre: body.nombre,
        marca: body.marca,
        stock: body.stock,
        categoriasSel: body.categoriasSel,
        descripcion: body.descripcion,
        variantes: body.variantes,
        fechaAlta: body.fechaAlta,
        imagenes: body.imagenes
    });
    producto.save((err, productoGuardado)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear factura',
                errores: err
            });
        };
        res.status(200).json({
            ok: true,
            producto: productoGuardado
        });
    }); 
});

app.get('/:id', function(req, res, next){
    var id = req.params.id;
    Producto.findById(req.params.id, (err, producto)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                mensaje: 'Error acceso DB',
                errores: err
            })
        }
        res.status(200).json({
            ok: true,
            producto: producto
        })
    })
});

app.put('/:id', (req, res, next)=>{
    
    var body = req.body;

    Producto.findById(req.params.id, (err, producto)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }

        producto.codigo = body.codigo;
        producto.nombre = body.nombre;
        producto.marca = body.marca;
        producto.stock = body.stock;
        producto.categoriasSel = body.categoriasSel;
        producto.descripcion = body.descripcion;
        producto.variantes = body.variantes;
        producto.fechaAlta = body.fechaAlta;
        producto.imagenes = body.imagenes;

        producto.save((err, productoModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el producto',
                    errores: err
                })
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Articulo producto correctamente'
            })
        })
    })
})

app.put('/act/:id', (req, res, next)=>{
    
    var body = req.body;

    Producto.findById(req.params.id, (err, producto)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }

        producto.stock -= body.cantidad;

        producto.save((err, productoModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el producto',
                    errores: err
                })
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Stock actualizado correctamente'
            })
        })
    })
})

app.put('/opinion/:id', (req, res, next)=>{
    
    var body = req.body;

    Producto.findById(req.params.id, (err, producto)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }
        producto.opiniones.push(body);
        producto.save((err, productoModificado)=>{
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar el producto',
                    errores: err
                })
            }

            res.status(200).json({
                ok: true,
                mensaje: 'Stock actualizado correctamente'
            })
        })
    })
})

app.delete('/:id', function(req, res, error){
    
    Producto.findByIdAndRemove(req.params.id, function(err, datos){
        var mensaje = 'Producto eliminado';         
        res.status(201).json({
            ok: 'true',
            mensaje: mensaje
        });
    })
});



module.exports = app;
