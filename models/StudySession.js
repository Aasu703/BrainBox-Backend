const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");
const VirtualRoom = require("./VirtualRoom");

const StudySession = sequelize.define("StudySession", {
    Session_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Room_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: VirtualRoom, key: "Room_ID" },
        onDelete: "CASCADE"
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
}, { timestamps: true });


StudySession.belongsTo(VirtualRoom, { foreignKey: "Room_ID", onDelete: "CASCADE" });

module.exports = StudySession;
