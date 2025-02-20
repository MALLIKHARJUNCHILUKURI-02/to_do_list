// Add an event listener to the "Add" button to trigger the addTask function when clicked
document.getElementById('add-task-btn').addEventListener('click', addTask);

// Load tasks from localStorage when the window is loaded
window.onload = loadTasks;

// Function to add a new task to the list
function addTask() {
    // Get input values for task name and description
    const taskInput = document.getElementById('task-input');
    const taskDesc = document.getElementById('task-desc');
    const taskName = taskInput.value.trim(); // Trim to avoid whitespace-only values
    const taskDescription = taskDesc.value.trim();

    // Validation: Ensure both fields are filled
    if (taskName === '' || taskDescription === '') {
        alert('Please enter both task name and description.');
        return;
    }

    // Create a task object with name, description, and completion status
    const task = {
        name: taskName,
        description: taskDescription,
        completed: false
    };

    // Retrieve existing tasks from localStorage or initialize an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    // Add the new task to the task list
    tasks.push(task);
    
    // Save updated tasks back to localStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Re-render the task list to show the new task
    renderTasks();

    // Clear the input fields
    taskInput.value = '';
    taskDesc.value = '';
}

// Function to render tasks in the UI
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    // Get tasks from localStorage or initialize as an empty array
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Loop through tasks and create list items for each
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = task.completed ? 'completed' : ''; // Add 'completed' class if needed

        // Create the HTML for each task, including edit and delete buttons
        listItem.innerHTML = `
            <div class="displaytask">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                <p><strong>${task.name} </strong>- ${task.description}</p>
            </div>
            <div>
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        // Append the task item to the list
        taskList.appendChild(listItem);
    });
}

// Function to toggle the completion status of a task
function toggleTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    // Toggle the completed status of the selected task
    tasks[index].completed = !tasks[index].completed;
    
    // Update localStorage and re-render tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to delete a task from the list
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    // Remove the task at the specified index
    tasks.splice(index, 1);
    
    // Update localStorage and re-render tasks
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to edit an existing task
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    // Prompt the user to enter new values for task name and description
    const newTaskName = prompt('Edit task name:', tasks[index].name);
    const newTaskDesc = prompt('Edit task description:', tasks[index].description);

    // Update task if the input is valid (not empty)
    if (newTaskName && newTaskDesc) {
        tasks[index].name = newTaskName.trim();
        tasks[index].description = newTaskDesc.trim();
        
        // Save changes to localStorage and re-render tasks
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Function to load tasks when the page is initially loaded
function loadTasks() {
    renderTasks();
}
