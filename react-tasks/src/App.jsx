import { useEffect, useRef, useState } from 'react'
import './App.css'
import TaskItem from './TaskItem'
import TaskForm from './TaskForm'

function App() {
  const [count, setCount] = useState(0)
  const fileInputRef = useRef(null)
  const [importMessage,setImportMessage] = useState('')
  
  const [filter,setFilter] = useState('all')
  const [priorityFilter,setPriorityFilter] = useState('all')
  const [descriptionFilter,setDescriptionFilter] = useState('all')
  const [searchText, setSearchText] = useState ('')
  const [sortBy,setSortBy] = useState(()=> {
    return localStorage.getItem('sort-by') ?? 'priority'
  })
  const [isDarkTheme, setIsDarkTheme] = useState (()=> {
    return localStorage.getItem('theme') ==='dark'
  })
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('react-tasks')
    const parsedTasks = savedTasks ? JSON.parse(savedTasks) : []

    return parsedTasks.map((task) =>
      typeof task === 'string'
        ? {id: crypto.randomUUID(), text: task, completed: false, priority:'normal' }
        : {...task, id:task.id ?? crypto.randomUUID(), priority: task.priority ?? 'normal'}
    )
  })

  function addTask(taskText, priority,description) {
  const trimmedTask = taskText.trim()

  if (trimmedTask === '') {
    return
  }

  setTasks([...tasks, { id: crypto.randomUUID(), text: trimmedTask, completed: false, priority,description, createdAt: new Date().toISOString() }])
  }

  function deleteTask(taskId) {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }
  function clearCompletedTasks() {
    setTasks(tasks.filter((task) => !task.completed))
  }
  function resetView () {
    setFilter('all')
    setPriorityFilter('all')
    setDescriptionFilter('all')
    setSearchText('')
    setSortBy('priority')
  }
  function exportTasks() {
    const tasksJson = JSON.stringify(tasks,null,2)
    const blob = new Blob ([tasksJson], {type: 'application/json'})
    const fileUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = 'react-tasks-backup.json'
    link.click()
    URL.revokeObjectURL(fileUrl)
    }
    function openFilePicker() {
      fileInputRef.current.click()
    }
    function importTasks(event) {
      const file = event.target.files[0]
      if(!file) {
        return
      }
      const reader = new FileReader()
      reader.onload = () => {
        try {
          const importedTasks = JSON.parse(reader.result)
          if (!Array.isArray(importedTasks)) {
            alert('Файл должен содержать список задач')
            return
          }
          const newTasks = importedTasks.filter ((importedTask)=>
          !tasks.some((task) => task.id === importedTask.id))
                   setTasks([...tasks,...newTasks])
                   setImportMessage(`Импортировано задач: ${newTasks.length}`)
                    } 
          catch 
          {
            alert('Не удалось прочитать файл задач')
          }
      }
      reader.readAsText(file)
      event.target.value=''
          }

  function toggleTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }
  function editTask(taskId, newText,newDescription) {
    const trimmedText=newText.trim()
    
    if (trimmedText === '') {
      return
    }

    setTasks (
      tasks.map ((task)=>
      task.id === taskId
      ?{...task,text:trimmedText,description:newDescription}
      :task)
    )
  }
  function changeTaskPriority (taskId, newPriority) {
    setTasks(
      tasks.map ((task) =>
      task.id ===taskId 
    ? {...task,priority: newPriority}
  :task)
    )
  }

  useEffect(() => {
    localStorage.setItem('react-tasks', JSON.stringify(tasks))
  }, [tasks])
  useEffect(() => {
    document.title=`Задач: ${tasks.length}`
  }, [tasks])
  useEffect(() => {
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light')
  }, [isDarkTheme])
  useEffect(() => {
  localStorage.setItem('sort-by',sortBy)
}, [sortBy])
  const priorityOrder = {
    high:0,
    normal:1,
    low:2,
  }
  const visibleTasks = tasks
  .map((task) => ({ task }))
  .filter(({ task }) => {
    const matchesSearch = task.text
    .toLowerCase()
    .includes(searchText.toLowerCase())
    const matchesPriority = 
    priorityFilter === 'all' || task.priority === priorityFilter
    const hasDescription = task.description !==''

    const matchesDescription = 
    descriptionFilter === 'all' ||
    (descriptionFilter === 'with' && hasDescription) ||
    (descriptionFilter === 'without' && !hasDescription )

    if (!matchesSearch || !matchesPriority || !matchesDescription) {
      return false
    }
    if (filter === 'active') {
      return !task.completed
      }
      if (filter === 'completed') {
        return task.completed
      }
      return true
  })
  .sort ((first,second) => {
  if (sortBy === 'newest') {
  return new Date(second.task.createdAt ?? 0) - new Date (first.task.createdAt ?? 0)
    }

  if (sortBy === 'oldest') {
  return new Date (first.task.createdAt ?? 0) - new Date (second.task.createdAt ?? 0)
  }
  return priorityOrder[first.task.priority] - priorityOrder[second.task.priority]
  })
  const activeTasksCount = tasks.filter((task) => !task.completed).length
  const completedTasksCount = tasks.filter((task) => task.completed).length
  const hasViewChanges = 
  filter !== 'all' || priorityFilter!=='all' || descriptionFilter!=='all' || searchText !=='' || sortBy !== 'priority'
  return (
    <main className={isDarkTheme ? 'dark-theme' : ''}>
      <h1>Мой React-трекер</h1>
      <button
      className="theme-button"
      type="button"
      onClick={() => setIsDarkTheme(!isDarkTheme)}
      >
        {isDarkTheme ? 'Светлая тема' : 'Темная тема'}
      </button>

      <TaskForm onAddTask={addTask} />
      <select
      className="sort-select"
      value={sortBy}
      onChange={(event) => setSortBy(event.target.value)}
      >
      <option value="priority">По приоритету</option>
      <option value="newest">Сначала новые</option>
      <option value="oldest">Сначала старые</option>
      </select>
      <select 
      className="priority-filter"
      value={priorityFilter}
      onChange={(event) => setPriorityFilter(event.target.value)}
      >
        <option value="all">Все приоритеты</option>
        <option value="high">Высокий</option>
        <option value="normal">Обычный</option>
        <option value="low">Низкий</option>
      </select>
      <select 
      className="description-filter"
      value={descriptionFilter}
      onChange={(event) => setDescriptionFilter(event.target.value)}
        >
        <option value="all">Все задачи</option>
        <option value="with">С описанием</option>
        <option value="without">Без описания</option>
        </select>
      <input
      className="search-input"
      value={searchText}
      onChange={(event) => setSearchText(event.target.value)}
      placeholder="Поиск задач"
  />
  {searchText !=='' && (
    <button
    className="clear-search-button"
    type="button"
    onClick={()=> setSearchText('')}
    >
      Очистить Поиск
    </button>
  )}
  {hasViewChanges && (
    <button 
    className="reset-view-button"
    type="button"
    onClick={resetView} 
    > Сбросить фильтры </button>
  )}

      <div className="task-stats">
      <p>Всего задач: {tasks.length}</p>
      <p>Показано: {visibleTasks.length}</p>
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
         {visibleTasks.map(({ task }) => (
                       <TaskItem
  key={task.id}
  task={task}
  onToggle={() => toggleTask(task.id)}
  onDelete={() => deleteTask(task.id)}
  onEdit={(newText,newDescription) => editTask(task.id,newText,newDescription)}
  onPriorityChange={(newPriority) => changeTaskPriority(task.id,newPriority)}
/>
              ))}
      </ul>

      <p>Сделано шагов: {count}</p>
      <div className="main-actions">
      <button type="button" onClick={() => setCount(count + 1)}>
        Сделать шаг
      </button>
      <input 
      ref = {fileInputRef}
      type="file"
      accept='application/json'
      onChange={importTasks}
      hidden/>
      <button 
      className="import-button"
      type="button"
      onClick={openFilePicker}
      >
        Загрузить задачи
      </button>
            <button
      className="export-button"
      type="button"
      onClick={exportTasks}
      >
        Скачать задачи
      </button>
            </div>
            {importMessage && (
              <p className="import-message">{importMessage}</p>
            )}
    </main>
  )
}

export default App