function toDoOption() {
  const toDoOpt = document.getElementById("todo-options");
  const optionsMenu = document.getElementById("options-menu");

  toDoOpt.addEventListener("click", function () {
    optionsMenu.classList.toggle("hidden");
  });
}

toDoOption();

function newTask() {
  const newTask = document.getElementById("new-task");
  let newCard = document.getElementById("new-card");
  const optionsMenu = document.getElementById("options-menu");

  newTask.addEventListener("click", function () {
    if (!newCard.classList.contains("hidden")) {
      alert("You have a new task menu open already");
    } else {
      newCard.classList.remove("hidden");
      optionsMenu.classList.add("hidden");
    }
  });
}

newTask();

function removeAll() {
  const removeAll = document.getElementById("remove-all");
  const optionsMenu = document.getElementById("options-menu");
  const tasks = document.getElementById("todo-all-cards");

  removeAll.addEventListener("click", function () {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const task = JSON.parse(localStorage.getItem(key));

      if (task && task.list === "todo") {
        localStorage.removeItem(key);
        i--;
      }
    }

    tasks.innerHTML = "";
    optionsMenu.classList.add("hidden");
    displayAllTasks();
  });
}
removeAll();

function newTaskComplition() {
  let time = new Date();
  let close = document.getElementById("close");
  let newCard = document.getElementById("new-card");
  let title = document.getElementById("card-title-new");
  let description = document.getElementById("card-des-new");
  let submit = document.getElementById("submit");
  let color = "white";

  close.addEventListener("click", function (cl) {
    newCard.classList.add("hidden");
    title.value = "";
    descValue = "";
  });
  const colorDivs = document.querySelectorAll(".choose-color .colors");

  colorDivs.forEach((div) => {
    div.addEventListener("click", function () {
      color = this.id;
      newCard.classList.remove(
        "bg-white",
        "bg-red",
        "bg-cyan",
        "bg-green",
        "bg-yellow"
      );

      newCard.classList.remove(`bg-white`);
      newCard.classList.add(`bg-${color}`);
    });
  });

  submit.addEventListener("click", function (sub) {
    let titleValue = title.value.replace(" ", "-");
    let descValue = description.value;

    let timeCreated = `${time.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })}
                       ${time.toLocaleTimeString(undefined, {
                         hour: "2-digit",
                         minute: "2-digit",
                       })}`;
    let colorValue = color;
    let type = "todo";

    let task = {
      title: titleValue,
      description: descValue,
      color: colorValue,
      timeCreated: timeCreated,
      list: type,
    };
    console.log(task);
    localStorage.setItem(titleValue, JSON.stringify(task));
    newCard.classList.add("hidden");
    title.value = "";
    descValue = "";

    displayTask(task);
  });
}

function displayAllTasks() {
  let container = document.getElementById("todo-all-cards");
  let containerDoing = document.getElementById("doing-all-cards");
  container.innerHTML = "";
  containerDoing.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let task = JSON.parse(localStorage.getItem(key));
    displayTask(task);
  }
}

function displayTask(task) {
  let container = document.getElementById("todo-all-cards");
  let containerDoing = document.getElementById("doing-all-cards");

  let taskDiv = document.createElement("div");
  taskDiv.className = `inside-card bg-${task.color}`;

  taskDiv.innerHTML = `
      <div class="flex">
        <h3>${task.title}</h3>
        <div class="next" id="${task.title}">...</div>
        <div id="task-options-menu" class="task-options hidden">
          <button button id="edit-task">Edit</button>
          <button id="delete-task">Delete</button>
          <button id="mark-doing">Mark as Doing</button>
          <button id="mark-doing">Mark as Done</button>
        </div>
      </div>
      <p class="inside-p">${task.description}</p>
      <div class="details">
        <p class="time" id="time">
          created in: <span class="timer" id="time-1">${task.timeCreated}</span>
        </p>
      </div>
  `;
  if (task.list === "todo") {
    container.appendChild(taskDiv);
  } else if (task.list === "doing") {
    containerDoing.appendChild(taskDiv);
  }

  let nextBtn = document.getElementById(task.title);
  nextBtn.addEventListener("click", function (event) {
    showOptionsMenu(event, task.title);
  });
}

function showOptionsMenu(event, taskTitle) {
  const menu = document.getElementById("task-options-menu");
  menu.classList.toggle("hidden");

  menu.style.top = `${event.clientY}px`;
  menu.style.left = `${event.clientX}px`;

  document.getElementById("edit-task").onclick = () => editTask(taskTitle);
  document.getElementById("delete-task").onclick = () => deleteTask(taskTitle);
  document.getElementById("mark-doing").onclick = () =>
    markTaskAsDoing(taskTitle);
}

function markTaskAsDoing(taskTitle) {
  let task = JSON.parse(localStorage.getItem(taskTitle));
  if (task) {
    task.list = "doing";
    localStorage.setItem(taskTitle, JSON.stringify(task));
    displayAllTasks();
  }
}

function editTask(taskTitle) {
  let task = JSON.parse(localStorage.getItem(taskTitle));
  if (task) {
    task.description =
      prompt("Edit Description", task.description) || task.description;
    localStorage.setItem(task.title, JSON.stringify(task));
    displayAllTasks();
  }
}
newTaskComplition();
displayAllTasks();
