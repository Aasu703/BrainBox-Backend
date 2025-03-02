const express = require('express');
const router = express.Router();
const TaskController = require('../controller/TaskController');
const authenticateToken = require('../middleware/auth');

router.post('/create', authenticateToken, TaskController.createTask);
router.get('/all', authenticateToken, TaskController.getTasks);
router.put('/update/:id', authenticateToken, TaskController.updateTask);
router.delete('/delete/:id', authenticateToken, TaskController.deleteTask);

module.exports = router;