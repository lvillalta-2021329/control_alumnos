const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');
const Role = require('../models/role');

//Validamos en contro de la db si ese correo ya existe
const emailExiste = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeMaestro = await Maestro.findOne( { correo } );
    if ( existeEmailDeMaestro) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const emailExiste1 = async( correo = '' ) => {
    //Verficar si el correo existe
    const existeEmailDeAlumno = await Alumno.findOne( { correo } );
    if ( existeEmailDeAlumno) {
        throw new Error(`El correo ${ correo }, ya esta registrado en la DB `);
    }
}

const esRoleValido = async( rol = '') => {
    //Verificar si el rol es valido y existe en la DB
    const existeRolDB = await Role.findOne( { rol } );
    if ( !existeRolDB ) {
        throw new Error(`El rol ${ rol }, no existe en la DB `);
    }
}


const existeMaestroPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfUser = await Maestro.findById( id );
    if ( !existIdOfUser ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}

const existeAlumnoPorId = async( id ) => {

    //Verificar si existe el ID
    const existIdOfCategory = await Alumno.findById( id );
    if ( !existIdOfCategory ) {
        throw new Error(`El id: ${id} no existe en la DB`);
    }

}


const curso1Existe = async( curso1 = '' ) => {
    //Verficar si el correo existe
    const existeCurso1DeAlumno = await Alumno.findOne( { curso1 } );
    if ( existeCurso1DeAlumno) {
        throw new Error(`El curso1 ${ curso1 }, ya esta registrado en la DB `);
        
    }
   
}

const curso2Existe = async( curso2 = '' ) => {
    //Verficar si el correo existe
    const existeCurso2DeAlumno = await Alumno.findOne( { curso2 } );
    if ( existeCurso2DeAlumno) {
        throw new Error(`El curso2 ${ curso2 }, ya esta registrado en la DB `);
        
    }
   
}

const curso3Existe = async( curso3 = '' ) => {
    //Verficar si el correo existe
    const existeCurso3DeAlumno = await Alumno.findOne( { curso3 } );
    if ( existeCurso3DeAlumno) {
        throw new Error(`El curso3 ${ curso3 }, ya esta registrado en la DB `);
        
    }
   
}




module.exports = {
    curso1Existe,
    curso2Existe,
    curso3Existe,
    emailExiste,
    esRoleValido,
    existeMaestroPorId,
    existeAlumnoPorId,
    emailExiste1
    
}