const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/camioneros/listarCamioneros.html'));
})

//crear producto /products/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/camioneros/crearCamioneros.html'));
})

//editar producto /products/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/camioneros/editarCamioneros.html'));
})


module.exports = router;