const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");

const Material = sequelize.define("Materials", {
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
});

module.exports = Material;