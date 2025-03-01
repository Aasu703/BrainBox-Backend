const db = require("../backend/db"); // Import the db object containing initialized models

exports.createRoom = async (req, res) => {
    try {
        const { Room_Name, Created_By, Room_Type } = req.body;
        if (!Room_Name || !Created_By || !Room_Type) {
            return res.status(400).json({ message: "Room_Name, Created_By, and Room_Type are required" });
        }
        const room = await db.VirtualRoom.create({ Room_Name, Created_By, Created_Date: new Date(), Room_Type });
        res.status(201).json({ message: "Room created successfully", room });
    } catch (error) {
        console.error("Create room error:", error);
        res.status(400).json({ error: error.message });
    }
};

exports.getRooms = async (req, res) => {
    try {
        const rooms = await db.VirtualRoom.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        console.error("Get rooms error:", error);
        res.status(400).json({ error: error.message });
    }
};