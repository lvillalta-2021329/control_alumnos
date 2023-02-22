//Importacion
const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

//Modelos
const Alumno = require('../models/alumno');


const getAlumnos = async (req = request, res = response) => {

    //Condición, me busca solo los usuarios que tengan estado en true
    const query = { estado: true };

    const listaAlumnos = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
    ]);

    res.json({
        msg: 'GET API de alumno',
        listaAlumnos
    });

}

const postAlumno = async (req = request, res = response) => {

    const { nombre, apellido, curso1, curso2, curso3, correo, password, rol } = req.body;
    const alumnoDB = new Alumno({  nombre, apellido, curso1, curso2, curso3, correo, password, rol });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    alumnoDB.password = bcryptjs.hashSync(password, salt);

    //Guardar en Base de datos
    await alumnoDB.save();

    res.status(201).json({
        msg: 'POST API de alumno',
        alumnoDB
    });

}

const putAlumno = async (req = request, res = response) => {

    const { id } = req.params;

    //Ignoramos el _id, rol, estado y google al momento de editar y mandar la petición en el req.body
    const { _id, rol, estado, google, ...resto } = req.body;

    // //Encriptar password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(resto.password, salt);

    //editar y guardar
    const alumnoEditado = await Alumno.findByIdAndUpdate(id, resto);



    res.json({
        msg: 'PUT API de alumno',
        alumnoEditado
    });

}







const deleteAlumno = async (req = request, res = response) => {

    const { id } = req.params;

    //eliminar fisicamente y guardar
    const alumnoEliminado = await Alumno.findByIdAndDelete(id);

    // O bien cambiando el estado del usuario

    //editar y guardar
    //const usuarioEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE API de alumno',
        alumnoEliminado
    });

}



module.exports = {
    getAlumnos,
    postAlumno,
    putAlumno,
    deleteAlumno
}