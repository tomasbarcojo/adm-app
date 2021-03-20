const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('client', {
    businessName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cuit: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        message: "CUIT must be unique.",
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    CP: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};