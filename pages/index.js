import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

//const openModal = (modal) => {
  //modal.classList.add("popup_visible");
//};

//const closeModal = (modal) => {
  //modal.classList.remove("popup_visible");
//};

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  todoCounter.updateTotal();
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
}

const section = new Section({
  items: initialTodos,
  renderer(item) {
    const todo = generateTodo(item);
    todosList.append(todo);
  },
  containerSelector: (".todos__list"),
})

section.renderItems();

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    console.log(values);
    const name = values.name;
    const dateInput = values.name;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const valueswithId = { name, date, id };
    const todoElement = generateTodo(valueswithId);
    section.addItem(todoElement);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
  //openModal(addTodoPopupEl);
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});
  //closeModal(addTodoPopupEl);
//});

//addTodoForm.addEventListener("submit", (evt) => {
  //evt.preventDefault();
  //const name = evt.target.name.value;
  //const dateInput = evt.target.date.value;

  //const date = new Date(dateInput);
  //date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  //const id = uuidv4();
  //const values = { name, date, id };
  //renderTodo(values);
  //addTodoPopup.close();
  //closeModal(addTodoPopupEl);
//});

//initialTodos.forEach((item) => {
  //renderTodo(item);
//});

//function renderTodo(item) {
  //const todo = generateTodo(item);
  //todosList.append(todo);
//}

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();