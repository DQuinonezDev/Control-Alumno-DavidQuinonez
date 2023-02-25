const { response, request } = require('express');
const bcrypt = require('bcryptjs');
// Importacion del modelo
const Usuario = require('../models/curso');

const getCurso = async (req = request, res = response) => {

    const query = {estado: true};

    const listaCursos = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .populate('profesor' , 'nombre , rol , correo')
    ])

    res.json({
        msg: "GET CURSOS",
        listaCursos
    })

}

const postCurso = async (req = request, res = response) => {

    //destructuracion
    const { nombre, descripcion, profesor} = req.body;
    const cursoGuardadoDB = new Usuario({ nombre, descripcion, profesor})


    
    //Guardar en base de datos
    await cursoGuardadoDB.save();


    res.status(201).json({
        msg: "POST CURSOS",
        cursoGuardadoDB
    })
}

const putCursos = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, ...resto } = req.body;


    const cursoEditado = await Usuario.findByIdAndUpdate(id,resto);

    res.status(201).json({
        msg: "PUT CURSOS",
        cursoEditado
    })

}

const deleteCurso = async (req = request, res = response) => {

    const { id } = req.params;

    // const alumnoEliminado = await Usuario.findByIdAndDelete(id);


    //eliminar por estado
    const cursoEliminado = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        msg: 'CURSO ELIMINADO',
        cursoEliminado
    });
}

module.exports = {
    getCurso,
    postCurso,
    putCursos,
    deleteCurso
}



