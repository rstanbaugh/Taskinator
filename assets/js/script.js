// variables declarations
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskNameInput = document.querySelector("input[name='task-name']").value;


// functions
var createTaskHandler = function(event) {
  event.preventDefault();
  
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task";
  tasksToDoEl.appendChild(listItemEl);
}







// event listeners
formEl.addEventListener("submit", createTaskHandler);