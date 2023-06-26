const express = require('express')
const { Camion, Provincia, Paquete, Camionero, CamioneroCamion } = require('./database/models')
const app = express()
const cors = require('cors')
const port = 4000

const sequelize = require('./database/sequelize')
const router = require('./routes')
require('./database/associations')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/', router)

app.listen(port, () => {
    console.log(`Server en puerto ${port}`)

    sequelize.sync({ force: false }).then(() => {
        console.log('Sincronizado')
    })
})