const express = require('express');
const router = express.Router();
const MaterialController = require('../controller/MaterialController');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/materials', authenticateToken, upload.single('file'), MaterialController.uploadMaterial);
router.get('/materials', authenticateToken, MaterialController.getMaterials);

module.exports = router;