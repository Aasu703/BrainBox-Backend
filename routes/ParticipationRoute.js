const express = require('express');
const router = express.Router();
const ParticipationController = require('../controllers/ParticipationController');

router.post('/participations', ParticipationController.addParticipation);
router.get('/participations', ParticipationController.getParticipations);

module.exports = router;