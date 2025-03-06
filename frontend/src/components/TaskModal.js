import React from 'react';
import moment from 'moment';
import '../styles/TaskModal.css';
import axios from 'axios';

const TaskModal = ({ task, onClose, onDelete }) => {
    if (!task) return null; // If no task is passed, don't render the modal

    const dueDateStr = moment(task.due_date).format("MM/DD/YYYY");

    const handleDelete = async () => {
        try {
            const params = {
                task_id: task.task_id
            }
            await axios.delete(process.env.REACT_APP_SERVER_URL + "/data/task/", {
                params: params
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
        onDelete();
        onClose();
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{task.task_name}</h2>
                <p>{task.description}</p>
                <p>{task.status}</p>
                <p>{dueDateStr}</p>
                <div className="modal-buttons">
                    <button className="close-btn" onClick={onClose}>Close</button>
                    <button className="del-btn" onClick={handleDelete}>Delete</button> 
                </div>
                
            </div>
        </div>
    );
};

export default TaskModal;