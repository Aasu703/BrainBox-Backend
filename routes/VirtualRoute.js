const express = require('express');
const router = express.Router();
const VirtualRoomController = require('../controllers/VirtualRoomController');

router.post('/rooms', VirtualRoomController.createRoom);
router.get('/rooms', VirtualRoomController.getRooms);

module.exports = router;