const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('purchase', {
    state: {
      type: DataTypes.ENUM('en transito', 'recibida', 'cancelada'),
      allowNull: false,
      defaultValue: 'en transito',
    },
    paymentExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  });
};