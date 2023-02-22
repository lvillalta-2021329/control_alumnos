const { request, response  } = require('express');

const esRolMaestro = ( req = request, res = response, next ) => {

    if ( !req.maestro ) {
        return res.status(500).json({
            msg: 'Se quiere verficar el role sin validar el token primero...'
        });
    }

    //Verificación solo el rol de ROL_MAESTRO puede realizar la eliminación
    //Si cumple con el rol de ROL_MAESTRO se envia al controllador deleteMaestro
    const { rol, nombre, } = req.maestro
    if ( rol !== 'ROL_MAESTRO') {
        return res.status(401).json({
            msg: `${ nombre } no es ROL_MAESTRO - No puede hacer esto >:v`
        });
    }

    next();

}

module.exports = {
    esRolMaestro
}