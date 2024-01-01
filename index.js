document.addEventListener("DOMContentLoaded", function () {
  /* ELEMENTS */
  const formEl = document.getElementById("inputForm");
  const inputEl = document.getElementById("taskInput");
  const todoItemsContainerEl = document.getElementById("todoItemsContainer");
  const saveTodoBtnEl = document.getElementById("saveTodoBtn");

  /* GET TODO FROM LOCAL STORAGE */
  function getTodoListFromLS() {
    const storedTodoList = localStorage.getItem("todoList");
    const parsedTodoList = JSON.parse(storedTodoList);
    if (parsedTodoList === null) {
      return [];
    } else {
      return parsedTodoList;
    }
  }
  const todoList = getTodoListFromLS();

  /* SAVE TODO IN LOCAL STORAGE */
  saveTodoBtnEl.onclick = function () {
    todoList.length > 0
      ? localStorage.setItem("todoList", JSON.stringify(todoList))
      : null;
  };

  /* DELETE TODO */
  function onDeleteTodo(id) {
    const deleteTodoIndex = todoList.findIndex((eachTodo) => {
      if (eachTodo.id === id) {
        return true;
      } else {
        return false;
      }
    });
    todoList.splice(deleteTodoIndex, 1);
  }

  /*  TODO STATUS CHANGE */
  function onTodoStatusChange(id) {
    const todoObjIndex = todoList.findIndex((eachTodo) => {
      if (eachTodo.id === id) {
        return true;
      } else {
        return false;
      }
    });
    const todoObj = todoList[todoObjIndex];
    todoObj.isChecked === true
      ? (todoObj.isChecked = false)
      : (todoObj.isChecked = true);
    console.log(todoList);
  }

  /* CREATE AND APPEND TODO */
  function createAndAppendTodoItem(todoItem) {
    const todoItemContainerEl = document.createElement("li");
    todoItemContainerEl.classList.add("mb");
    todoItemsContainerEl.appendChild(todoItemContainerEl);

    const todoItemcardEl = document.createElement("section");
    todoItemcardEl.classList.add("todoItem-container");
    todoItemContainerEl.appendChild(todoItemcardEl);

    const checkboxEl = document.createElement("input");
    checkboxEl.id = todoItem.id;
    checkboxEl.type = "checkbox";
    checkboxEl.checked = todoItem.isChecked;
    todoItemcardEl.appendChild(checkboxEl);

    const todoItemContentContainerEl = document.createElement("label");
    todoItemContentContainerEl.htmlFor = todoItem.id;
    todoItemContentContainerEl.classList.add("todoItem-content-container");
    todoItemcardEl.appendChild(todoItemContentContainerEl);

    const todoItemContentEl = document.createElement("p");
    todoItemContentEl.textContent = todoItem.text;
    todoItem.isChecked
      ? todoItemContentEl.classList.add("strike-through")
      : null;
    todoItemContentContainerEl.appendChild(todoItemContentEl);

    const todoItemDeleteBtnContainerEl = document.createElement("button");
    todoItemDeleteBtnContainerEl.classList.add(
      "todoItem-delete-icon-container"
    );
    todoItemContentContainerEl.appendChild(todoItemDeleteBtnContainerEl);

    const todoItemDeleteBtnEl = document.createElement("i");
    todoItemDeleteBtnEl.classList.add(
      "delete-icon",
      "fa-regular",
      "fa-trash-can"
    );
    todoItemDeleteBtnContainerEl.appendChild(todoItemDeleteBtnEl);

    /* EVENT HANDLERS */

    /* CHECKBOX EVENT HANDLER */
    checkboxEl.onclick = function () {
      todoItemContentEl.classList.toggle("strike-through");
      onTodoStatusChange(todoItem.id);
    };

    /* DELETE TODO */
    todoItemDeleteBtnContainerEl.onclick = function () {
      todoItemsContainerEl.removeChild(todoItemContainerEl);
      onDeleteTodo(todoItem.id);
    };
  }

  for (let todoItem of todoList) {
    createAndAppendTodoItem(todoItem);
  }

  /* GENERATE UNIQUE ID */
  function uniqueIdGenerator() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  /* ADD NEW TODO */
  formEl.onsubmit = function (event) {
    event.preventDefault();
    const uniqueId = uniqueIdGenerator();
    const textContent = inputEl.value;
    if (textContent !== "") {
      console.log(uniqueId);
      const newTodo = {
        id: uniqueId,
        text: textContent,
        isChecked: false,
      };
      inputEl.value = "";
      todoList.push(newTodo);
      createAndAppendTodoItem(newTodo);
    }
  };
});
