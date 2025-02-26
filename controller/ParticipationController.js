const Participation = require('../models/Participation');

exports.addParticipation = async (req, res) => {
    try {
        const participation = await Participation.create(req.body);
        res.status(201).json(participation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getParticipations = async (req, res) => {
    try {
        const participations = await Participation.findAll();
        res.status(200).json(participations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};