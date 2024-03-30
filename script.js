let tasks = [];

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" data-index="${i}" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button data-index="${i}">Delete</button>
        `;
        taskList.appendChild(li);
    }
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function filterTasks(status) {
    const filteredTasks = status === 'pending' ?
        tasks.filter(task => !task.completed) :
        status === 'completed' ?
        tasks.filter(task => task.completed) :
        tasks;

    renderFilteredTasks(filteredTasks);
}

function renderFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    for (let i = 0; i < filteredTasks.length; i++) {
        const task = filteredTasks[i];
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" data-index="${tasks.indexOf(task)}" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button data-index="${tasks.indexOf(task)}">Delete</button>
        `;
        taskList.appendChild(li);
    }
}

document.getElementById('taskList').addEventListener('change', function(event) {
    if (event.target.matches('input[type="checkbox"]')) {
        toggleCompletion(event.target.getAttribute('data-index'));
    }
});

document.getElementById('taskList').addEventListener('click', function(event) {
    if (event.target.matches('button')) {
        deleteTask(event.target.getAttribute('data-index'));
    }
});

renderTasks(); // Initial render




