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
                    <input value={text}
                    onChange={(event ) => setText(event.target.value)}
                    placeholder="Новая задача"
                    aria-label="Название задачи"
                    maxLength={40}
                    />
                    <textarea 
                    className="description-input"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Описание задачи (необязательно)"
                    aria-label="Описание задачи"
                    maxLength={120} />
                    <select value={priority}
                    aria-label="Приоритет задачи"
                    onChange={(event) =>setPriority(event.target.value)}
                        >
                        <option value="low">Низкий</option>
                        <option value="normal">Обычный</option>
                        <option value="high">Высокий</option>
                        </select>
                    <button className="add-task-button" type="submit">
                        Добавь задачу
                        </button> 
                        </form>               
                )

}
export default TaskForm