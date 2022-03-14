const alerta = document.querySelector(".alert");
const formulario = document.querySelector("#formulario");
const formInput = document.querySelector(".form__input")
const newTask = document.querySelector(".newTask");
const todoMain = document.querySelector(".main");
const containerTodo = document.querySelector(".todo__container");
const templateTodo = document.querySelector("#templateTodo").content;

let tasks = [];

const agregarTarea = (task) => {
  const taskObjeto = {
    nombre: task,
    id: `${Date.now()}`,
  };

  tasks.push(taskObjeto);
};

const mostrarTareas = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));

  containerTodo.textContent = "";
  const fragment = document.createDocumentFragment();
  
  tasks.forEach((taskObjeto) => {
    const clone = templateTodo.cloneNode(true);
    clone.querySelector(".todo__text").textContent = taskObjeto.nombre;
    clone.querySelector(".remove-task").dataset.id = taskObjeto.id;
    
    fragment.appendChild(clone);
  });

  containerTodo.appendChild(fragment);
};

document.addEventListener("click", (e) => {
  if(e.target.matches(".remove-task")) {
    tasks = tasks.filter((item) => item.id !== e.target.dataset.id);
    mostrarTareas();
  }

  if(e.target.matches(".todo")) {
    e.target.classList.toggle("check")
  }

  if(e.target.matches(".todo__checkbox")) {
    e.target.classList.toggle("check");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    mostrarTareas();
  }
});

newTask.addEventListener("click", () => {
  formulario.classList.toggle("active");
  todoMain.classList.toggle("active");
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  alerta.classList.add("d-none");
  
  const datos = new FormData(formulario);
  const [task] = [...datos.values()];

  if (!task.trim()) {
    alerta.classList.remove("d-none");
    return;
  }
  
  todoMain.classList.toggle("active");
  formulario.classList.toggle("active");
  formInput.value = ""

  agregarTarea(task);
  mostrarTareas();
});