const express = require("express"); //libreria de express
const router = express.Router();//manejador de las rutas
const usuarioSchema = require("../models/usuario")//entra a la clase usuario en modelos
const bcrypt = require("bcrypt"); //Encriptar contraseña por medio del hasheoo
const jwt = require("jsonwebtoken"); // importa la libreria de JSON Web Token

//crear usuario:
router.post("usuarios/registrar", async (req, res) => {
    //crear constantes con los datos traidos del modelo del usuario:
    const { nombre, apellido, correo, cargo, identificacion, numIdentificacion, fechaNacimiento, nombreUsuario, contraseña } = req.body;
    const usuario = new usuarioSchema({ //crear el usuario de esquema con las constantes
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        cargo: cargo,
        identificacion: identificacion,
        numIdentificacion: numIdentificacion,
        fechaNacimiento: fechaNacimiento,
        nombreUsuario: nombreUsuario,
        contraseña: contraseña,
    });

    usuario.contraseña = await usuario.encryptClave(usuario.contraseña); //encripta la clave: (usando bcrypt para hashear la contraseña)
    await usuario.save(); //guardar en usuario en la BD

    //generar el token:
    const token = jwt.sign(
        { id: usuario._id }, //primer parámetro: payload - un dato que se agrega para generar el token
        process.env.SECRET, //segundo parámetro: un texto que hace que el código generado sea único
        { expiresIn: 60 * 60 * 24, }); //tercer parámetro: tiempo de expiración (en segundos, 24 horas en segundos)
    //un día en segundos

    //respuesta
    res.json({
        auth: true,
        token,
        usuario,
    });
});

//modificar usuario:
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, cargo, identificacion, numIdentificacion, fechaNacimiento, nombreUsuario } = req.body; //nuevos datos
    usuarioSchema.updateOne({ _id: id }, { $set: { nombre, apellido, correo, cargo, identificacion, numIdentificacion, fechaNacimiento, nombreUsuario } })//actualizar
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//consultar todos los usuarios:
router.get("/usuarios", (req, res) => {
    usuarioSchema.find()//mostrar los datos
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//consultar datos por id:
router.get("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    usuarioSchema.findById(id)//mostrar por id
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//eliminar usuario:
router.delete("/usuarios/:id", (req, res) => {
    const { id } = req.params;//constante que recibe el id para eliminar el usuario
    usuarioSchema.findByIdAndDelete(id) //eliminar el usuario
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});





module.exports = router; // exporta router y sus HTTP