const router = require('express').Router()
const { Provincia } = require('../database/models')

router.get("/:id", (req, res) => {
    Provincia.findByPk(req.params.id).then(obj => {
        res.json(obj)
    })
})

router.get("/", (req, res) => {
    Provincia.findAll({
        attributes: [ 'id','codigo','nombre']
    }).then(list => {
        res.json(list)
    })
})

router.post("/create", (req, res) => {
    Provincia.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre
    }).then(provincia => {
        res.json(provincia)
    }).catch(error => {
        res.json(error)
    })
})

router.delete('/delete/:id', (req, res) => {
    Provincia.destroy({
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
    Provincia.update({
        codigo: req.body.codigo,
        nombre: req.body.nombre
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