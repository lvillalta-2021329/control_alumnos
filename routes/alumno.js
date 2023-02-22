//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getAlumnos, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno');
const { emailExiste, esRoleValido, existeAlumnoPorId, curso1Existe, curso2Existe, curso3Existe, emailExiste1 } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/mostrar', getAlumnos);



router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio para el post').not().isEmpty(),
    
    



    check('curso1', 'El curso es obligatorio para el post').not().isEmpty(),
    check('curso1').custom(curso1Existe),
    check('curso2', 'El curso es obligatorio para el post').not().isEmpty(),
    check('curso2').custom(curso1Existe),
    check('curso3', 'El curso es obligatorio para el post').not().isEmpty(),
    check('curso3').custom(curso1Existe),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste1 ),
    check('rol', 'El rol es obligatorio para el post').not().isEmpty(),
    check('rol').custom( esRoleValido ),
    validarCampos
] , postAlumno);



router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeAlumnoPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste1 ),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('rol').custom( esRoleValido ),
    validarCampos
], putAlumno);




router.delete('/eliminar/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeAlumnoPorId ),
    validarCampos
] ,deleteAlumno);


module.exports = router;