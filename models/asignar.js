const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    alumno: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Alumno'
    },
    curso: {
        type: Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },
});


module.exports = model('asignar-curso', CursoSchema);