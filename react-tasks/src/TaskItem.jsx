import {useState} from 'react'

function TaskItem ({task, onToggle, onDelete, onEdit, onPriorityChange}) {
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
<select 
className={`priority priority-${task.priority}`}
value={task.priority}
onChange={(event) => onPriorityChange(event.target.value)}
>
  {Object.entries(priorityLabels).map(([value,label]) => (
    <option key={value} value={value}>
      {label}
    </option>
  ))}
</select>
{task.createdAt && (
  <span className="task-date">
    {new Date(task.createdAt).toLocaleDateString('ru-RU')}
  </span>
)}
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