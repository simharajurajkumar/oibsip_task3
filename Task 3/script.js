const form = document.getElementById('todo-form');
const taskTitleInput = document.getElementById('task-title');
const taskDescInput = document.getElementById('task-desc');
const pendingTasksList = document.getElementById('pending-tasks');
const completedTasksList = document.getElementById('completed-tasks');

let tasks = [];

// Add task
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskTitle = taskTitleInput.value.trim();
    const taskDesc = taskDescInput.value.trim();
    if (taskTitle === '') return;

    const task = {
        id: Date.now().toString(),
        title: taskTitle,
        description: taskDesc,
        completed: false,
        createdAt: new Date()
    };

    tasks.push(task);
    taskTitleInput.value = '';
    taskDescInput.value = '';

    renderTasks();
});

// Delete task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Edit task
function editTask(taskId, newTitle, newDesc) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, title: newTitle, description: newDesc };
        }
        return task;
    });
    renderTasks();
}

// Mark task as complete
function completeTask(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: true };
        }
        return task;
    });
    renderTasks();
}

// Render tasks
function renderTasks() {
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('li');

        const taskContent = document.createElement('div');
        taskContent.classList.add('task-content');

        const taskTitle = document.createElement('div');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;

        const taskDesc = document.createElement('div');
        taskDesc.classList.add('task-desc');
        taskDesc.textContent = task.description;

        taskContent.appendChild(taskTitle);
        taskContent.appendChild(taskDesc);
        taskElement.appendChild(taskContent);

        const actions = document.createElement('div');
        actions.classList.add('actions');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit');
        editButton.addEventListener('click', () => {
            const newTitle = prompt('Edit task title:', task.title);
            const newDesc = prompt('Edit task description:', task.description);
            if (newTitle !== null && newDesc !== null) {
                editTask(task.id, newTitle.trim(), newDesc.trim());
            }
        });

        actions.appendChild(deleteButton);
        actions.appendChild(editButton);

        if (!task.completed) {
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.classList.add('complete');
            completeButton.addEventListener('click', () => completeTask(task.id));
            actions.appendChild(completeButton);

            taskElement.appendChild(actions);
            pendingTasksList.appendChild(taskElement);
        } else {
            taskElement.classList.add('completed');
            taskElement.appendChild(actions);
            completedTasksList.appendChild(taskElement);
        }
    });
}

// Initial render
renderTasks();
