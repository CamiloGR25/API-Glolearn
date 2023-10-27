const mongoose = require("mongoose"); //se importa el componenete mongoose

const personaSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    cargo: {
        type: String,
        require: true
    },
    identificacion: {
        type: String,
        require: true
    },
    numIdentificacion: {
        type: Number,
        require: true
    },
    fechaNacimiento: {
        type: Date,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    }



});

module.exports = mongoose.model("persona", personaSchema)//exportar el modelo