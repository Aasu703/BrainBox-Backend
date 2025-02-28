module.exports = (sequelize, DataTypes) => {
    const ChatMessage = sequelize.define("ChatMessage", {
        Message_ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Room_ID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Sent_By: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        Message_Content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        Sent_Time: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        timestamps: true
    });

    return ChatMessage;
};