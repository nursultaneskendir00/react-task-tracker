import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState([])

  function addTask() {
    const trimmedTask = taskText.trim()

    if (trimmedTask === '') {
      return
    }

    setTasks([...tasks, trimmedTask])
    setTaskText('')
  }

  function deleteTask(taskIndex) {
    setTasks(tasks.filter((_, index) => index !== taskIndex))
  }

  return (
    <main>
      <h1>Мой React-трекер</h1>
      <input
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
        placeholder="Новая задача"
      />
      <p>Задач в React: {tasks.length}</p>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button type ="button" onClick={()=> deleteTask(index)}>Удалить</button> </li>
        ))}
      </ul>
      <p>Сделано шагов: {count}</p>

      <button type="button" onClick={() => setCount(count + 1)}>
        Сделать шаг
      </button>
      <button type="button" onClick={addTask}>
        Добавь задачу
      </button>
    </main>
  )
}

export default App
