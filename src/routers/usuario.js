const express = require("express"); //libreria de express
const router = express.Router();//manejador de las rutas
const usuarioSchema = require("../models/usuario")//entra a la clase usuario en modelos

//crear usuario:
router.post("/usuarios", (req, res) => {
    const usuario = usuarioSchema(req.body)//trae los parametros del esquema usuario
    usuario.save()//guarda el usuario
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});


module.exports = router; // exporta router y sus HTTP