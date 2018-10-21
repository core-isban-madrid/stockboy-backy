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
        online: body.online,
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

app.get('/orden/:termino/:sentido', (req, res, next) => {
    var termino = req.params.termino;
    var sentido = req.params.sentido;
    sentido = Number(sentido);

    Producto.find({}).sort([[termino, sentido]]).exec((err, productos)=>{
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

app.get('/categorias/:stock/:especial', (req, res, next) => {
    var stock = req.params.stock;
    var especial = req.params.especial;

    if (especial === 'Todas'){
        Producto.find({ categoriasSel: { "$all" : [stock]} }).exec((err, productos)=>{
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
    } else {
        Producto.find({ categoriasSel: { "$all" : [stock, especial]} }).exec((err, productos)=>{
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
    }

});

app.get('/categoria/:especial', (req, res, next) => {
    var especial = req.params.especial;

        Producto.find({ categoriasSel: { "$all" : [especial]} }).exec((err, productos)=>{
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

app.put('/vistos', (req, res, next) => {
    var vistos = req.body;

    Producto.find({_id: {$in: vistos}}, function (err, array) {
        if (err) {
            return res.status(500).json({ 
                ok: false,
                mensaje: 'Error acceso Base de Datos',
                errores: err
            });
        } else {
          var objects = {};
          array.forEach(o => objects[o._id] = o);
          var dupArray = vistos.map(id => objects[id]);

          res.status(200).json({
                ok: true,
                productos: dupArray
            });
        }
      });
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
        producto.online = body.online;
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
    
    var cantidad = req.body.cantidad;
    var color = req.body.color;
    var talla = req.body.talla;


    Producto.findById(req.params.id, (err, producto)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }

        var variantes = producto.variantes;
        producto.variantes = [];
        producto.stock = 0;

        variantes.forEach((element) => {
            if (element.color === color && element.talla === talla){
                element.stockTalla -= cantidad;
            }
            producto.variantes.push(element);
            producto.stock += element.stockTalla;
        });

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

app.put('/actvendidos/:id', (req, res, next)=>{
    
    var vendidos = parseInt(req.body.vendidos);

    Producto.findById(req.params.id, (err, producto)=>{
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error de conexión'
            })
        }
        
        if (producto.vendidos){
            producto.vendidos += vendidos;
        } else {
            producto.vendidos = vendidos;
        }
        

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
                mensaje: 'Vendidos actualizado correctamente'
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
