const sequelize = require("../backend/db");
const Task = require("../models/Task");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 🔹 Middleware: Extract user from token
const getUserFromToken = (req) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};

// ✅ Create a Task
exports.createTask = async (req, res) => {
    try {
        const { title, description, dueDate, assignedTo, progress, status } = req.body;
        const user = getUserFromToken(req);
        if (!user) return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });

        // 🔹 Validate assignedTo user
        let finalAssignedTo = assignedTo || user.id;
        if (isNaN(finalAssignedTo)) return res.status(400).json({ error: "Invalid assignedTo user ID" });

        const assignedUser = await User.findByPk(finalAssignedTo);
        if (!assignedUser) return res.status(404).json({ error: "Assigned user not found" });

        // 🔹 Only teachers can assign tasks to others
        if (user.role !== "teacher" && finalAssignedTo !== user.id) {
            return res.status(403).json({ message: "Unauthorized: Only teachers can assign tasks" });
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
        res.status(500).json({ error: error.message });
    }
};

// ✅ Get Tasks (Student sees assigned tasks, Teacher sees all)
exports.getTasks = async (req, res) => {
    try {
        const user = getUserFromToken(req);
        if (!user) return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });

        const whereClause = user.role === "student" ? { assignedTo: user.id } : {};
        const tasks = await Task.findAll({
            where: whereClause,
            include: [{ model: User, as: "Assignee" }, { model: User, as: "Assigner" }],
        });

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Update Task (Students can update progress, Teachers can update everything)
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { progress, status, dueDate } = req.body;
        const user = getUserFromToken(req);
        if (!user) return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // 🔹 Students can only update their progress
        if (user.role === "student") {
            if (task.assignedTo !== user.id) return res.status(403).json({ message: "Unauthorized" });
            task.progress = progress || task.progress;
        } else if (user.role === "teacher") {
            task.progress = progress || task.progress;
            task.status = status || task.status;
            task.dueDate = dueDate || task.dueDate;
        } else {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await task.save();
        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ Delete Task (Only the teacher who assigned the task can delete it)
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const user = getUserFromToken(req);
        if (!user) return res.status(401).json({ message: "Unauthorized: Invalid or missing token" });

        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        if (user.role !== "teacher" || task.assignedBy !== user.id) {
            return res.status(403).json({ message: "Unauthorized: Only the assigning teacher can delete the task" });
        }

        await task.destroy();
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
