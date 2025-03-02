const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");
const User = require("./User");  // ✅ Imported User model

const Materials = sequelize.define("Materials", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    filePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileType: {
        type: DataTypes.STRING,
    },
    uploadedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    uploadedBy: {  // ✅ Renamed for clarity
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" },
        onDelete: "CASCADE"
    },
});

module.exports = Materials;
