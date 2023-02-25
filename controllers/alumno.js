const { response, request, query } = require('express');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose');

// Importacion del modelo
const Usuario = require('../models/usuario');


const getAlumnos = async (req = request, res = response) => {

    const query = { estado: true, rol: "ROLE_ALUMNO" };

    const listaAlumnos = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .populate('curso', 'nombre')
    ])

    res.json({
        msg: "GET ALUMNOS",
        listaAlumnos
    })

}


const getAlumnosByID = async (req = request, res = response) => {
    const { id } = req.params;
    const alumnoById = await Usuario.findById(id).populate('curso', 'nombre');

    res.status(201).json(alumnoById)
}

const postAlumnos = async (req = request, res = response) => {
    let repetido;

    //Desestructuración
    rol = "ESTUDIANTE_ROLE"
    const { nombre, apellido, correo, password, curso } = req.body;

    const alumnoGuardadoDB = new Usuario({ nombre, apellido, correo, password, rol, curso });

    //Encriptacion de la contraseña
    const salt = bcrypt.genSaltSync();
    alumnoGuardadoDB.password = bcrypt.hashSync(password, salt);

    //-- Validacion para que no se repitan los cursos

    for (let cursoMax = 0; cursoMax < curso.length; cursoMax++) {

        for (let curso3 = cursoMax + 1; curso3 < curso.length; curso3++) {

            if (curso[cursoMax] === curso[curso3]) {

                repetido = curso[cursoMax];

                break;
            }
        }
    }


    if (repetido) {
        res.status(201).json({
            msg: `No te puedes asignar a dos cursos iguales ${alumnoGuardadoDB.curso}`
        });
    } else {
        await alumnoGuardadoDB.save();
        res.status(201).json({
            msg: "POST ALUMNOS",
            alumnoGuardadoDB
        })
    }

}







const putAlumnos = async (req = request, res = response) => {
    let repetido;

    const { id } = req.params;

    const { rol, estado, correo, ...resto } = req.body;

    if (resto.password) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    for (let cursoMax = 0; cursoMax < resto.curso.length; cursoMax++) {

        for (let curso3 = cursoMax + 1; curso3 < resto.curso.length; curso3++) {
            if (resto.curso[cursoMax] === resto.curso[curso3]) {
                repetido = resto.curso[cursoMax];
                break;
            }
        }
    }


    if (repetido) {
        res.status(201).json({
            msg: `No te puedes asignar a dos cursos iguales `
        });
    } else {
        const alumnoEditado = await Usuario.findByIdAndUpdate(id, resto);

        res.status(201).json({
            msg: "PUT ALUMNOS",
            alumnoEditado
        })
    }




    

}

const deleteAlumnos = async (req = request, res = response) => {

    const { id } = req.params;

    // const alumnoEliminado = await Usuario.findByIdAndDelete(id);


    //eliminar por estado
    const alumnoEliminado = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'ALUMNO ELIMINADO',
        alumnoEliminado
    });
}

module.exports = {
    getAlumnos,
    postAlumnos,
    putAlumnos,
    deleteAlumnos,
    getAlumnosByID
}


