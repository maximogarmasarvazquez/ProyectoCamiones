const router = require('express').Router()
const { Paquete, Provincia, Camionero} = require('../database/models')

router.get("/:id", (req, res) => {
    Paquete.findByPk(req.params.id).then(obj => { 
     res.json(obj)
    })
})

router.get("/", (req, res) => {
    Paquete.findAll({
        attributes: ['id','codigo','direccionDestinario','destinario','descripcion'],
        include: [{
            model: Provincia, 
            as: 'provincia',
            attributes: ["nombre","codigo"]
        },{
            model: Camionero, 
            attributes: ["dni","nombre","telefono","direccion","salario","poblacion"]
        }]
    }).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Paquete.create({
        codigo: req.body.codigo,
        direccionDestinario: req.body.direccionDestinario,
        destinario: req.body.destinario,
        descripcion: req.body.descripcion,
        provinciaId: req.body.provinciaId,
        camioneroId: req.body.camioneroId
    }).then(paquete => {
        res.json(paquete)
    }).catch(error => {
        res.json(error)
    })
})

router.delete('/delete/:id', (req, res) => {
    Paquete.destroy({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

router.put('/update/:id', (req, res) => {
    Paquete.update({
        codigo: req.body.codigo,
        direccionDestinario: req.body.direccionDestinario,
        destinario: req.body.destinario,
        descripcion: req.body.descripcion,
        provinciaId: req.body.provinciaId,
        camioneroId: req.body.camioneroId
    },{
         where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(error => {
        res.json(error)
    })
})

module.exports = router;