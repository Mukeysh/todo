class UiManager {
  constructor(todos) {
    this.todos = todos;
    this.ui = {
      todoList: document.getElementById("todoList"),
      titleInput: document.getElementById("task"),
      descriptionInput: document.getElementById("description"),
      dateInput: document.getElementById("date"),
      submit: document.getElementById("submit"),
    };
    this.addTodo = this.addTodo.bind(this);
    this.saveChanges = this.saveChanges.bind(this);

    this.ui.submit.addEventListener("click", this.addTodo);
    this.currentHandler = this.addTodo; // Keep track of current handler
  }

  displayTodo() {
    this.ui.todoList.innerHTML = "";
    this.todos.forEach((todo, i) => {
      const todoItem = document.createElement("li");
      todoItem.innerHTML = todo.info();
      this.ui.todoList.appendChild(todoItem);
      const editButton = todoItem.querySelector(".editTodo");
      const deleteButton = todoItem.querySelector(".deleteTodo");
      // Add event listeners
      editButton.addEventListener("click", () => this.editTodo(i));
      deleteButton.addEventListener("click", () => this.deleteTodo(i));
    });
  }

  addTodo() {
    const title = this.ui.titleInput.value;
    const description = this.ui.descriptionInput.value;
    const date = this.ui.dateInput.value;
    console.log(title)
    if (!title && !description && !date) {
      alert("please fill requireds fields");
      return;
    }
    const newTodo = new Todo(title, description, date);
    this.todos.push(newTodo);
    this.displayTodo();
    this.clearForm();
    console.log("ss");
  }

  editTodo(i) {
    const todo = this.todos[i];
    this.ui.titleInput.value = todo.title;
    this.ui.descriptionInput.value = todo.description;
    this.ui.dateInput.value = todo.date;

    this.displayTodo();

    this.ui.submit.removeEventListener("click", this.currentHandler);
    this.currentHandler = () => this.saveChanges(i);

    this.ui.submit.textContent = "Update";

    this.ui.submit.addEventListener("click", this.currentHandler);
  }

  saveChanges(i) {
    console.log(i);
    const title = this.ui.titleInput.value;
    const description = this.ui.descriptionInput.value;
    const date = this.ui.dateInput.value;

    if (!title && !description && !date) {
      alert("Please fill the required fields");
      return;
    }
    const updatedTodo = new Todo(title, description, date);
    this.todos[i] = updatedTodo;
    this.displayTodo();
    this.clearForm();

    this.ui.submit.removeEventListener("click", this.currentHandler);
    this.ui.submit.textContent = "Add";
    this.currentHandler = this.addTodo; // Update current handler
    this.ui.submit.addEventListener("click", this.currentHandler); 
  }

  deleteTodo(i) {
    this.todos.splice(i, 1);
    this.displayTodo();
  }

  clearForm() {
    this.ui.titleInput.value = "";
    (this.ui.descriptionInput.value = ""), (this.ui.dateInput.value = "");
  }
}

class Todo {
  constructor(title, description, date, completed = false) {
    (this.title = title),
      (this.description = description),
      (this.date = date),
      (this.completed = completed);
  }
  info() {
    return `
      <div class="">
        <div class="title">${this.title}</div>
        <div class="description">${this.description}</div>
        <div class="date">${this.date}</div>
        <div class="completed">${
          this.completed ? "Completed" : "Not completed"
        }</div>
        <div class="">
        <button class="editTodo"">Edit</button>
        <button class="deleteTodo">Delete</button>
        </div>
      </div>
  `;
  }
}

// Initialize the application
const todos = new UiManager([
  new Todo("Buy milk", "Get milk from store", "2023-02-26"),
  new Todo("Walk dog", "Take dog for a walk", "2023-02-27"),
  new Todo("Clean house", "Clean entire house", "2023-03-01"),
]);

// Display initial list of todos
todos.displayTodo();
