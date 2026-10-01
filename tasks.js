const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const tasksTotal = document.getElementById("tasks-total");
const tasks=[];
function saveTasks () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskButton.addEventListener("click", function () {
    const taskText=taskInput.value.trim();

    if (taskText === "") {
        return;
            }
        tasks.push(taskText);
        saveTasks();
        tasksTotal.textContent = "Всего задач: " +tasks.length;
        renderTask(taskText);
        taskInput.value="";
});
taskInput.addEventListener("keydown", function (event) {
    if(event.key==="Enter") {
        addTaskButton.click();
    }
});
function renderTask (taskText) {
    const newTask = document.createElement("li");
    newTask.textContent = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    newTask.appendChild(deleteButton);

    deleteButton.addEventListener("click", function(){
        const taskIndex=tasks.indexOf(taskText);
        tasks.splice(taskIndex, 1);
        saveTasks();
        tasksTotal.textContent = "Всего задач: " + tasks.length;
        newTask.remove();
         });
         taskList.appendChild(newTask);
}
const savedTasks = JSON.parse(localStorage.getItem ("tasks")) || [];
savedTasks.forEach(function (taskText) {
    tasks.push(taskText);
    renderTask(taskText);
});
tasksTotal.textContent = "Всего задач: " + tasks.length;
