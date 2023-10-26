// find the element
const container = document.querySelector(".container");
const todoForm = document.querySelector(".todo-form");
const inputTodo = document.querySelector("#inputTodo");
const addtodoBtn = document.querySelector("#addTodoButton");
const todoLists = document.getElementById("lists");
const messageElement = document.getElementById("message");

// showMessage
const showMessage = (text, status) => {
  messageElement.textContent = text;
  messageElement.classList.add(`bg-${status}`);
  setTimeout(() => {
    messageElement.textContent = "";
    messageElement.classList.remove(`bg-${status}`);
  }, 1000);
};

// creteToDo

const createToDo = (todoID, inputValue) => {
  const todoElement = document.createElement("li");
  todoElement.classList.add("li-style");
  todoElement.id = todoID;
  todoElement.innerHTML = `
    <span>${inputValue} </span>  
    <span> <button class="btn" id="deleteButton"> <i class="fa fa-trash"> </i> </button> </span>
   `;
  todoLists.appendChild(todoElement);

  const deleteBtn = todoElement.querySelector("#deleteButton");
  deleteBtn.addEventListener("click", deleteTodo);
};

//  delete ToDo
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;

  todoLists.removeChild(selectedTodo);
  showMessage("todo is deleted", "danger");
};

// getTodosFromLocalStorage
const getTodosFromLocalStorage = () => {
  return localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
};

// addTodo
const addTodo = (event) => {
  event.preventDefault();
  const inputValue = inputTodo.value;
  // unique ID
  const todoID = Date.now().toString();
  createToDo(todoID, inputValue);

  showMessage("todo is added", "success");

  // add todo to localstorage
  const todo = localStorage.getItem("mytodos")
    ? JSON.parse(localStorage.getItem("mytodos"))
    : [];
  todo.push({ todoID, inputValue });
  localStorage.setItem("mytodos", JSON.stringify(todo));
  inputTodo.value = "";
};

// adding listener
todoForm.addEventListener("submit", addTodo);
