const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController"); // Ensure correct path
const authMiddleware = require("../middleware/auth"); // Ensure correct path

// Route for user signup
router.post("/signup", UserController.signup);

// Route for user login
router.post("/login", UserController.login);

// Route for getting all users, protected by auth middleware
router.get("/users", authMiddleware, UserController.getUsers); // Make sure `getUsers` is defined

module.exports = router;