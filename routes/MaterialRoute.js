const express = require('express');
const router = express.Router();
const MaterialController = require('../controller/MaterialController');
// const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/multer');

router.post('/materials', upload.single('filePath'), MaterialController.createMaterial);

router.get('/getmaterial',  MaterialController.getAllMaterials);

module.exports = router;