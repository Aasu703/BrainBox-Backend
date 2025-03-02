const express = require('express');
const router = express.Router();
const VirtualRoomController = require('../controller/VirtualRoomController');
const authenticateToken = require('../middleware/auth');

router.post('/rooms', authenticateToken, VirtualRoomController.createRoom);
router.get('/rooms', authenticateToken, VirtualRoomController.getRooms);
router.post('/signaling/:roomId', authenticateToken, VirtualRoomController.signaling); // Placeholder for WebRTC

module.exports = router;