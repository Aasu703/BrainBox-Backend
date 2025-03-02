const sequelize = require("../backend/db");
const Task = require("../models/Task");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignedTo, progress, status } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = jwt.verify(token, process.env.JWT_SECRET);
        
        // Validate assignedTo
        const finalAssignedTo = assignedTo || user.id;
        if (!finalAssignedTo || isNaN(finalAssignedTo)) {
            return res.status(400).json({ error: "assignedTo must be a valid user ID" });
        }
        
        if (user.role !== "teacher" && finalAssignedTo !== user.id) {
            return res.status(403).json({ message: "Unauthorized to create this task" });
        }

        const task = await Task.create({
            title,
            description,
            dueDate,
            progress: progress || 0,
            status: status || "pending",
            assignedTo: finalAssignedTo,
            assignedBy: user.id
        });

        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Other methods (getTasks, updateTask, deleteTask) remain unchanged
exports.getTasks = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = jwt.verify(token, process.env.JWT_SECRET);
        const whereClause = user.role === "student" ? { assignedTo: user.id } : {};
        const tasks = await Task.findAll({
            where: whereClause,
            include: [{ model: User, as: 'Assignee' }, { model: User, as: 'Assigner' }],
        });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { progress, status, dueDate } = req.body;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = jwt.verify(token, process.env.JWT_SECRET);
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        if (user.role === "student" && task.assignedTo !== user.id) return res.status(403).json({ message: "Unauthorized" });

        task.progress = progress || task.progress;
        task.status = status || task.status;
        task.dueDate = dueDate || task.dueDate;
        await task.save();

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const user = jwt.verify(token, process.env.JWT_SECRET);
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        if (user.role !== "teacher" || task.assignedBy !== user.id) return res.status(403).json({ message: "Unauthorized" });

        await task.destroy();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

