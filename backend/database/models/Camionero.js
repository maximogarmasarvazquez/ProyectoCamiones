const { Model, DataTypes } = require('sequelize')
const sequelize = require('../sequelize')

class Camionero extends Model {}

Camionero.init({
    dni: { type: DataTypes.STRING,},
    nombre: {type: DataTypes.STRING},
    telefono:{type: DataTypes.STRING},
    direccion: {type: DataTypes.STRING},
    salario:  {type: DataTypes.FLOAT},
    poblacion: {type: DataTypes.STRING}
}, {
    sequelize,
    modelName: 'camionero',
    tableName: 'camioneros'
})

module.exports = Camionero