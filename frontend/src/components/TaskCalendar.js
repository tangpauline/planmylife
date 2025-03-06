import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useChange } from './TaskContext';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import WeekView from './WeekView';
import TaskModal from './TaskModal';

import '../styles/TaskCalendar.css';

const localizer = momentLocalizer(moment);

const TaskCalendar = ({ tasks }) => {
    const { change, setChange } = useChange();
    const [events, setEvents] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState('month');

    // Transform tasks into calendar events format
    useEffect(() => {
        setEvents(tasks.map(task => ({
            task_id: task.task_id,
            title: task.task_name,
            task_name: task.task_name,
            start: new Date(task.due_date),
            end: new Date(task.due_date),
            description: task.description,
            status: task.status,
            dueDate: task.due_date
        })));
    }, [tasks, change]);

    const handleSelectEvent = (event) => {
        setSelectedTask(event);
        setIsModalOpen(true);
    }

    const handleModalClose = () => {
        setSelectedTask(null);
        setIsModalOpen(false);
    };

    const handleDelete = () => {
        setChange(change => !change);
    }

    return (
        <div>
            <Calendar
                className="big-calendar"
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
                style={{ height: 500 }}
                views={{
                    day: true,
                    week: WeekView,
                    month: true
                }}
                view={view}
                onView={(newView) => setView(newView)}
                defaultView="week"
                onSelectEvent={handleSelectEvent}
                popup={true}
            />
            {isModalOpen && <TaskModal task={selectedTask} onClose={handleModalClose} onDelete={handleDelete}/>}
        </div>
    );
};

export default TaskCalendar;