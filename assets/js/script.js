// variables
var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");



// runs when button is pushed
var taskFormHandler = function(event) { 
  event.preventDefault(); 
  // var equal to value of input element
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false;
  }

  formEl.reset();

  // determine if new or edit
  var isEdit = formEl.hasAttribute("data-task-id");
if (isEdit){
  var taskId = formEl.getAttribute("data-task-id");
  completeEditTask(taskNameInput, taskTypeInput, taskId);
}
else {
  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  // send data as an object to createTaskList
  createTaskEl(taskDataObj);
  }
};



var createTaskEl = function(taskDataObj){
  // create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a customer attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);


  // create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + 
    taskDataObj.name + 
    "</h3><span class='task-type'>" + 
    taskDataObj.type + 
    "</span>";
  listItemEl.appendChild(taskInfoEl);

  // create html for taskActions
  var taskActionsEl = createTaskActions(taskIdCounter);
  
  // add html elements to the list
  listItemEl.appendChild(taskActionsEl);
  tasksToDoEl.appendChild(listItemEl);
  

  // increase task counter for next uniqu id
  taskIdCounter++;
};

var createTaskActions = function(taskId){
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  actionContainerEl.appendChild(deleteButtonEl);

  // create select dropdown
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id",taskId);

  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Conmpleted"];
  for (var i = 0; i < statusChoices.length; i++){
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);
  }
  return actionContainerEl;
};

var taskButtonHandler = function(event){
  var targetEl = event.target;

  if(targetEl.matches(".delete-btn")){
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
  else if (targetEl.matches(".edit-btn")){
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
};

var deleteTask = function(taskId){
  var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");
  taskSelected.remove();
};

var editTask = function(taskId){
  // get the targeted li element
  var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

  // get the content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);

  // deleteTask = function(taskId)
};

var completeEditTask = function(taskName, taskType, taskId){
  // find the selected task
  var taskSelected = document.querySelector(".task-item[data-task-id='"+taskId+"']");

  // set new value
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};


// listeners
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
