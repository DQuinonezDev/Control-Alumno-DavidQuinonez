const { Router } = require('express');
const { check } = require('express-validator');
const { getProfesor, postProfesor, putProfesor, deleteProfesor } = require('../controllers/profesor');
const { emailExiste, existeAlumnoPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esProfesorRole } = require('../middlewares/validar-roles');


const router = Router();



router.get('/mostrar', getProfesor);

router.post('/agregar',[

    validarJWT,
    esProfesorRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    validarCampos

], postProfesor);

router.put('/editar/:id',[
    validarJWT,
    esProfesorRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    validarCampos
], putProfesor);

router.delete('/eliminar/:id',[
    validarJWT,
    esProfesorRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeAlumnoPorId ),
    validarCampos
], deleteProfesor);


module.exports = router;
