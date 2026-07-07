// DOM elements
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');

// Load todos from localStorage on page load
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    
    // Clear existing list
    todoList.innerHTML = '';
    
    // Add each todo to the list
    todos.forEach(todo => {
        addTodoToDOM(todo);
    });
    
    // Show/hide empty state
    updateEmptyState();
}

// Add a todo to the DOM
function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    
    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));
    
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    todoList.appendChild(li);
}

// Add a new todo
function addTodo() {
    const text = newTodoInput.value.trim();
    if (text === '') return;
    
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    // Save to localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(newTodo);
    localStorage.setItem('todos', JSON.stringify(todos));
    
    // Add to DOM
    addTodoToDOM(newTodo);
    
    // Clear input
    newTodoInput.value = '';
    
    // Update empty state
    updateEmptyState();
}

// Toggle todo completion status
function toggleTodo(id) {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(todos));
        
        // Update DOM
        const li = todoList.querySelector(`li[data-id="${id}"]`);
        if (li) {
            li.classList.toggle('completed');
        }
        
        updateEmptyState();
    }
}

// Delete a todo
function deleteTodo(id) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(t => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(todos));
    
    // Remove from DOM
    const li = todoList.querySelector(`li[data-id="${id}"]`);
    if (li) {
        li.remove();
    }
    
    updateEmptyState();
}

// Update empty state visibility
function updateEmptyState() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    emptyState.style.display = todos.length === 0 ? 'block' : 'none';
}

// Event listeners
addTodoButton.addEventListener('click', addTodo);

newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

// Load todos when page loads
loadTodos();