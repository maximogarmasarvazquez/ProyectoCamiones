const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/listarPaquetes.html'));
})

router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/crearPaquetes.html'));
})

router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/paquetes/editarPaquetes.html'));
})


module.exports = router;