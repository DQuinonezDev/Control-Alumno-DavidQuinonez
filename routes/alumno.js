const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { getAlumnos, postAlumnos, putAlumnos, deleteAlumnos, getAlumnosByID } = require('../controllers/alumno');
const { emailExiste, existeAlumnoPorId } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esProfesorRole } = require('../middlewares/validar-roles');


router.get('/mostrar', getAlumnos);

router.get('/mostrar/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeAlumnoPorId),
    validarCampos
], getAlumnosByID)

router.post('/agregar', [

    validarJWT,
    esProfesorRole,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength({ min: 6 }),
    check('curso', 'Tienes que asignarte por lo menos 1 curso').not().isEmpty(),
    check('curso', 'No puedes asignarte a mas de 3 cursos').isArray({ max: 3 }),

    validarCampos

], postAlumnos);

router.put('/editar/:id',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'El password debe de ser más de 6 digitos').isLength({ min: 6 }),
    check('curso', 'Tienes que asignarte por lo menos 1 curso').not().isEmpty(),
    check('curso', 'No puedes asignarte a mas de 3 cursos').isArray({ max: 3 }),
    validarCampos
], putAlumnos);

router.delete('/eliminar/:id',[
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom(existeAlumnoPorId),
    validarCampos
], deleteAlumnos);




module.exports = router;
