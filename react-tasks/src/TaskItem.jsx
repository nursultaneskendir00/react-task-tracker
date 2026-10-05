import {useState} from 'react'

function TaskItem ({task, onToggle, onDelete, onEdit}) {
    const [isEditing, setIsEditing]=useState(false)
    const [text, setText]= useState(task.text)
    function saveTask() {
        const trimmedText = text.trim ()

        if (trimmedText ==='') {
            return
        } 
        onEdit(trimmedText)
        setIsEditing(false)
    }
    return(
        <li className={task.completed ? 'completed' : ''}>
            {isEditing ? (
  <input
    value={text}
    onChange={(event) => setText(event.target.value)}
    autoFocus
  />
) : (
  <span onClick={onToggle}>
    {task.text}
  </span>
)}
            {isEditing ? (
  <button type="button" onClick={saveTask}>
    Сохранить
  </button>
) : (
  <button type="button" onClick={() => setIsEditing(true)}>
    Изменить
  </button>
)}
            <button type ="button" onClick={onDelete}>
                Удалить
            </button>
        </li>
    )
}
export default TaskItem