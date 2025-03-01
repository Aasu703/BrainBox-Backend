const express = require('express');
const router = express.Router();
const MaterialController = require('../controller/MaterialController');

router.post('/upload', MaterialController.uploadMaterial);
router.get('/user', MaterialController.getUserMaterials);

module.exports = router;