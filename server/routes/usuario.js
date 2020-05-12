const express = require('express');

//const bcrypt = require('bcrypt');

// Controla datos que se puede actualizar del body en app.put
const _ = require('underscore');

const Usuario = require('../models/usuario');

const app = express();


//=============================================
// PUT actualiza inforción
//=============================================

app.get('/usuario', function(req, res) {

    // 
    let limite = req.query.limite || 5;
    limite = Number(limite);

    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Busco registro y defino que campor mostrar con 'nombre email role estado google img'
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo

                });
            });

        })

});


//=============================================
// POST
//=============================================
app.post('/usuario', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: body.password,
        role: body.role
    });

    // Guardar información
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

//=============================================
// PUT actualiza inforción
//=============================================

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    })

});


//=============================================
// DELETE
//=============================================

app.delete('/usuario/:id', function(req, res) {

    let id = req.params.id;
    //let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);


    /*
        //=============================================================================================
        // Inicio borrado fisico del registro de la BD
        Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario que intenta eliminar no se encuentra'
                    }
                });
            }

            res.json({
                ok: true,
                usuario: usuarioBorrado
            });

        })

        // Fin borrado fisico del registro de la BD
        //=============================================================================================
    */


    //=============================================================================================
    // Inicio cambio estado del registro de la BD
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario que intenta eliminar no se encuentra'
                    }
                });
            }

            res.json({
                ok: true,
                usuario: usuarioBorrado
            });

        })
        // Fin cambio estado del registro de la BD
        //=============================================================================================


    // mandar mensaje por pantalla
    //  res.json('delete Usuario');

});


module.exports = app;