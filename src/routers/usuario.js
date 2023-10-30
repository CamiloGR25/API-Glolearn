const express = require("express"); //libreria de express
const router = express.Router();//manejador de las rutas
const usuarioSchema = require("../models/usuario")//entra a la clase usuario en modelos

//crear usuario:
router.post("/usuarios", (req, res) => {
    const usuario = usuarioSchema(req.body)//trae los parametros del esquema usuario
    usuario.save()//guarda el usuario
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//modificar usuario:
router.put("/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, cargo, identificacion, numIdentificacion, fechaNacimiento, NombreUsuario, contraseña } = req.body; //nuevos datos
    usuarioSchema.updateOne({ _id: id }, { $set: { nombre, apellido, correo, cargo, identificacion, numIdentificacion, fechaNacimiento, NombreUsuario, contraseña } })//actualizar
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
router.delete("/usuarios", (req, res) => {
    const { id } = req.params;//constante que recibe el id para eliminar el usuario
    usuarioSchema.findByIdAndDelete(id) //eliminar el usuario
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});



module.exports = router; // exporta router y sus HTTP