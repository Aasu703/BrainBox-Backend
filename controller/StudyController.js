const StudySession = require('../models/StudySession');

exports.createSession = async (req, res) => {
    try {
        const session = await StudySession.create(req.body);
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSessions = async (req, res) => {
    try {
        const sessions = await StudySession.findAll();
        res.status(200).json(sessions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};