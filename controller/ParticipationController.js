const sequelize = require('../backend/db');
const Participation = require('../models/Participation');

exports.addParticipation = async (req, res) => {
    try {
        const participation = await Participation.create({
            UserUser_ID: req.user.id,
            Virtual_RoomRoom_ID: req.body.Virtual_RoomRoom_ID,
        });
        res.status(201).json(participation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getParticipations = async (req, res) => {
    try {
        const participations = await Participation.findAll({
            where: { UserUser_ID: req.user.id },
        });
        res.status(200).json(participations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};