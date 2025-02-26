const { DataTypes } = require('sequelize');
const sequelize = require('../backend/db');

const Material = sequelize.define('Material', {
    Material_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Uploaded_By: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Material_Type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Uploaded_Date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Material;