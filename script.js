let todoInput = document.getElementById("todo-input");
let addTodoBtn = document.getElementById("add-todo-btn");
let todoList = document.getElementById("todo-list");
let todos = [];

addTodoBtn.addEventListener("click", () => {
    let newTodo = todoInput.value.trim();
    if (newTodo) {
        todos.push({
            text: newTodo,
            completed: false
        });
        todoInput.value = "";
        renderTodoList();
    }
});

todoList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        let todoIndex = todos.findIndex((todo) => todo.text === e.target.textContent);
        if (todoIndex !== -1) {
            todos[todoIndex].completed = !todos[todoIndex].completed;
            renderTodoList();
        }
    }
});

function renderTodoList() {
    todoList.innerHTML = "";
    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.textContent = todo.text;
        if (todo.completed) {
            li.style.textDecoration = "line-through";
        }
        todoList.appendChild(li);
    });
}
