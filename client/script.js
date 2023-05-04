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
      <div class="single-task">
        <h3>${task.title}</h3>
        <p>${task.body}</p>
        <div class="is-done"><span>Fait: </span>${
          task.isDone ? "Oui" : "Non"
        }</div>

        <div class="date"><span>Ajoutée le: </span>${new Date(
          task.createdAt
        ).toLocaleDateString()}</div>
        <div class="buttons">
        <button class="button-delete">Supprimer la tache</button>
        <button class="button-edit">Modifier la tache</button>
        </div>
        </div>
        `;
      //button supprimer
      const deleteButton = taskDiv.querySelector(".button-delete");
      deleteButton.onclick = () => {
        deleteTask(task._id);
      };
      //button modifier
      const editButton = taskDiv.querySelector(".button-edit");
      editButton.onclick = () => {
        const editDiv = document.createElement("div");
        editDiv.classList.add("edit-div");
        editDiv.innerHTML = `
        <input type="text" id="titleEdit" class="input-task" placeholder="Titre" value="${
          task.title
        }" />
        <input type="text" id="bodyEdit" placeholder="Description" class="input-task" value="${
          task.body
        }" />
        <div class="checkbox-done">
        <label for="isDoneEdit">Fait</label>
        <input type="checkbox" id="isDoneEdit" class="input-task" ${
          task.isDone ? "checked" : ""
        } />
        </div>
        
        <button class="button-edit">Modifier la tache</button>
        `;
        taskDiv.appendChild(editDiv);
        editButton.style.display = "none";
        //button modifier la tache
        const editTaskButton = editDiv.querySelector(".button-edit");
        editTaskButton.onclick = () => {
          editTask(task._id);
        };
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
const editTask = async (id) => {
  const title = document.querySelector("#titleEdit").value;
  const body = document.querySelector("#bodyEdit").value;
  const isDone = document.querySelector("#isDoneEdit").checked;
  const data = await fetch(`http://localhost:8800/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, isDone }),
  });
  const response = await data.json();
  console.log(response);
  location.reload();
};

const addTask = async () => {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;
  if (!title || !body) return alert("Veuillez remplir tous les champs");
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
