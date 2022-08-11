import render from "./render";
import { storage } from "./storageAndClasses";

export default function handleNewTask(newTask) {
  newTask.addEventListener('click', event => {
    render(false, true);
    document.querySelector('#newTaskName').focus();
    const form = document.querySelector('#newTaskForm');
    const field = document.querySelector('#newTaskName');
    form.addEventListener('submit', event => {
      event.preventDefault();
      storage.addTask(field.value);
      render(false, false);
    })
  });
}