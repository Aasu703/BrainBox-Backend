const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // Import the model
require("dotenv").config();

async function signup(req, res) {
    console.log("Received signup request with body:", req.body); // Debug log
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            console.log("Validation failed: Missing fields");
            return res.status(400).json({ message: "All fields (name, email, password, role) are required" });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            console.log("Email already registered:", email);
            return res.status(400).json({ message: "Email already registered" });
        }

        const user = await User.create({ name, email, password, role });
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Signup successful, token generated:", token);
        res.status(201).json({
            message: "User created successfully",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("Signup error:", error.stack); // Debug error
        res.status(400).json({ error: error.message });
    }
}

async function login(req, res) {
    console.log("Received login request with body:", req.body); // Debug log
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            console.log("Validation failed: Missing email or password");
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });
        console.log("Found user:", user); // Debug log
        if (!user) {
            console.log("User not found for email:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await user.comparePassword(password);
        console.log("Password match:", isMatch); // Debug log
        if (!isMatch) {
            console.log("Password mismatch for user:", email);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("Login successful, token generated:", token);
        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("Login error:", error.stack); // Debug error
        res.status(400).json({ error: error.message });
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