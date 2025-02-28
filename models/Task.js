module.exports = (sequelize, DataTypes) => {
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
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        progress: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            validate: { min: 0, max: 100 }
        },
        status: {
            type: DataTypes.ENUM("pending", "in-progress", "completed"),
            defaultValue: "pending"
        },
        assignedTo: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        assignedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
    }, {
        timestamps: true
    });

    Task.associate = (models) => {
        Task.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'Assignee' });
        Task.belongsTo(models.User, { foreignKey: 'assignedBy', as: 'Assigner' });
    };

    return Task;
};