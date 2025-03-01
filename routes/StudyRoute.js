const express = require('express');
const router = express.Router();
const StudyController = require('../controllers/StudyController');

router.post('/sessions', StudyController.createSession);
router.get('/sessions', StudyController.getSessions);

module.exports = router;