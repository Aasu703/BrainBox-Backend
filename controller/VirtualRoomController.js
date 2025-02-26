const VirtualRoom = require('../models/VirtualRoom');

exports.createRoom = async (req, res) => {
    try {
        const room = await VirtualRoom.create(req.body);
        res.status(201).json(room);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await VirtualRoom.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};