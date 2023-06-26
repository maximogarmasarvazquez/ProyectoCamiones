const { Camionero, Paquete, Provincia, Camion} = require('./models')

Provincia.hasMany(Paquete, { foreignKey: 'provinciaId', as: 'paquetes' })
Paquete.belongsTo(Provincia, { foreignKey: 'provinciaId', as: 'provincia' })

 Camionero.hasMany(Paquete,{ foreignKey: 'camioneroId' })
  Paquete.belongsTo(Camionero,{ foreignKey: 'camioneroId' })


  Camionero.belongsToMany(Camion,{through: 'CamioneroCamion'})
Camion.belongsToMany(Camionero,{through: 'CamioneroCamion'})