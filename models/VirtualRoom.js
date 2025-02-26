const { DataTypes } = require('sequelize');
const sequelize = require('../backend/db');

const VirtualRoom = sequelize.define('VirtualRoom', {
    Room_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Room_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Created_By: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Created_Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Room_Type: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = VirtualRoom;