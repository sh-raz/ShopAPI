const { DataTypes } = require('sequelize');
    const sequelize = require('../config/database');

const Furniture = sequelize.define('Furniture', {
    id: {
type:DataTypes.INTEGER,
autoIncrement: true,
primaryKey: true
    },
    name: {
        type:DataTypes.STRING,
        allowNull: false
    },
    designer: {
        type:DataTypes.STRING,
        allowNull: false
    },
    price: {
        type:DataTypes.DOUBLE,
        allowNull: false
    },
    details: {
        type:DataTypes.STRING,
        allowNull: true
    },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull: false
    },

});
module.exports = Furniture;