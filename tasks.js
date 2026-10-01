const taskInput = document.getElementById("task-input");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", function() {
    const taskText=taskInput.value.trim ();
    if (taskText==="") {
        return
    }
    const newTask=document.createElement("li");

    newTask.textContent=taskText;
    const deleteButton = document.createElement("button");
    deleteButton.textContent="Удалить";

    newTask.appendChild(deleteButton);
    deleteButton.addEventListener("click", function() {
        newTask.remove();
    }
)
    taskList.appendChild(newTask); 
    taskInput.value = "";
});