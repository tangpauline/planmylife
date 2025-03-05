import '../styles/TaskBlock.css'

const TaskBlock = ({taskId, taskName, description, status, dueDate, onClick}) => {
    
    const handleClick = () => {
        const task = {
            task_id: taskId,
            task_name: taskName,
            description: description,
            status: status,
            due_date: dueDate,
        }
        onClick(task);
    }
    return (
        <div className={`task-block-div ${status === "Completed" ? "completed-task" : ""}`} onClick={handleClick}>
            <div className="task-content-div">
                <h3>{taskName}</h3>
                <p>{description}</p>
                <p>{status}</p>
            </div>
        </div>
    )
};

export default TaskBlock