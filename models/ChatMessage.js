const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");
const User = require("./User");

const ChatMessage = sequelize.define("ChatMessage", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sentBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

ChatMessage.belongsTo(User, { as: "Sender", foreignKey: "sentBy" });

module.exports = ChatMessage;