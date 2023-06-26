//index
const router = require('express').Router();
const path = require('path');

const camionerosRouter= require('./camioneros.routes')
const camionesRouter= require('./camiones.routes')
const paquetesRouter= require('./paquetes.routes')
const provinciasRouter= require('./provincias.routes')


router.get('/', (req, res) => {
    res.sendFile(path.resolve('./views/index.html'));
})

router.use('/camioners', camionerosRouter)
router.use('/camions', camionesRouter)
router.use('/paquets', paquetesRouter)
router.use('/provincis', provinciasRouter)


module.exports = router;