// variable to form object
var formEl = document.querySelector("#task-form"); 
// variable to unorganized list pbject
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

// runs when button is pushed
var taskFormHandler = function(event) { 
  event.preventDefault(); 
  // var equal to value of input element
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // package up data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  // send data as an object to createTaskList
  createTaskEl(taskDataObj);
  }

  var createTaskEl = function(taskDataObj){
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";
    // add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + 
      taskDataObj.name + 
      "</h3><span class='task-type'>" + 
      taskDataObj.type + 
      "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
  }

  formEl.addEventListener("submit", taskFormHandler);