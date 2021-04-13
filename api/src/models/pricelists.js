const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('pricelists', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        percentage: {
            type: DataTypes.NUMBER,
            allowNull: false
        }
    });
};