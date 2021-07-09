const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('article', {
    articleName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    stockini: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stockalert: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    obs: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });
};