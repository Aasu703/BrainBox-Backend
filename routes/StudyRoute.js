const express = require('express');
const router = express.Router();
const StudyController = require('../controller/StudyController');
const authenticateToken = require('../middleware/auth');

router.post('/sessions', authenticateToken, StudyController.createSession);
router.get('/sessions', authenticateToken, StudyController.getSessions);

module.exports = router;