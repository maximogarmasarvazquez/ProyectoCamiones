const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Paquete extends Model {}

Paquete.init({
    codigo: {type: DataTypes.STRING},
    direccionDestinario: {type: DataTypes.STRING},
    destinario: {type: DataTypes.STRING},
    descripcion: {type: DataTypes.STRING}
}, {
    sequelize,
    modelName: 'paquete',
    tableName: 'paquetes'
})

module.exports = Paquete