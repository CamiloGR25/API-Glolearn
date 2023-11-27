const mongoose = require("mongoose"); //se importa el componenete mongoose
const bcrypt = require("bcrypt"); // importando el componente bcrypt

const usuarioSchema = mongoose.Schema({
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
    nombreUsuario: {
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    },
    cursos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Curso"
        }
    ]
});
//Encriptar contraseña:
usuarioSchema.methods.encryptClave = async (contraseña) => {
    const salt = await bcrypt.genSalt(10);//cantidad de rondas
    return bcrypt.hash(contraseña, salt); //realiza el proceso de hashing de una contraseña (transfoma)
};

module.exports = mongoose.model("usuario", usuarioSchema)//exportar el modelo