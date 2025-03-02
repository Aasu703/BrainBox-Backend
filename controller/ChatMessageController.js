const ChatMessage = require("../models/ChatMessage");
const User = require("../models/User");

exports.getMessages = async (req, res) => {
    try {
        const { roomId } = req.query;
        const messages = await ChatMessage.findAll({
            where: { roomId },
            include: [{ model: User, as: "Sender" }],
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};