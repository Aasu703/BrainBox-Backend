const express = require('express');
const router = express.Router();
const MaterialController = require('../controllers/MaterialController');

router.post('/upload', MaterialController.uploadMaterial);
router.get('/user', MaterialController.getUserMaterials);

module.exports = router;