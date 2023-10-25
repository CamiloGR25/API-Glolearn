const { time } = require("console");
const mongoose = require("mongoose"); //se importa el componenete mongoose

const cursoSchema = mongoose.Schema({

    nombre: {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    instructor: {
        type: String,
        require: true
    },
    prerequisitos: {
        type: String,
        require: true
    },
    duracion: {
        type: Number,
        require: true
    }

})