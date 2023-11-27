const express = require("express"); //libreria de express
const router = express.Router();//manejador de las rutas
const cursoSchema = require("../models/curso")//entra a la clase curso en modelos

//crear curso:
router.post("/cursos", (req, res) => {
    console.log("Crear Curso")
    const curso = cursoSchema(req.body);//trae el cuerpo de cursos 
    curso.save()//guarda el curso
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//eliminar curso:
router.delete("/cursos/:id", (req, res) => {
    console.log("Eliminar")
    const { id } = req.params;//constante que recibe el id para eliminar el curso
    cursoSchema.findByIdAndDelete(id) //eliminar el curso
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//modificar curso:
router.put("/cursos/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, instructor, prerrequisitos, duracion } = req.body; //nuevos datos
    cursoSchema.updateOne({ _id: id }, { $set: { nombre, descripcion, instructor, prerrequisitos, duracion } })//actualizar
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//consultar todos los cursos:
router.get("/cursos", (req, res) => {
    cursoSchema.find()//mostrar los datos
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

//consultar datos por id:
router.get("/cursos/:id", (req, res) => {
    const { id } = req.params;
    cursoSchema.findById(id)//mostrar por id
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }))
});

module.exports = router; // exporta router y sus HTTP