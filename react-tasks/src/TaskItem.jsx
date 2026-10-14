import {useState} from 'react'

function TaskItem ({task, onToggle, onDelete, onEdit, onPriorityChange}) {
    const [isEditing, setIsEditing]=useState(false)
    const [isCopied, setIsCopied]=useState(false)
    const [text, setText]= useState(task.text)
    const [description,setDescription]=useState(task.description ?? '')
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
        onEdit(trimmedText,description.trim())
        setIsEditing(false)
 }
        function cancelEditing () {
            setText(task.text)
            setDescription(task.description ?? '')
            setIsEditing(false)
        }
        async function copyTaskText() {
          await navigator.clipboard.writeText(task.text)
          setIsCopied(true)

          setTimeout(() => {
            setIsCopied(false)
            }, 2000)
        }
   
    return(
        <li className={`${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            {isEditing ? (
  <input
    value={text}
    onChange={(event) => setText(event.target.value)}
    maxLength={40}
    autoFocus
  />
) : (
  <span onClick={onToggle}>
    {task.text}
    {task.description && (
      <small className="task-description">
        {task.description}
      </small>
    )}
  </span>
)}
{isEditing && (
  <textarea 
  className="edit-description-input"
  value={description}
  onChange={(event) => setDescription(event.target.value)}
  placeholder="Описание задачи"
  maxLength={120}/>
)}
{isEditing && (
  <span className="char-count">
    {text.length} /40 символов
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
            <button 
            type ="button" 
            onClick={()=> {
              if (window.confirm('Удалить задачу?')) {
                onDelete()
              }
            }}>
                Удалить
            </button>
            <button
            className="copy-button"
            type=
            "button"
            onClick={copyTaskText}>
              {isCopied ? 'Скопировано!' : 'Копировать'}
            </button>
        </li>
    )
}
export default TaskItem