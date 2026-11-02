import { useRef, useState } from "react";

function TaskForm ({onAddTask}) {
    const [text, setText] = useState('')
    const [priority,setPriority] = useState('normal')
    const [description,setDescription] = useState('')
    const taskInputRef = useRef(null)
    const isFormReady = text.trim() !== ''

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
        taskInputRef.current.focus()
             }
             function clearForm () {
              const hasText=text.trim() !== '' || description.trim() !== ''

              if (hasText && !window.confirm ('Очистить название и описание?')) {
                return
              }

              setText('')
              setDescription('')
              taskInputRef.current.focus()
             }
             function fillExampleTask() {
              setText('Изучить React')
              setDescription('Повторить useState и обработчики событий.')
              setPriority('normal')
             }
             function handleFormKeyDown(event) {
              const isExampleShortcut =
              event.ctrlKey &&
              event.shiftKey &&
              event.code === 'KeyE'

              if (!isExampleShortcut) {
                return
              }
              event.preventDefault()
              fillExampleTask()
             }
             return (
                <form onSubmit={handleSubmit} 
                onKeyDown={handleFormKeyDown}>
                    <div className="form-field">
  <label htmlFor="task-text">Название задачи</label>

  <input
    id="task-text"
    ref={taskInputRef}
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
<button 
className="example-form-button"
type="button"
onClick={fillExampleTask}
>
  Заполнить пример 
  <span className="shortcut-hint">Ctrl+Shift+E</span>
</button>
<button 
className="clear-form-button"
type="button"
onClick={clearForm}
>
  Очистить поля
</button>
                    <button className="add-task-button" type="submit" disabled={!isFormReady}>
                        Добавь задачу
                        </button> 
                        {!isFormReady && (
                          <p className="form-hint">
                                Введите название задачи, чтобы добавить её.
                          </p>
                        )}
                        </form>               
                )

}
export default TaskForm