const { addTask, getTasksByUser, getTasksByUserToday, deleteTaskById } = require("../models/taskModel");

// POST /data/task/
const createTask = async (req, res) => {
    try {
        const { user_id, task_name, description, status, due_date } = req.body;
        const newTask = await addTask(user_id, task_name, description, status, due_date);
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// GET /data/tasks
const getUserTasks = async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const tasks = await getTasksByUser(user_id);
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// GET /data/tasks/today
const getUserTasksToday = async (req, res) => {
    try {
        const { user_id } = req.query;
        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }
        const tasks = await getTasksByUserToday(user_id);
        res.json(tasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Server error" });
    }
}

// DELETE /data/task
const deleteTask = async (req, res) => {
    const { task_id } = req.query;
    console.log("task id: ", task_id);
    try {
        await deleteTaskById(task_id);
        res.json({success: "Deleted."})
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = { createTask, getUserTasks, getUserTasksToday, deleteTask };