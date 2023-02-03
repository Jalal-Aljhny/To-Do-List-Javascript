let input = document.querySelector("input[type = 'text']");
let submit = document.querySelector("input[type = 'submit']");
let tasks = document.getElementsByClassName("tasks")[0];
let tasksArray = [];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

if (window.localStorage.getItem("data")) {
  tasksArray = JSON.parse(window.localStorage.getItem("data"));
  getDataFromLocalStorage();
}

submit.onclick = function (e) {
  e.preventDefault();
  if (input.value != "") {
    addTaskToArray(input.value);
  }
  input.value = "";
};

function addTaskToArray(inputValue) {
  let task = {
    id: Date.now(),
    title: inputValue,
    completed: false,
  };
  tasksArray.push(task);
  addElementsTasksFrom(tasksArray);
  addTasksToLocalStorage(tasksArray);
}

function addElementsTasksFrom(tasksArray) {
  tasks.innerHTML = "";
  tasksArray.forEach((task) => {
    let parentDiv = document.createElement("div");
    let parentEl = document.createElement("div");
    let childOne = document.createElement("div");
    let childTwo = document.createElement("div");
    let btn = document.createElement("div");
    parentDiv.classList.add("task");
    if (task.completed == true) {
      parentDiv.classList.add("done");
    }
    childOne.setAttribute("id", task.id);
    childOne.setAttribute("completed", task.completed);
    childOne.innerHTML = `${task.title} `;
    childOne.style = "font-weight:bold;text-align:center;font-size:20px;";

    childTwo.innerHTML = `date of task : ${new Date(task.id).getFullYear()} / ${
      months[new Date(task.id).getDate()]
    } / ${new Date(task.id).getDate()}    in  ${new Date(
      task.id
    ).getHours()} : ${new Date(task.id).getMinutes()}`;
    childTwo.style = "font-size:13px;text-align:center;";

    let doneSpan = document.createElement("span");
    doneSpan.innerHTML = "Done";
    doneSpan.className = "done";
    btn.appendChild(doneSpan);
    let deleteSpan = document.createElement("span");
    deleteSpan.innerHTML = "Delete";
    deleteSpan.className = "delete";
    btn.appendChild(deleteSpan);

    parentEl.appendChild(childOne);
    parentEl.appendChild(childTwo);
    parentDiv.appendChild(parentEl);
    parentDiv.appendChild(btn);
    tasks.appendChild(parentDiv);
  });
}

function addTasksToLocalStorage(tasks) {
  window.localStorage.setItem("data", JSON.stringify(tasks));
}
function getDataFromLocalStorage() {
  addElementsTasksFrom(tasksArray);
}

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("done")) {
    e.target.parentElement.parentElement.classList.add("done");
    for (let i = 0; i < tasksArray.length; i++) {
      if (
        tasksArray[i].id ==
        e.target.parentElement.parentElement.childNodes[0].childNodes[0].getAttribute(
          "id"
        )
      ) {
        tasksArray[i].completed = true;
      }
    }
    addTasksToLocalStorage(tasksArray);
  }
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.parentElement.remove();
    deleteFromLocalStorage(
      e.target.parentElement.parentElement.childNodes[0].childNodes[0].id
    );
  }
});
function deleteFromLocalStorage(elementId) {
  tasksArray = tasksArray.filter((task) => {
    return task.id != elementId;
  });
  addTasksToLocalStorage(tasksArray);
}
