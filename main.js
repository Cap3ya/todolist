import Task from "./classes/task.js";
import User from "./classes/user.js";
import sortBy from "./functions/sortBy.js";
import filterBy from "./functions/filterBy.js";
import users from './data/database.js';

// Custom List 
let inputSortBy = document.querySelector('#sortBy');
inputSortBy.addEventListener("change", function () {
  appendTasks(sortBy(user.tasks, this.value));
})
let inputFilterByKey = document.querySelector('#filterBy_key');
let inputFilterByValue = document.querySelector('#filterBy_value');
inputFilterByValue.addEventListener("keyup", function () {
  appendTasks(filterBy(user.tasks, inputFilterByKey.value, this.value))
})

// DIALOG \\
const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#openDialog_button");
const closeButton = document.querySelector("#closeDialog_button");
// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});
// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});
// Create Task
const createTaskBtn = document.querySelector('#createTask_button');
createTaskBtn.addEventListener('click', () => {
  const form = document.forms[2];
  const name = form.name.value;
  const isDone = false;
  const labels = form.labels.value.split(" ");
  const dueDate = form.dueDate.value;
  const dueTime = form.dueTime.value;
  const importance = Number(form.importance.value);
  const description = form.description.value;

  user.createTask(name, labels, isDone, dueDate, dueTime, importance, description)
  appendTasks(user.tasks)
  renderTasksProgress();
  dialog.close();
})
function appendTasks(tasks) {

  let root = document.querySelector('#tasks');
  root.innerHTML = tasks.map(task => {
    return `
    <li id=${task.id}>
      <input key='name' type="text" value="${task.name || "Task"}">
      <small>${task.dueDate && task.timeLeft}</small>
      <input key='isDone' type="checkbox" ${task.isDone === true && 'checked'}>
      <input key='dueDate' type="date" value='${task.dueDate}'>
      <input key='dueTime' type="time" value=${task.dueTime}>
      <input key='labels' type="text" value="${task.labels.join(" ") || "labels"}">
      <textarea key='description'>${task.description}</textarea>
      <label>importance: 
      <input key='importance' type="number" value=${task.importance} max="4" min="0">
      </label>
      <p>urgency: <span>${task.urgence}</span></p>
      <p>priority: <span>${task.priority}</span></p>
      <button class="onClickDelete" type="button">&times</button>
    </li>`
  }).join("")

  document.querySelectorAll('.onClickDelete').
    forEach(item => item.addEventListener("click", function () {
      onClickDelete(this.parentNode.id)
      this.parentNode.remove();
      renderTasksProgress();
    }))
    handleName()
    handleIsDone()
    handleDueDate()
    handleDueTime()
    handleLabels()
    handleDescription()
    handleImportance()
}
function onClickDelete(id) {
  const task = user.tasks.find(task => task.id === id);
  task.remove();
}
// LOGIN
function authenticateUser() {
  const name = document.querySelector('#login_username').value.trim();
  const pass = document.querySelector('#login_password').value.trim();

  for (let user of users) {
    if (user.name === name) {
      if (user.password === pass) {
        const id = user.id;
        document.querySelector('main').hidden = false;
        document.querySelector('#loginSignup').hidden = true;
        window.user = users.find(user => user.id == id);
        document.querySelector('#greetings').innerText = user.name;
        appendTasks(user.tasks);
        renderTasksProgress()
        return;
      }
    }
  }
  document.querySelector('#login_err1').hidden = false;
}
document.querySelector('#login_button').
  addEventListener('click', () => authenticateUser())

// SIGNUP
function createUser() {
  const name = document.querySelector('#signup_username').value;
  const pass = document.querySelector('#signup_password').value;
  const conf = document.querySelector('#signup_passconf').value;

  let isValid = true;

  if (name.length < 3) {
    isValid = false;
    document.querySelector('#signup_err1').hidden = false;
  } else {
    document.querySelector('#signup_err1').hidden = true;
  }
  if (pass.length < 3) {
    isValid = false;
    document.querySelector('#signup_err2').hidden = false;
  } else {
    document.querySelector('#signup_err2').hidden = true;
  }
  if (pass !== conf) {
    isValid = false;
    document.querySelector('#signup_err3').hidden = false;
  } else {
    document.querySelector('#signup_err3').hidden = true;
  }
  if (users.find(user => user.username === name && user.password === pass)) {
    isValid = false;
    document.querySelector('#signup_err4').hidden = false;
  } else {
    document.querySelector('#signup_err4').hidden = true;
  }
  if (isValid) {
    const user = new User(name, pass);
    users.push(user);

    document.querySelector('input[type="checkbox"]').checked = false;
    document.querySelector('#login_username').value = name;
    document.querySelector('#login_password').value = pass;
    document.querySelector('#login_err1').hidden = true;
  }
}
document.querySelector('#signup_button').
  addEventListener('click', () => createUser())

// MAIN HEADER
// You have x tasks 
function countDoneTasks() {
  return user.tasks.filter(task => task.isDone === true).length
}
// Among which x are done
function renderTasksProgress() {
  const count = document.querySelector('#tasksCount');
  const progress = document.querySelector('#tasksProgress');
  count.innerText = user.tasks.length;
  progress.innerText = countDoneTasks();
}

function handleDueDate() {
  const input = document.querySelectorAll('input[key="dueDate"]');
  input.forEach(input => input.addEventListener('input', (event) => {
    // Get root (task)
    const root = event.target.parentNode;
    // Get task id 
    const id = root.id
    // Get task 
    const task = user.tasks.find(task => task.id === id); 
    // Set value
    task.dueDate = event.target.value;
    // Get timeLeft and urgency 
    const [timeLeft, urgency] = [task.timeLeft, task.urgence]
    // render timeLeft and urgency
    root.children[1].innerText = timeLeft;
    root.children[8].children[0].innerText = urgency;
    console.log(task.dueDate)

  }))
}
function handleDueTime() {
  const input = document.querySelectorAll('input[key="dueTime"]');
  input.forEach(input => input.addEventListener('input', (event) => {
    // Get root (task)
    const root = event.target.parentNode;
    // Get task id 
    const id = root.id
    // Get task 
    const task = user.tasks.find(task => task.id === id); 
    // Set value
    task.dueTime = event.target.value;
    console.log(task.dueTime)
  }))
}
function handleImportance() {
  const input = document.querySelectorAll('input[key="importance"]');
  input.forEach(input => input.addEventListener('input', (event) => {
    // Get root (task)
    const root = event.target.parentNode.parentNode;
    // Get task id 
    const id = root.id
    // Get task 
    const task = user.tasks.find(task => task.id === id); 
    // Set value
    task.importance = parseInt(event.target.value);
    // Get timeLeft and urgency 
    const priority = task.priority;
    // render priority
    root.children[9].children[0].innerText = priority;
    console.log(task.importance)
  }))
}
function handleIsDone() {
  const input = document.querySelectorAll('input[key="isDone"]');
  input.forEach(input => input.addEventListener('input', (event) => {
    // Get root (task)
    const root = event.target.parentNode;
    // Get task id 
    const id = root.id
    // Get task 
    const task = user.tasks.find(task => task.id === id); 
    // Set value
    task.isDone = Boolean(event.target.checked);
    renderTasksProgress();
    console.log(task.isDone)
  }))
}
function handleName() {
  const input = document.querySelectorAll('input[key="name"]');
  input.forEach(input => input.addEventListener('input', (event) => {
    // Get root (task)
    const root = event.target.parentNode;
    // Get task id 
    const id = root.id
    // Get task 
    const task = user.tasks.find(task => task.id === id); 
    // Set value
    task.name = event.target.value.trim();
    console.log(task.name)
  }))
}
function handleLabels() {
  const input = document.querySelectorAll('input[key="labels"]');
  input.forEach(input => input.addEventListener('input', (event) => {
    // Get root (task)
    const root = event.target.parentNode;
    // Get task id 
    const id = root.id
    // Get task 
    const task = user.tasks.find(task => task.id === id); 
    // Set value
    task.labels = event.target.value.trim().split(' ');
    console.log(task.labels)
  }))
}

function handleDescription() {
  const input = document.querySelectorAll('[key="description"]');
  input.forEach(input => input.addEventListener('keyup', (event) => {
    // Get root (task)
    const root = event.target.parentNode;
    // Get task id 
    const id = root.id
    // Get task 
    const task = user.tasks.find(task => task.id === id); 
    // Set value
    task.description = event.target.value.trim();
    console.log(task.description)
  }))
}