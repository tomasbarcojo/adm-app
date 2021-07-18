const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('purchaseproduct', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
				min: 0,
			},
    },
    price: {
			type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
				min: 0,
			},
		},
  });
};