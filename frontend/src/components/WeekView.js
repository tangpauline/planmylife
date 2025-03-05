import React, { useState } from 'react';
import { Navigate } from 'react-big-calendar';
import TaskBlock from './TaskBlock';
import TaskModal from './TaskModal';
import moment from 'moment';

import '../styles/WeekView.css'

// Custom Week View Component
const WeekView = ({ date, events }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const startOfWeek = moment(date).startOf('week');
    const days = [];
  
    // Generate the days of the week
    for (let i = 0; i < 7; i++) {
        const day = moment(startOfWeek).add(i, 'days');
        days.push(day);
    }

    const handleTaskClick = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };
  
    return (
        <div className="week-view-div">
            {days.map((day, index) => (
            <div className="week-day-div" key={index}>
                <div className="week-day-header-div">
                    {day.format('DD ddd')}
                </div>
                <div className="week-day-tasks-div">
                    {events
                        .filter((event) => moment(event.start).isSame(day, 'day'))
                        .map((event) => (
                        <TaskBlock
                            key={event.task_id}
                            taskId={event.task_id}
                            taskName={event.title}
                            description={event.description}
                            status={event.status}
                            dueDate={event.dueDate}
                            onClick={handleTaskClick}
                        />
                    ))}
                </div>
            </div>
            ))}
            {isModalOpen && <TaskModal task={selectedTask} onClose={handleModalClose} />}
        </div>
    );
};

WeekView.range = (date, { localizer }) => {
    let firstOfWeek = localizer.startOfWeek();
    let start = localizer.startOf(date, 'week', firstOfWeek);
    let end = localizer.endOf(date, 'week', firstOfWeek);
    return localizer.range(start, end);
}

WeekView.navigate = (date, action, { localizer }) => {
    switch (action) {
        case Navigate.PREVIOUS:
            return localizer.add(date, -7, 'day');
    
        case Navigate.NEXT:
            return localizer.add(date, 7, 'day');
    
        default:
            return date;
    }
}

WeekView.title = (date, { localizer }) => {
    let [start, ...rest] = WeekView.range(date, { localizer })
    return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat')
}

export default WeekView;
