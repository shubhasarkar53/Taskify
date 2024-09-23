const createTodoButtons = document.querySelectorAll(".create-todo");
const todoModal = document.querySelector("#todoModal");


function getElement(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function setDroppedElement(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");

  let draggedElement = document.getElementById(data);

  // Check if the drop target is the '.dropable-area' itself
  if (ev.target.classList.contains("dropable-area")) {
    // Append the dragged element to the dropable-area
    ev.target.appendChild(draggedElement);
  }
}

function showModal() {
  const todoModal = document.querySelector("#todoModal");
  todoModal.style.display = "flex";
}

function hideModal() {
  const todoModal = document.querySelector("#todoModal");
  todoModal.style.display = "none";
}

function fetchDeleteBtnAndDelete(){
  const todoDeleteBtn = document.querySelectorAll(".del-btn");
  todoDeleteBtn.forEach((btn)=>{
    btn.addEventListener("click", function (){
      handleDeleteTodo(this);
    })
  })
}

function handleDeleteTodo(btn){
  const parent = btn.parentElement;
  parent.remove();
}

function  storeDataIntoLocalStorage( title, description, difficulty, currentDropArea ){
  const todoObj = {
    title : title , description : description, difficulty:difficulty, currentDropArea:currentDropArea
  }

  localStorage.setItem("todoObj",JSON.stringify(todoObj));
}




let currentDropArea = null;

function takeInputsAndRender(e) {
  e.preventDefault();
  const todoTitle = document.querySelector("#taskTitle").value.trim();
  const todoDescription = document.querySelector("#taskDescription").value.trim();
  const todoDifficulty = document.querySelector("#taskDifficulty").value.trim();

  renderOnUi(todoTitle, todoDescription, todoDifficulty, currentDropArea);
}

function renderOnUi(title, description, difficulty, currentDropArea) {
  const newDiv = document.createElement("div");
  const newTodo = `<div class="todo" draggable="true" ondragstart="getElement(event)" id="drag${
    Math.random() * 10000
  }">
        <h3 class="title">${title}</h3>
        <p class="description">${description}</p>
        <span class="difficulty">Difficulty: ${difficulty}</span>
        <i class="fa-solid fa-trash del-btn"></i>
      </div>`;
  newDiv.innerHTML = newTodo;
  newDiv.style.marginBlock = "0.5rem";

  storeDataIntoLocalStorage(title, description, difficulty, currentDropArea);
  currentDropArea.appendChild(newDiv);

  fetchDeleteBtnAndDelete();

  

  document.querySelector("#taskTitle").value = "";
  document.querySelector("#taskDescription").value = "";
  document.querySelector("#taskDifficulty").value = "Easy";

  hideModal();
}

function handleModal(button) {
  // Get the parent section of the clicked button
  const parentSection = button.parentElement;
  currentDropArea = parentSection.querySelector(".dropable-area");

  showModal(); // Show the modal
}

createTodoButtons.forEach((button) => {
  button.addEventListener("click", function () {
    handleModal(this); // Pass the current button as a reference
  });
});

const createTodoModal = document.querySelector(".create-todo-modal");
createTodoModal.addEventListener("click", takeInputsAndRender);

const closeModalBtn = document.querySelector(".close-modal");

closeModalBtn.addEventListener("click", hideModal);

window.onclick = function (event) {
  if (event.target == todoModal) {
    hideModal();
  }
};




