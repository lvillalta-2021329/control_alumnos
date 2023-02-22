//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Maestro = require('../models/maestro');


const getMaestros = async (req = request, res = response) => {

    //Condición, me busca solo los maestros que tengan estado en true
    const query = { estado: true };

    const listaMaestros = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
    ]);

    res.json({
        msg: 'GET API de maestro',
        listaMaestros
    });

}

const postMaestro = async (req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const maestroDB = new Maestro({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    maestroDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await maestroDB.save();

    res.status(201).json({
        msg: 'POST API de maestro',
        maestroDB
    });

}

const putMaestro = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, rol, estado,google,  ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const maestroEditado = await Maestro.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT API de maestro',
        maestroEditado
    });

}


const deleteMaestro = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const maestroEliminado = await Maestro.findByIdAndDelete(id);

    // O bien cambiando el estado del maestro

    //editar y guardar
    //const maestroEliminado = await maestro.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de maestro',
        maestroEliminado
    });

}



module.exports = {
    getMaestros,
    postMaestro,
    putMaestro,
    deleteMaestro
}