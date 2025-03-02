const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");
const User = require("./User");

const VirtualRoom = sequelize.define("VirtualRoom", {
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
        allowNull: false,
        references: { model: User, key: "id" },
        onDelete: "CASCADE"
    },
    Created_Date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Room_Type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { timestamps: true });

VirtualRoom.belongsTo(User,{foreignKey: "Created_By",onDelete: "CASCADE"});

module.exports = VirtualRoom;
