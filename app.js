/* app logic for todo list app */
const todoList = document.getElementById('todo-list');
const newTodoInput = document.getElementById('new-todo');
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', () => {
    const todoItem = document.createElement('li');
    todoItem.textContent = newTodoInput.value;
    todoList.appendChild(todoItem);
    newTodoInput.value = '';
});

// persist todos in localStorage
const todos = JSON.parse(localStorage.getItem('todos')) || [];

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// show empty state when no todos exist
function showEmptyState() {
    const emptyState = document.createElement('p');
    emptyState.textContent = 'No todos yet!';
    todoList.appendChild(emptyState);
}

// toggle todo item complete/incomplete
function toggleTodoComplete(todoItem) {
    todoItem.classList.toggle('completed');
}

// delete todo item
function deleteTodo(todoItem) {
    todoList.removeChild(todoItem);
}

// event listeners
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        deleteTodo(e.target.parentNode);
    } else if (e.target.classList.contains('toggle')) {
        toggleTodoComplete(e.target.parentNode);
    }
});

// initial setup
showEmptyState();

// event listener for new todo input
newTodoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});
