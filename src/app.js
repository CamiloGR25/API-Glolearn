const parser = require("body-parser");//se importa el componenete body-parser
const express = require('express'); //importar modulo de express
const mongoose = require("mongoose"); //se importa el componenete mongoose
const app = express(); //inicia la app con expres
const port = 3000; //el puerto de la app
const cursoRoutes = require("./routers/curso")//accede al fichero curso en el routers
const usuarioRoutes = require("./routers/usuario")//accede al fichero curso en el routers

require("dotenv").config();//cargar las variables de entorno

//configuración:
app.use(parser.urlencoded({ extended: false })); //permite leer los datos que vienen en la petición
app.use(parser.json()); //Transforma los datos al formato json

//Gestionar rutas:
app.use("/glolearn", cursoRoutes);
app.use("/glolearn", usuarioRoutes);
app.use(express.json());

//conexion a la BD: se conecta por medio de la variable entorno
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conexion exitosa")).catch((error) => console.log(error));


//Se establece la conexción con su puerto:
app.listen(port, () => {
    console.log("la aplicación se ejecuta en el puerto " + port)
});