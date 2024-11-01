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

function newTaskComplition() {
  let store = [];
  let time = new Date();
  let close = document.getElementById("close");
  let newCard = document.getElementById("new-card");
  let title = document.getElementById("card-title-new");
  let description = document.getElementById("card-des-new");
  let submit = document.getElementById("submit");
  let color = "white";
  let titleValue = title.value;
  let descValue = description.value;

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
    let colorValue = color;

    let task = {
      title: titleValue,
      description: descValue,
      color: colorValue,
      timeCreated: time.toLocaleString(),
    };
    localStorage.setItem(titleValue, JSON.stringify(task));
    newCard.classList.add("hidden");
    title.value = "";
    descValue = "";

    displayTask(task);
  });
}
newTaskComplition();

function getData() {
  console.log(localStorage.length);
}
