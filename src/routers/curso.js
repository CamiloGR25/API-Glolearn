const express = require("express"); //libreria de express
const router = express.Router();//manejador de las rutas
const cursoSchema = require("../models/curso")//entra a la clase curso en modelos

//crear curso:
router.post("/cursos", (req, res) => {
    const curso = cursoSchema(req.body);//trae el cuerpo de cursos 
    curso.save()//guarda el curso
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

