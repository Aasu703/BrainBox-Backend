const db = require("../backend/db"); // Import the db object containing initialized models

exports.createSession = async (req, res) => {
    try {
        const { Room_ID, Session_Date, Start_time, End_time } = req.body;
        if (!Room_ID || !Session_Date || !Start_time || !End_time) {
            return res.status(400).json({ message: "Room_ID, Session_Date, Start_time, and End_time are required" });
        }
        const session = await db.StudySession.create({ Room_ID, Session_Date, Start_time, End_time });
        res.status(201).json({ message: "Session created successfully", session });
    } catch (error) {
        console.error("Create session error:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.getSessions = async (req, res) => {
    try {
        const sessions = await db.StudySession.findAll({
            include: [{ model: db.VirtualRoom, as: 'Room' }]
        });
        res.status(200).json(sessions);
    } catch (error) {
        console.error("Get sessions error:", error);
        res.status(400).json({ error: error.message });
    }
};