const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();

async function signup(req, res) {
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const user = await User.create({ name, email, password, role });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            message: "User created successfully",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// controllers/UserController.js
async function login(req, res) {
    try {
        const { email, password } = req.body;

        console.log("Login attempt with:", { email, password }); // Debug log

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(400).json({ error: error.message || "Login failed" });
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.findAll({ attributes: ["id", "name", "email", "role"] });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { signup, login, getUsers };