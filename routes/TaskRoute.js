const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

router.post('/create', TaskController.createTask);
router.get('/all', TaskController.getTasks);
router.put('/update/:id', TaskController.updateTask);
router.delete('/delete/:id', TaskController.deleteTask);

module.exports = router;