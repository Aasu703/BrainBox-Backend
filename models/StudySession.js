const { DataTypes } = require('sequelize');
const sequelize = require('../backend/db');

const StudySession = sequelize.define('StudySession', {
    Session_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Room_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Session_Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Start_time: {
        type: DataTypes.DATE,
        allowNull: false
    },
    End_time: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = StudySession;