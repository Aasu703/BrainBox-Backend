const express = require('express');
const router = express.Router();
const MaterialController = require('../controller/MaterialController');

router.post('/materials', MaterialController.uploadMaterial);
router.get('/materials', MaterialController.getMaterials);

module.exports = router;