const express = require('express');
const router = express.Router();
const ChatMessageController = require('../controllers/ChatMessageController');

router.post('/messages', ChatMessageController.sendMessage);
router.get('/messages', ChatMessageController.getMessages);
router.post('/ai/response', ChatMessageController.getAIResponse);

module.exports = router;