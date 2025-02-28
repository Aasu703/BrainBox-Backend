module.exports = (sequelize, DataTypes) => {
    const VirtualRoom = sequelize.define('VirtualRoom', {
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
            allowNull: false
        },
        Created_Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Room_Type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    // Define associations if needed (e.g., with User for Created_By)
    VirtualRoom.associate = (models) => {
        VirtualRoom.belongsTo(models.User, { foreignKey: 'Created_By', as: 'Creator' });
    };

    return VirtualRoom;
};