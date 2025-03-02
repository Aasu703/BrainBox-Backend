const express = require('express');
const router = express.Router();
const ParticipationController = require('../controller/ParticipationController');
const authenticateToken = require('../middleware/auth');

router.post('/participations', authenticateToken, ParticipationController.addParticipation);
router.get('/participations', authenticateToken, ParticipationController.getParticipations);

module.exports = router;