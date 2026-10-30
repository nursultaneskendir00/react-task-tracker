import { useState } from "react";

function TaskForm ({onAddTask}) {
    const [text, setText] = useState('')
    const [priority,setPriority] = useState('normal')
    const [description,setDescription] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        const trimmedText =text.trim()
        if (trimmedText === '') {
            return
        }
        onAddTask(trimmedText,priority,description.trim())
        setText('')
        setPriority('normal')
        setDescription('')
             }
             return (
                <form onSubmit={handleSubmit}>
                    <div className="form-field">
  <label htmlFor="task-text">Название задачи</label>

  <input
    id="task-text"
    value={text}
    onChange={(event) => setText(event.target.value)}
    placeholder="Новая задача"
    aria-label="Название задачи"
    maxLength={40}
  />
  <span className={`character-count ${text.length >= 35 ? 'near-limit' : ''}`}>
    {text.length} / 40 символов
  </span>
</div>
                    <div className="form-field description-field">
  <label htmlFor="task-description">Описание задачи</label>

  <textarea
    id="task-description"
    className="description-input"
    value={description}
    onChange={(event) => setDescription(event.target.value)}
    placeholder="Описание задачи (необязательно)"
    aria-label="Описание задачи"
    maxLength={120}
  />
  <span className={`character-count ${description.length >= 110 ? 'near-limit' : ''}`}>
    {description.length} / 120 символов
  </span>
</div>
                    <div className="form-field">
  <label htmlFor="task-priority">Приоритет</label>

  <select
    id="task-priority"
    value={priority}
    aria-label="Приоритет задачи"
    onChange={(event) => setPriority(event.target.value)}
  >
    <option value="low">Низкий</option>
    <option value="normal">Обычный</option>
    <option value="high">Высокий</option>
  </select>
</div>
                    <button className="add-task-button" type="submit">
                        Добавь задачу
                        </button> 
                        </form>               
                )

}
export default TaskForm