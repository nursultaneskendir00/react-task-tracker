import {useState} from 'react'

function TaskItem ({task, onToggle, onDelete, onEdit}) {
    const [isEditing, setIsEditing]=useState(false)
    const [text, setText]= useState(task.text)
    const priorityLabels = {
        low:'Низкий',
        normal:'Обычный',
        high:'Высокий',
    }
    function saveTask() {
        const trimmedText = text.trim ()

        if (trimmedText ==='') {
            return
        } 
        onEdit(trimmedText)
        setIsEditing(false)
 }
        function cancelEditing () {
            setText(task.text)
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
<span className={`priority priority-${task.priority}`}>
  {priorityLabels[task.priority]}
</span>
            {isEditing ? (
  <button className="save-button" type="button" onClick={saveTask}>
    Сохранить
  </button>
) : (
  <button className="edit-button" type="button" onClick={() => setIsEditing(true)}>
    Изменить
  </button>
)}
{isEditing && (
<button className="cancel-button" type="button" onClick={cancelEditing}> Отмена </button>
) }
            <button type ="button" onClick={onDelete}>
                Удалить
            </button>
        </li>
    )
}
export default TaskItem