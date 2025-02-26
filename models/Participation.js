const { DataTypes } = require('sequelize');
const sequelize = require('../backend/db');

const Participation = sequelize.define('Participation', {
    UserUser_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Virtual_RoomRoom_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Participation;