// backend/controllers/MaterialController.js
const Material = require('../models/Material');
const multer = require('multer'); // For file uploads
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in 'uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
});

const upload = multer({ storage: storage });

exports.uploadMaterial = [
    // Middleware to verify JWT token
    (req, res, next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Expect "Bearer <token>"

        if (!token) return res.status(401).json({ message: "No token provided" });

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid token" });
            req.user = user; // Attach user to request
            next();
        });
    },
    upload.single('file'), // Handle file upload
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No file uploaded" });
            }

            const material = await Material.create({
                fileName: req.file.originalname,
                filePath: req.file.path,
                fileType: req.file.mimetype,
                userId: req.user.id, // Link to authenticated user
            });

            res.status(201).json({
                message: "Material uploaded successfully",
                material: {
                    id: material.id,
                    fileName: material.fileName,
                    filePath: material.filePath,
                    fileType: material.fileType,
                    userId: material.userId,
                    uploadedAt: material.uploadedAt,
                },
            });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
];

exports.getUserMaterials = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = jwt.verify(token, process.env.JWT_SECRET);
        const materials = await Material.findAll({ where: { userId: user.id } });

        res.status(200).json(materials);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};