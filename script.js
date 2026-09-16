let timeLeft = 25 * 60;
let timer;

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value;

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    let li = document.createElement("li");

    let taskText = document.createElement("span");
    taskText.textContent = task;

    taskText.onclick = function() {
        li.classList.toggle("completed");
        saveTasks();
        updateProgress();
    };

    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.onclick = function() {
        li.remove();
        saveTasks();
        updateProgress();
    };

    li.appendChild(taskText);
    li.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(li);

    input.value = "";

    saveTasks();
    updateProgress();
}

function updateProgress() {
    let tasks = document.querySelectorAll("#taskList li");
    let completed = document.querySelectorAll("#taskList li.completed");

    let progress = 0;

    if (tasks.length > 0) {
        progress = Math.round((completed.length / tasks.length) * 100);
    }

    document.getElementById("progress").textContent =
        "Study Progress: " + progress + "%";
        document.getElementById("progressBar").style.width = progress + "%";
}

function saveTasks() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(function(li) {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

    savedTasks.forEach(function(task) {
        let li = document.createElement("li");

        let taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        taskText.onclick = function() {
            li.classList.toggle("completed");
            saveTasks();
            updateProgress();
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            li.remove();
            saveTasks();
            updateProgress();
        };

        li.appendChild(taskText);
        li.appendChild(deleteButton);

        document.getElementById("taskList").appendChild(li);
    });

    updateProgress();
}

loadTasks();

function startTimer() {
    clearInterval(timer);

    timer = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        document.getElementById("timerDisplay").textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Study session completed! 🎉");
        }

        timeLeft--;
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 25 * 60;
    document.getElementById("timerDisplay").textContent = "25:00";
}function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}
