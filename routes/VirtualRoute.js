const express = require('express');
const router = express.Router();
const VirtualRoomController = require('../controller/VirtualRoomController');

router.post('/rooms', VirtualRoomController.createRoom);
router.get('/rooms', VirtualRoomController.getRooms);

module.exports = router;