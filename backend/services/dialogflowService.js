const { addTask, getTasksByUser, getTasksByUserToday, deleteTaskById } = require("../models/taskModel");
const { findFuzzyRow } = require("./taskService");

// Process the intent and extract parameters and actions for handler
const processIntent = async (requestBody) => {
    console.log("request body:", requestBody);

    const queryResult = requestBody.queryResult;
    const action = queryResult.action;
    const parameters = queryResult.parameters;
    const user_id = requestBody.originalDetectIntentRequest.payload.userId;

    // console.log('Action:', action);
    // console.log('Parameters:', parameters);
    // console.log('user id:', user_id);

    const actionHandlers = {
        add_task: handleAddTask,
        delete_task: handleDeleteTask,
    };

    const handler = actionHandlers[action];

    if (handler) {
        return await handler(user_id, parameters);
    } else {
        return {
            fulfillmentText: 'Sorry, I don’t know how to handle that request.',
            source: 'webhook',
        };
    }
}

// Handler functions:

// Action: add_task. Add task into database
const handleAddTask = async (user_id, parameters) => {
    try {
        const task = parameters["task-name"];
        const dueDate = (parameters["date-time"]);

        if (!dueDate) {
            return {
                fulfillmentText: `Please add a date/time and try again, or, add it manually`,
                source: 'webhook',
            };
        }
        
        const formattedDate = new Date(dueDate);
        formattedDate.setHours(0, 0, 0, 0);

        await addTask(user_id, task, "", "", formattedDate);
        
        return {
            fulfillmentText: `Task "${task}" has been added successfully.`,
            source: 'webhook',
        };
    } catch (error) {
        console.error('Error handling add task:', error);
        return {
            fulfillmentText: 'There was an error adding your task. Please try again or add it manually.',
            source: 'webhook',
        };
    }
}

const handleDeleteTask = async (user_id, parameters) => {
    try {
        const task = parameters["task-name"];
        const dueDate = parameters["date-time"];

        const allTasks = await getTasksByUser(user_id);

        const matchedTask = findFuzzyRow(allTasks, task);
        console.log("fuzzy matched: ", matchedTask);

        // get the task id from that row
        const task_id = matchedTask.task_id;

        // call delete by task id
        const isDeleted = await deleteTaskById(task_id);
        if (isDeleted) {
            return {
                fulfillmentText: `Task "${task}" has been removed successfully.`,
                source: 'webhook',
            }
        } else {
            return {
                fulfillmentText: 'There was an error deleting your task. Please try again or delete it manually.',
                source: 'webhook',
            };
        }
    } catch (error) {
        console.error('Error handling add task:', error);
        return {
            fulfillmentText: 'There was an error deleting your task. Please try again or delete it manually.',
            source: 'webhook',
        };
    }
}


module.exports = { processIntent };