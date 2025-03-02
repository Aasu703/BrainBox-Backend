const sequelize = require('../backend/db');
const StudySession = require('../models/StudySession');

exports.createSession = async (req, res) => {
    try {
        const session = await StudySession.create({
            Room_ID: req.body.Room_ID,
            Session_Date: req.body.Session_Date,
            Start_time: req.body.Start_time,
            End_time: req.body.End_time,
        });
        res.status(201).json(session);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getSessions = async (req, res) => {
    try {
        const sessions = await StudySession.findAll({
            where: { Room_ID: req.query.roomId || 1 },
        });
        res.status(200).json(sessions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};