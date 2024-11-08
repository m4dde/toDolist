document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('newTask');
    const form = document.getElementById('task');
    const list = document.getElementById('taskList');

    let tasks = JSON.parsel(localStorage.getItem('tasks')) || [];

    function addTask() {
        const task = taskInput.value.trim();
        if (task !== '') {
            tasks.push({ id: Date.now(), task, completed: false});
            saveTasks()
            displayTasks();
            taskInput.value = '';
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        saveTasks();
        displayTasks();
    }

    function toggleComplete(taskID) {
        tasks.find(task => task.id === taskId).completed = !tasks.find(task => task.Id === taskId).completed;
        saveTasks();
        displayTasks();
    }

    function displayTasks() {
        taskList.innerHTML = '';
        task.forEach(task => {
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
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });
    displayTasks();
});