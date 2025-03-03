const express = require('express');
const router = express.Router();
const MaterialController = require('../controller/MaterialController');
// const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/multer');

router.post('/', upload.single('filePath'), MaterialController.createMaterial); // /api/materials/
router.get('/getmaterial', MaterialController.getAllMaterials); // /api/materials/getmaterial
router.delete('/delete/:id', MaterialController.deleteMaterial); // /api/materials/delete/:id

module.exports = router;