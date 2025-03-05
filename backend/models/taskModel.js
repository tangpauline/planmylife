const pool = require("../utils/db");

// Add task to database
const addTask = async (userId, taskName, description, status, dueDate) => {
    const query = "INSERT INTO tasks (user_id, task_name, description, status, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *;";
    const values = [userId, taskName, description, status, dueDate];
    const { rows } = await pool.query(query, values);
    return rows[0]; // Return inserted task
}

// Fetch all tasks by user
const getTasksByUser = async (userId) => {
    const query = "SELECT * FROM tasks WHERE user_id = $1 ORDER BY due_date;";
    const values = [userId];
    const { rows } = await pool.query(query, values);
    return rows;
}

// Fetch all tasks by user, TODAY
const getTasksByUserToday = async (userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const query = "SELECT * FROM tasks WHERE user_id = $1 AND due_date = $2 ORDER BY due_date;";
    const values = [userId, today];
    const { rows } = await pool.query(query, values);
    return rows;
}

// Delete task with taskId from database
const deleteTaskById = async (taskId) => {
    try {
        const query = "DELETE FROM tasks WHERE task_id = $1;";
        const values = [taskId];
        const result = await pool.query(query, values);
        console.log("delete query result: ", result);
        return result.rowCount > 0;
    } catch (error) {
        console.error("Error deleting from database:", error);
    }
}

module.exports = { addTask, getTasksByUser, getTasksByUserToday, deleteTaskById };