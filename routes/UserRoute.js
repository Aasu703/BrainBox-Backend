const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");
const authMiddleware = require("../middleware/auth");

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/users", authMiddleware, UserController.getUsers);

module.exports = router;