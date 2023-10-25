const express = require("express"); //libreria de express
const router = express.Router();//manejador de las rutas
const cursoSchema = require("../models/curso")//entra a la clase curso en modelos

//crear curso:
router.post("/cursos", (req, res) => {
    const curso = cursoSchema(req.body);//trae el cuerpo de cursos 
    curso.save()//guarda el curso
        .then((data) => res.json(data)).catch((error) => res.json({ message: error }));
});

//eliminar curso:
router.delete("/cursos", (req, res) => {
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


module.exports = router; // exporta router y sus HTTP