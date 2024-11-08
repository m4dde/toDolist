document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('newTask');
    const taskForm = document.getElementById('task-form');
    const list = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function addTask() {
        const task = taskInput.value.trim();
        if (task !== '') {
            tasks.push({ id: Date.now(), task, completed: false});
            saveTasks();
            displayTasks();
            taskInput.value = '';
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        displayTasks();
    }

    function toggleComplete(taskId) {
        tasks.find(task => task.id === taskId).completed = !tasks.find(task => task.id === taskId).completed;
        saveTasks();
        displayTasks();
    }

    function displayTasks() {
        list.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.task;
            li.id = task.id;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteTask(task.id);
            deleteBtn.classList.add('delete-btn');
            li.appendChild(deleteBtn);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.onclick = () => toggleComplete(task.id);
            li.insertBefore(checkbox, li.firstChild);
            list.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    document.getElementById('task-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });
    displayTasks();
});