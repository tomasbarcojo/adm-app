const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('supplier', {
    businessName: {
      type: DataTypes.TEXT,
      allowNull: false,     
    },
    cuit: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        message: "CUIT must be unique.",
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altPhone: {
      type: DataTypes.STRING,
      allowNull: true,
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
    obs: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });
};