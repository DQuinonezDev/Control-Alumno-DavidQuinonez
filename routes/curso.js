const { Router } = require('express');
const { check } = require('express-validator');
const { getCurso, postCurso, putCursos, deleteCurso } = require('../controllers/curso');
const { validarRep } = require('../helpers/db-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esProfesorRole } = require('../middlewares/validar-roles');
const router = Router();
// const { getAlumnos, postAlumnos,  putAlumnos,  deleteAlumnos} = require('../controllers/alumno');
// const { emailExiste } = require('../helpers/db-validator');
// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esProfesorRole } = require('../middlewares/validar-roles');


router.get('/mostrar', getCurso);

router.post('/agregar'
    , [
        validarJWT,
        esProfesorRole,
        validarJWT,
        esProfesorRole,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ]
    , postCurso);

router.put('/editar/:id', putCursos);

router.delete('/eliminar/:id', deleteCurso);




module.exports = router;
