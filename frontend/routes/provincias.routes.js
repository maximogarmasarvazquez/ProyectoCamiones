const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/listarProvincias.html'));
})

router.get('/create', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/crearProvincias.html'));
})

router.get('/update/:id', (req, res) => {
    res.sendFile(path.resolve('./views/provincias/editarProvincias.html'));
})


module.exports = router;