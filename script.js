const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCounter = document.getElementById("task-counter");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write something");
    } else {
        let li = document.createElement("li");
        li.innerHTML = `<span class="task-text">${inputBox.value}</span>`;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        span.className = "delete-btn";
        li.appendChild(span);
    }
    inputBox.value = "";
    updateTaskCounter();
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI" || e.target.className === "task-text") {
        const li = e.target.tagName === "LI" ? e.target : e.target.parentElement;
        li.classList.toggle("checked");
        updateTaskCounter();
        saveData();
    } else if (e.target.className === "delete-btn") {
        e.target.parentElement.remove();
        updateTaskCounter();
        saveData();
    }
}, false);

function clearCompleted() {
    const completedTasks = listContainer.querySelectorAll("li.checked");
    completedTasks.forEach(task => {
        task.remove();
    });
    updateTaskCounter();
    saveData();
}

function updateTaskCounter() {
    const remainingTasks = listContainer.querySelectorAll("li:not(.checked)").length;
    taskCounter.textContent = `${remainingTasks} task${remainingTasks !== 1 ? 's' : ''} remaining`;
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";
    updateTaskCounter();
}

showTask();
