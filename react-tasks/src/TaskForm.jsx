import { useState } from "react";

function TaskForm ({onAddTask}) {
    const [text, setText] = useState('')

    function handleSubmit(event) {
        event.preventDefault()
        const trimmedText =text.trim()
        if (trimmedText === '') {
            return
        }
        onAddTask(trimmedText)
        setText('')
             }
             return (
                <form onSubmit={handleSubmit}>
                    <input value={text}
                    onChange={(event ) => setText(event.target.value)}
                    placeholder="Новая задача"
                    />
                    <button className="add-task-button" type="submit">
                        Добавь задачу
                        </button> 
                        </form>               
                )

}
export default TaskForm