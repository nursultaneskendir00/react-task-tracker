import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('react-tasks')
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : []

    return parsedTasks.map((task) =>
      typeof task === 'string'
        ? { text: task, completed: false }
        : task
    )
  })

  function addTask() {
    const trimmedTask = taskText.trim()

    if (trimmedTask === '') {
      return
    }

    setTasks([...tasks, { text: trimmedTask, completed: false }])
    setTaskText('')
  }

  function deleteTask(taskIndex) {
    setTasks(tasks.filter((_, index) => index !== taskIndex))
  }

  function toggleTask(taskIndex) {
    setTasks(
      tasks.map((task, index) =>
        index === taskIndex
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  useEffect(() => {
    localStorage.setItem('react-tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <main>
      <h1>Мой React-трекер</h1>

      <input
        value={taskText}
        onChange={(event) => setTaskText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addTask()
          }
        }}
        placeholder="Новая задача"
      />

      <p>Задач в React: {tasks.length}</p>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(index)}>
              {task.text}
            </span>

            <button type="button" onClick={() => deleteTask(index)}>
              Удалить
            </button>
          </li>
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