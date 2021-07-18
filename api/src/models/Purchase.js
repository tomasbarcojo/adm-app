const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('purchase', {
    state: {
      type: DataTypes.ENUM('en transito', 'finalizada', 'cancelada', 'procesando', 'completa', 'despacho'),
      allowNull: false,
      defaultValue: 'en transito',
    }
  });
};