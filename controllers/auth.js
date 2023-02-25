const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');

const login = async (req = request, res = response) => {

    const { correo, password} = req.body;

    try {

        //Verficiar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario - El correo no existe en la Base de Datos'
            });
        }

        //Si el usuario esta activo (estado = false)
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario - No esta en la base de datos (estado: false)'
            });
        }
        
        //Verificar la password
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'Usuario - Contraseña incorrecta'
            });
        }

        

        //Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            msg: 'Login PATH ',
            correo, password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        });
    }

}

module.exports = {
    login
}