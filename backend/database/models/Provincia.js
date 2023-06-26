const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Provincia extends Model {}

Provincia.init({
    codigo: {type: DataTypes.STRING},
    nombre: {type: DataTypes.STRING}   
}, {
    sequelize,
    modelName: 'provincia',
    tableName: 'provincias'
})

module.exports = Provincia