const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Maestro = require('../models/maestro');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {
        
        //Verificar si el correo existe
        const maestro = await Maestro.findOne( { correo } );

        if ( !maestro ) {
            return res.status(404).json({
                msg: 'Correo de maestro no existe en la base de datos 404'
            });
        }
    
        //Si el maestro esta activo (usuario.estado === false)
        if ( maestro.estado === false ) {
            return res.status(400).json({
                msg: 'La cuenta del maestro esta inactivo'
            });
        }
    
        //Verificar la password el maestro    //comporeSync, encripta ambas passwords y las compara
        const validarPassword = bcryptjs.compareSync( password, maestro.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'La password es incorrecta'
            });
        }

        //Generar JWT
        const token = await generarJWT( maestro.id );
    
        res.json({
            msg: 'Login Auth Funciona!',
            correo, password,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }


}


module.exports = {
    login
}