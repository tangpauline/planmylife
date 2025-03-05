const express = require("express");
const { createTask, getUserTasks, getUserTasksToday, deleteTask } = require("../controllers/taskController");

const router = express.Router();

router.post("/task", createTask);
router.get("/tasks", getUserTasks);
router.get("/tasks/today", getUserTasksToday);
router.delete("/task", deleteTask);

module.exports = router;