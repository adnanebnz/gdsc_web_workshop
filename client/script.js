const displayTasks = async () => {
  const data = await fetch("http://localhost:8800/tasks");
  const tasks = await data.json();
  console.log(tasks);
  const tasksContainer = document.querySelector(".tasks-container");
  if (tasks.length > 0) {
    tasks.map((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.classList.add("task");
      taskDiv.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.body}</p>
        <button class="button-delete">Supprimer la tache</button>
        `;
      //button supprimer
      const deleteButton = taskDiv.querySelector(".button-delete");
      deleteButton.onclick = () => {
        deleteTask(task._id);
      };
      tasksContainer.appendChild(taskDiv);
    });
  } else {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.innerHTML = `
        <h3>Aucune tache trouvée</h3>
        `;
    tasksContainer.appendChild(taskDiv);
  }
};

const deleteTask = async (id) => {
  const data = await fetch(`http://localhost:8800/tasks/${id}`, {
    method: "DELETE",
  });
  const response = await data.json();
  console.log(response);
  location.reload();
};

const addTask = async () => {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  const data = await fetch("http://localhost:8800/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body }),
  });
  const response = await data.json();
  console.log(response);
  location.reload();
};

displayTasks();
