const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,     
    },
    lastname: {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },    
  });
};