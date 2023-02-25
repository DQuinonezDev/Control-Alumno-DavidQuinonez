const { response, request } = require('express');
const bcrypt = require('bcryptjs');
// Importacion del modelo
const Usuario = require('../models/usuario');

const getProfesor= async (req = request, res = response) => {

    const query = {estado: true, rol: "ROLE_MAESTRO"};

    const listaProfesor = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
    ])

    res.json({
        msg: "GET PROFESOR",
        listaProfesor
    })

}

const postProfesor = async (req = request, res = response) => {

    //destructuracion
    const { nombre, apellido, correo, password, rol="ROLE_MAESTRO"} = req.body;
    const profesorGuardadoDB = new Usuario({ nombre, apellido, correo, password, rol})

    //Encriptacion de la contraseña
    const salt = bcrypt.genSaltSync();
    profesorGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en base de datos
    await profesorGuardadoDB.save();

    res.status(201).json({
        msg: "POST PROFESOR",
        profesorGuardadoDB
    })
}

const putProfesor = async (req = request, res = response) => {

    const { id } = req.params;
    const { rol, ...resto } = req.body;

    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    const profesorEditado = await Usuario.findByIdAndUpdate(id, resto);

    res.status(201).json({
        msg: "PUT PROFESOR",
        profesorEditado
    })

}

const deleteProfesor = async (req = request, res = response) => {

    const { id } = req.params;

    // const alumnoEliminado = await Usuario.findByIdAndDelete(id);


    //eliminar por estado
    const profesorEliminado = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: 'PROFESOR ELIMINADO',
        profesorEliminado
    });
}

module.exports = {
    getProfesor,
    postProfesor,
    putProfesor,
    deleteProfesor
}


