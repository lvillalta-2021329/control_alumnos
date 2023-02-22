const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const Maestro = require('../models/maestro');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');
    
    //Validar si el token se envia en los headers
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_OR_PRIVATE_KEY );

        //leer al maestro que corresponda el uid
        const maestro = await Maestro.findById( uid );

        //Verificar el uid del maestro, si no existiera
        if ( !maestro ) {
            return res.status(401).json({
                msg: 'Token no válido - Maestro no existe en la base de datos'
            });
        }

        //Verificar si el uid esta en estado: true
        if ( !maestro.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - Maestro inactivo : Estado FALSE'
            });
        }

        req.meestro = maestro;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }

}


module.exports = {
    validarJWT
}