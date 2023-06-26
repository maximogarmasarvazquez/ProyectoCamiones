const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Camion extends Model {}

Camion.init({
    matricula: { type: DataTypes.STRING },
    modelo: {type: DataTypes.STRING},
    tipo:{type: DataTypes.STRING},
    potencia: {type: DataTypes.STRING},
}, {
    sequelize,
    modelName: 'camion',
    tableName: 'camiones'
})

module.exports = Camion