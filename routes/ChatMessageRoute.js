const express = require("express");
const { getMessages } = require("../controller/ChatMessageController");
const router = express.Router();

router.get("/messages", getMessages);

module.exports = router;