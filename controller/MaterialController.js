const db = require('../backend/db');

const MaterialController = {
    getMaterials: async (req, res) => {
        const userId = req.user.id; // From authenticateToken
        try {
            const result = await db.query(
                'SELECT id, filePath, fileName, Material_Type, Uploaded_Date FROM Material WHERE Uploaded_By = $1',
                [userId]
            );
            res.json(result.rows);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },
    uploadMaterial: async (req, res) => {
        const { Material_Type } = req.body;
        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const userId = req.user.id;
        try {
            const result = await db.query(
                'INSERT INTO Material (filePath, fileName, Material_Type, Uploaded_By, Uploaded_Date) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
                [filePath, fileName, Material_Type, userId]
            );
            res.json(result.rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

module.exports = MaterialController;