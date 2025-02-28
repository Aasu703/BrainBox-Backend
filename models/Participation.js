module.exports = (sequelize, DataTypes) => {
    const Participation = sequelize.define('Participation', {
        UserUser_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Virtual_RoomRoom_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: true // Optional: Add timestamps if needed
    });

    // Define associations if needed (e.g., with User and VirtualRoom)
    Participation.associate = (models) => {
        Participation.belongsTo(models.User, { foreignKey: 'UserUser_ID', as: 'Participant' });
        Participation.belongsTo(models.VirtualRoom, { foreignKey: 'Virtual_RoomRoom_ID', as: 'Room' });
    };

    return Participation;
};