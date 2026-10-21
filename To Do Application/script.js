let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const errorMsg = document.getElementById('errorMsg');
const clearBtn = document.getElementById('clearBtn');
const filterRadios = document.querySelectorAll('input[name="filter"]');

function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    render();
}

function render() {
    taskList.innerHTML = '';
    let filteredTasks = tasks;
    if (filter === 'active') filteredTasks = tasks.filter(t => !t.completed);
    if (filter === 'completed') filteredTasks = tasks.filter(t => t.completed);

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li class="list-group-item text-center text-muted border-0">No tasks here!</li>';
    }

    filteredTasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed-task' : ''}`;
        li.innerHTML = `
            <div>
                <input class="form-check-input me-2" type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${task.id})">
                <span>${task.text}</span>
            </div>
            <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });

    const remaining = tasks.filter(t => !t.completed).length;
    taskCount.textContent = `${remaining} remaining`;
}

addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (!text) {
        errorMsg.classList.remove('d-none');
        return;
    }
    errorMsg.classList.add('d-none');
    tasks.push({ id: Date.now(), text, completed: false });
    taskInput.value = '';
    saveAndRender();
});

window.toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    saveAndRender();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
};

clearBtn.addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    saveAndRender();
});

filterRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        filter = e.target.id.replace('filter', '').toLowerCase();
        saveAndRender();
    });
});

render();
