const express = require("express"); //libreria de express
const router = express.Router();//manejador de las rutas
const usuarioSchema = require("../models/usuario")//entra a la clase usuario en modelos
const bcrypt = require("bcrypt"); //Encriptar contraseña por medio del hasheoo
const jwt = require("jsonwebtoken"); // importa la libreria de JSON Web Token
const verifyToken = require("./validate_token");

//crear usuario:
router.post("/usuarios/registrar", async (req, res) => {
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

//Ingreso de usuario:
router.post("/usuarios/ingresar", async (req, res) => {
    console.log('LOGIN***')
    // validaciones
    const { error } = usuarioSchema.validate(req.body.correo, req.body.contraseña);
    if (error) return res.status(400).json({ error: error.details[0].message });
    //Buscando el usuario por su dirección de correo
    const user = await usuarioSchema.findOne({ correo: req.body.correo });

    //validando si no se encuentra
    if (!user)
        return res.status(400).json({ error: "Usuario o clave incorrectos" });

    //Transformando la contraseña a su valor original para
    //compararla con la clave que se ingresa en el inicio de sesión
    const validPassword = await bcrypt.compare(req.body.contraseña, user.contraseña);
    let accessToken = null;
    if (!validPassword) {
        return res.status(400).json({ error: "Usuario o clave incorrectos" });
    } else {
        const expiresIn = 24 * 60 * 60;
        accessToken = jwt.sign(
            { id: user.id },
            process.env.SECRET, {
            expiresIn: expiresIn
        });

        /*res.json({
           id: user._id,
           usuario: user.usuario,
           correo: user.correo,
           clave: user.clave,
           accessToken: accessToken,
           expiresIn: expiresIn,
         });*/
        res.json({ accessToken });
    }
});

module.exports = router; // exporta router y sus HTTP