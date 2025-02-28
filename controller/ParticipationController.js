const db = require("../backend/db"); // Import the db object containing initialized models

exports.addParticipation = async (req, res) => {
    try {
        const { UserUser_ID, Virtual_RoomRoom_ID } = req.body;
        if (!UserUser_ID || !Virtual_RoomRoom_ID) {
            return res.status(400).json({ message: "UserUser_ID and Virtual_RoomRoom_ID are required" });
        }
        const participation = await db.Participation.create({ UserUser_ID, Virtual_RoomRoom_ID });
        res.status(201).json({ message: "Participation added successfully", participation });
    } catch (error) {
        console.error("Add participation error:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.getParticipations = async (req, res) => {
    try {
        const participations = await db.Participation.findAll({
            include: [{ model: db.User, as: 'Participant' }, { model: db.VirtualRoom, as: 'Room' }]
        });
        res.status(200).json(participations);
    } catch (error) {
        console.error("Get participations error:", error);
        res.status(400).json({ error: error.message });
    }
};