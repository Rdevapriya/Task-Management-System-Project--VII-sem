let tasks = [];

document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';  // clear the input
        renderTasks();
        updatePendingPercentage();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';  // Clear the task list first

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) taskElement.classList.add('completed');

        taskElement.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleCompletion(${task.id})">✔</button>
        `;

        taskList.appendChild(taskElement);
    });
}

function toggleCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
    updatePendingPercentage();
}

function updatePendingPercentage() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingPercentage = totalTasks === 0 ? 0 : Math.round(((totalTasks - completedTasks) / totalTasks) * 100);
    document.getElementById('pending-percentage').innerText = `Pending: ${pendingPercentage}%`;
}

function filterTasks() {
    const filter = document.getElementById('filter').value;
    let filteredTasks = tasks;

    if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }

    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    filteredTasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        if (task.completed) taskElement.classList.add('completed');

        taskElement.innerHTML = `
            <span>${task.text}</span>
            <button onclick="toggleCompletion(${task.id})">✔</button>
        `;

        taskList.appendChild(taskElement);
    });
}
