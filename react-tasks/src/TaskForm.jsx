import { useState } from "react";

function TaskForm ({onAddTask}) {
    const [text, setText] = useState('')
    const [priority,setPriority] = useState('normal')

    function handleSubmit(event) {
        event.preventDefault()
        const trimmedText =text.trim()
        if (trimmedText === '') {
            return
        }
        onAddTask(trimmedText,priority)
        setText('')
        setPriority('normal')
             }
             return (
                <form onSubmit={handleSubmit}>
                    <input value={text}
                    onChange={(event ) => setText(event.target.value)}
                    placeholder="Новая задача"
                    maxLength={40}
                    />
                    <select value={priority}
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