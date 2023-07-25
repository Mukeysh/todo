function Todo(title, description, date) {
  (this.title = title),
    (this.description = description),
    (this.date = date),
    (this.info = function () {
      return `
      <div class="">
        <div class="title">${this.title}</div>
        <div class="description">${this.description}</div>
        <div class="date">${this.date}</div>
      </div>
  `;
    });
}

const todos = [];
const titleInput = document.getElementById("task");
const descriptionInput = document.getElementById("description");
const dateInput = document.getElementById("date");
const submit = document.getElementById("submit");
const todoList = document.getElementById("taskList");

submit.addEventListener("click", addTodos);

function addTodos() {
  const title = titleInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;
  if (!title && !description && !date) {
    alert("Please fill all the fields");
    return;
  }
  const newTodo = new Todo(title, description, date);
  todos.push(newTodo);
  displayTodo();
  clearForm();
}


function displayTodo() {
  todoList.innerHTML = '';
  todos.forEach((item, i) => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = item.info();
    const deleteButton = document.createElement("button");
    const editButton = document.createElement("button");

    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', () => deleteTodo(i));

    editButton.textContent = "edit";
    editButton.onclick = () => editTodo(i);

    todoItem.appendChild(deleteButton);
    todoItem.appendChild(editButton);
    todoList.appendChild(todoItem);
  });
}

function deleteTodo(i) {
  todos.splice(i,1);
  displayTodo();
}

function editTodo(i) {
  const todoIndex = todos[i];
  titleInput.value = todoIndex.title;
  descriptionInput.value = todoIndex.description;
  dateInput.value = todoIndex.date;
  displayTodo();

  submit.textContent = 'update';
  submit.removeEventListener("click", addTodos);
  submit.addEventListener("click", saveChanges.bind(null,i));
}

function saveChanges(i) {
  console.log(i)
  const title = titleInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;

  if(title && description && date) {
    const editedTodo = new Todo(title, description, date);
    todos[i] = editedTodo;
    displayTodo();
    clearForm();
    submit.textContent = "Add";
    submit.removeEventListener('click', saveChanges);
    submit.addEventListener('click', addTodos)
  }
}

function updateChanges(i) {
  todos[i].title = titleInput.value;
  todos[i].description = descriptionInput.value;
  todos[i].date = dateInput.value;
}

function clearForm() {
  titleInput.value = '';
  description.value = '';
  date.value = '';
}

