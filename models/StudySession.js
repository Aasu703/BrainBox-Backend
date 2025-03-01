module.exports = (sequelize, DataTypes) => {
    const StudySession = sequelize.define('StudySession', {
        Session_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Room_ID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Session_Date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        End_time: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: true
    });

    StudySession.associate = (models) => {
        StudySession.belongsTo(models.VirtualRoom, { foreignKey: 'Room_ID', as: 'Room' });
    };

    return StudySession;
};  