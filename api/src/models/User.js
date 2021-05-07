const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,     
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,     
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        message: "Email must be unique.",
      },
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        message: "Username must be unique.",
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};