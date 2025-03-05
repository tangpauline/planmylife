import React from 'react';
import { useAuth } from './AuthContext';
import '../styles/TaskFormModal.css';

import axios from 'axios';

const TaskFormModal = ({ showModal, onClose, onSubmit }) => {
    const { user } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                user_id: user.user_id,
                task_name: e.target.name.value,
                description: e.target.description.value,
                status: e.target.status.value,
                due_date: e.target.due_date.value,
                withCredentials: true,
            }
            await axios.post(process.env.REACT_APP_SERVER_URL + "/data/task", body, 
            {
                headers: {
                    "ngrok-skip-browser-warning":"any"
                },
                withCredentials: true
            });
        } catch (error) {
            console.error("Error adding task:", error);
        }
        onSubmit();
    }

    if (!showModal) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Task</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input type="text" name="name" placeholder='Task' required/>
                    </div>
                    <div>
                        <textarea name="description" placeholder='Description (optional)'/>
                    </div>
                    <div>
                        <input type="date" name="due_date" placeholder='Select date' />
                    </div>
                    <div>
                        <select name="status">
                            <option value="" disabled selected>Status</option>
                            <option value="To do">To do</option>
                            <option value="In progress">In progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="buttons-div">
                        <button className="close-btn" type="button" onClick={onClose}>Close</button>
                        <button className="sub-btn" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default TaskFormModal;