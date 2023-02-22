const { Schema, model } = require('mongoose');

const AlumnoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    curso1: {
        type: String,
        required: [true, 'El curso1 es obligatorio']
    },
    curso2: {
        type: String,
        required: [true, 'El curso2 es obligatorio']
    },
    curso3: {
        type: String,
        required: [true, 'El curso3 es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El contraseña es obligatorio']
    },
    
    rol: {
        type: String,
        required: true,
       // emun: ['ROL_ALUMNO']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Alumno', AlumnoSchema)