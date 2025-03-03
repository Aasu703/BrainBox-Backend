const db = require('../backend/db');
const Material = require('../models/Material');

exports.createMaterial = async (req, res) => {
    try {
        const { fileType, uploadedBy } = req.body;
        const filePath = req.file ? req.file.path : null;

        if (!filePath || !uploadedBy) {
            return res.status(400).json({ message: "File path and uploader are required" });
        }

        const material = await Material.create({ filePath, fileType, uploadedBy });
        res.status(201).json(material);
    } catch (error) {
        res.status(500).json({ message: "Error uploading material", error: error.message });
    }
};

exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ message: "Error fetching materials", error: error.message });
    }
};

exports.getMaterialById = async (req, res) => {
    try {
        const { id } = req.params;
        const material = await Material.findByPk(id);
        
        if (!material) {
            return res.status(404).json({ message: "Material not found" });
        }
        
        res.status(200).json(material);
    } catch (error) {
        res.status(500).json({ message: "Error fetching material", error: error.message });
    }
};

exports.deleteMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        const material = await Material.findByPk(id);
        
        if (!material) {
            return res.status(404).json({ message: "Material not found" });
        }
        
        await material.destroy();
        res.status(200).json({ message: "Material deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting material", error: error.message });
    }
};