var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeToDo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteToDo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      if (totalTodos === completedTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

todoList.addTodo("thing a");
todoList.addTodo("thing b");

var handlers = {
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var changeToDoPositionInput = document.getElementById(
      "changeTodoPositionInput"
    );
    var changeToDoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeToDo(
      changeToDoPositionInput.valueAsNumber,
      changeToDoTextInput.value
    );
    changeToDoPositionInput.value = "";
    changeToDoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteToDo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById(
      "toggleCompletedPositionInput"
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";
    todoList.todos.forEach(function(todo) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "";

      if (todo.completed === true) {
        todoTextWithCompletion = "(X) " + todo.todoText;
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText;
      }

      todoLi.id = todo.position;
      todoLi.innerText = todoTextWithCompletion;
      todoLi.appendChild(view.createDeleteButton());
      todosUl.appendChild(todoLi);
    });
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUL = document.querySelector("ul");

    todosUL.addEventListener("click", function(event) {
      console.log(event);
      var elementClicked = event.target;
      if (elementClicked.className == "deleteButton") {
        handlers.deleteTodo(Number(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
