const { DataTypes } = require("sequelize");
const sequelize = require("../backend/db");
const User = require("./User");

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // description: {
    //     type: DataTypes.TEXT,
    //     allowNull: true
    // },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    // progress: {
    //     type: DataTypes.INTEGER,
    //     defaultValue: 0,
    //     validate: { min: 0, max: 100 }
    // },
    status: {
        type: DataTypes.ENUM("pending", "in-progress", "completed"),
        defaultValue: "pending"
    },
    assignedTo: {  // ✅ Renamed for consistency
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: User, key: "id" },
        onDelete: "CASCADE"
    },
    assignedBy: {  // ✅ Renamed for consistency
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: User, key: "id" },
        onDelete: "SET NULL"
    },
}, { timestamps: true });

Task.belongsTo(User, { foreignKey: "assignedTo", as: "Assignee", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "assignedBy", as: "Assigner", onDelete: "SET NULL" });

module.exports = Task;
