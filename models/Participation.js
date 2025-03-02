const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");
const User = require("./User");
const VirtualRoom = require("./VirtualRoom");

const Participation = sequelize.define("Participation", {
    Participation_ID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true  
    },

    UserUser_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" },
        onDelete: "CASCADE"
    },
    Virtual_RoomRoom_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: VirtualRoom, key: "Room_ID" },
        onDelete: "CASCADE"
    }
}, { timestamps: true });

module.exports = Participation;
