import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useChange } from '../components/TaskContext';

import axios from 'axios';

import '../styles/DashboardPage.css'

const DashboardPage = () => {
    const [todaysTasks, setTodaysTasks] = useState([])
    const { user } = useAuth();
    const { change } = useChange();

    // Fetch tasks from database
    const fetchTasks = async () => {
        try {
            const params = {
                user_id: user.user_id
            }
            const response = await axios.get(process.env.REACT_APP_SERVER_URL + "/data/tasks/today", {
                params: params, 
                withCredentials: true
            });
            setTodaysTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
        console.log("dash effect");
    }, [user, change]);

    return (
        <div className="dashboard-page-div">
            <header className="dashboard-page-header">
                <h1>planmylife</h1>
            </header>
            <main>
                <div className="dashboard-welcome-div">
                    <h2>Hello, {user?.name}!</h2>
                </div>
                <div className="dashboard-tasks">
                    <h3>Today you have {todaysTasks.length} {todaysTasks.length === 1 ? 'task' : 'tasks'} to do:</h3>
                    <div className="dashboard-tasks-today">
                        {todaysTasks.length === 0 ? (<p>No tasks today!</p>) : (<></>)}
                        <ol className="dashboard-tasks-today-ol">
                            {todaysTasks.map((task) => (
                                <li>{task.task_name}</li>
                            ))}
                        </ol>
                    </div>
                    <div className="dashboard-tasks-planner">
                        <p>Visit your <Link className="planner-link" to="/planner">Planner</Link> to view and add more tasks</p>
                    </div>
                    <div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage