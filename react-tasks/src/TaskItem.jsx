function TaskItem ({task, onToggle, onDelete}) {
    return(
        <li className={task.completed ? 'completed' : ''}>
            <span onClick={onToggle}>
                {task.text}
            </span>
            <button type ="button" onClick={onDelete}>
                Удалить
            </button>
        </li>
    )
}
export default TaskItem