//importaciones
const { Router } = require('express');
const { check } = require('express-validator');

const { getMaestros, postMaestro, putMaestro, deleteMaestro } = require('../controllers/maestro');
const { emailExiste, esRoleValido, existeMaestroPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esRolMaestro } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getMaestros);


router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio para el post').not().isEmpty(),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('rol', 'El rol es obligatorio para el post').not().isEmpty(),
    check('rol').custom( esRoleValido ),
    validarCampos
] , postMaestro);


router.put('/editar/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeMaestroPorId ),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La password es obligatorio para el post').not().isEmpty(),
    check('password', 'La passwarod debe ser mayor a 6 letras').isLength({ min: 6 }),
    check('rol').custom( esRoleValido ),
    validarCampos
], putMaestro);


router.delete('/eliminar/:id', [
    
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeMaestroPorId ),
    validarCampos
] ,deleteMaestro);


module.exports = router;