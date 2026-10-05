import { useEffect, useState } from 'react'
import './App.css'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'

function App() {
  const [count, setCount] = useState(0)
  
  const [filter,setFilter] = useState('all')
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('react-tasks')
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : []

    return parsedTasks.map((task) =>
      typeof task === 'string'
        ? { text: task, completed: false }
        : task
    )
  })

  function addTask(taskText) {
  const trimmedTask = taskText.trim()

  if (trimmedTask === '') {
    return
  }

  setTasks([...tasks, { text: trimmedTask, completed: false }])
  }

  function deleteTask(taskIndex) {
    setTasks(tasks.filter((_, index) => index !== taskIndex))
  }
  function clearCompletedTasks() {
    setTasks(tasks.filter((task) => !task.completed))
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
  function editTask(taskIndex, newText) {
    const trimmedText=newText.trim()
    
    if (trimmedText === '') {
      return
    }

    setTasks (
      tasks.map ((task,index)=>
      index === taskIndex
      ?{...task,text:trimmedText}
      :task)
    )
  }

  useEffect(() => {
    localStorage.setItem('react-tasks', JSON.stringify(tasks))
  }, [tasks])
  const visibleTasks = tasks
  .map((task,index) => ({ task, index }))
  .filter(({ task }) => {
    if (filter === 'active') {
      return !task.completed
      }
      if (filter === 'completed') {
        return task.completed
      }
      return true
  })
  const activeTasksCount = tasks.filter((task) => !task.completed).length
  const completedTasksCount = tasks.filter((task) => task.completed).length
  return (
    <main>
      <h1>Мой React-трекер</h1>

      <TaskForm onAddTask={addTask} />

      <div className="task-stats">
      <p>Всего задач: {tasks.length}</p>
      <p>Активных: {activeTasksCount}</p>
      <p>Выполненных: {completedTasksCount}</p></div>
      <div className='filters'> 
        <button className={filter === 'all' ? 'active-filter' : ''}
          type ="button"
          onClick={() => setFilter ('all')}
          >
          Все          
                  </button>
        <button className={filter === 'active' ? 'active-filter' : ''}
          type="button"
          onClick={() => setFilter ('active')}
          >
            Активные
        </button>
        <button className={filter === 'completed' ? 'active-filter' : ''} 
        type="button"
        onClick={() => setFilter ('completed')}
        >
          Выполненные
        </button>
      </div>
      {tasks.some((task) => task.completed) && (
        <button
        className="clear-completed-button"
        type="button"
        onClick={clearCompletedTasks}
        >
          Очистить выполненные
        </button>
      )}
      {visibleTasks.length === 0 && (
        <p className="empty-message">
          {tasks.length === 0
          ? 'Задач пока нет. Добавь первую!'
        : 'В этом фильтре задач нет.'}
        </p>
      )
      }
      <ul>
         {visibleTasks.map(({ task, index }) => (
                       <TaskItem
  key={index}
  task={task}
  onToggle={() => toggleTask(index)}
  onDelete={() => deleteTask(index)}
  onEdit={(newText) => editTask(index,newText)}
/>
              ))}
      </ul>

      <p>Сделано шагов: {count}</p>
      <div className="main-actions">
      <button type="button" onClick={() => setCount(count + 1)}>
        Сделать шаг
      </button>

            </div>
    </main>
  )
}

export default App