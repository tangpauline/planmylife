import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import TaskFormModal from '../components/TaskFormModal';
import TaskCalendar from '../components/TaskCalendar';

import axios from 'axios';

import '../styles/PlannerPage.css'

const PlannerPage = () => {
    const { user } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user, tasks]);

    // Fetch tasks from database
    const fetchTasks = async () => {
        try {
            // console.log(user)
            const params = {
                user_id: user.user_id
            }
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/data/tasks", {
                params: params, 
                // withCredentials: true
            });
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Form submission: close modal and refresh page to load tasks
    const handleSubmit = () => {
        setShowModal(false);
        fetchTasks();
    }

    return (
        <div className="planner-page-div">
            <header className="planner-page-header">
                <h1>planmylife</h1>
            </header>
            <main>
                <div className="addTaskButton">
                    <button className="add-task-button" onClick={() => setShowModal(true)}>Add Task</button>
                </div>
                <TaskFormModal
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
                <TaskCalendar tasks={tasks} onFetch={fetchTasks}/>
            </main>
        </div>
    )
}

export default PlannerPage