module.exports = (sequelize, DataTypes) => {
    const Material = sequelize.define("Material", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fileName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        filePath: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fileType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        uploadedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: true
    });

    Material.associate = (models) => {
        Material.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Material;
};