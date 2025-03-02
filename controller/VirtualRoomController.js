const sequelize = require('../backend/db');
const VirtualRoom = require('../models/VirtualRoom');

exports.createRoom = async (req, res) => {
    try {
        const room = await VirtualRoom.create({
            Room_Name: req.body.Room_Name,
            Created_By: req.user.id,
            Created_Date: new Date(),
            Room_Type: req.body.Room_Type || 'study',
        });
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await VirtualRoom.findAll({
            include: [{ model: sequelize.models.User, as: 'Creator' }],
        });
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Placeholder for WebRTC signaling (implement real signaling server)
exports.signaling = async (req, res) => {
    try {
        const { roomId } = req.params;
        const { offer } = req.body;
        // Simulate signaling (store offer in memory or use a real signaling server)
        res.status(200).json({ answer: offer }); // Mock answer for testing
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};