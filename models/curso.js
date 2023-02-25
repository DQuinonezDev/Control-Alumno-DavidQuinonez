const { Schema, model } = require('mongoose');

const CursoSchema = Schema({
    nombre: {
        type: String,
        required: [true , 'El nombre del curso es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    descripcion:{
        type: String,
        required:true
    },
    profesor:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});


module.exports = model('Curso', CursoSchema);