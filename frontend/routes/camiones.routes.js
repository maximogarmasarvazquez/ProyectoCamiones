const router = require('express').Router();
const path = require('path');

//listar productos /products
router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/camiones/listarCamiones.html'));
})

//crear producto /products/create
router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/camiones/crearCamiones.html'));
})

//editar producto /products/update/:id
router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/camiones/editarCamiones.html'));
})

module.exports = router;