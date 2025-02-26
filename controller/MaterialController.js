const Material = require('../models/Material');

exports.uploadMaterial = async (req, res) => {
    try {
        const material = await Material.create(req.body);
        res.status(201).json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll();
        res.status(200).json(materials);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

