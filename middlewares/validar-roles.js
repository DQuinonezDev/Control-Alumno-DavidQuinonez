const { request, response } = require('express');

//Verificador si es admin
const esProfesorRole = (req = request, res = response, next) => {

    //Si no viene el usuario
    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se require verificar el role sin validar el token primero'
        });
    }

    //Verificar que le rol sea ADMIN_ROLE
    const { rol, nombre, apellido, correo } = req.usuario;

    if ( rol !== 'ROLE_MAESTRO' ) {
        return res.status(500).json({
            msg: `El alumno: ${ nombre} ${apellido} con correo: ${correo} - No tiene acceso a esta función, solo los profesores tienen acceso a esta funcion`
        });
    }

    next();

}


//Operador rest u operador spread 
const tieneRole = ( ...roles ) => {

    return (req = request, res= response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes( req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })

        }

        next();

    }

}


module.exports = {
    tieneRole,
    esProfesorRole
}