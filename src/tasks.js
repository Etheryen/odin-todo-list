import render from "./render";
import { storage } from "./storageAndClasses";
import handleNewTask from "./handleNewTask";
import handleDateChange from "./handleDateChange";

export default function renderTasks(isNewTask) {
  const el = document.createElement('div');
  el.className = 'tasks';

  for(let task of storage.getTasksArray()) {
    const taskEl = document.createElement('div');
    taskEl.className = 'task';

    const title = document.createElement('div');
    title.innerHTML = task.title;

    const dueDate = document.createElement('div');
    if(task.id === storage.getTaskWithNewDate()) {
      const form = document.createElement('form');
      const input = document.createElement('input');
      const button = document.createElement('button');

      dueDate.className = 'newDate';

      button.innerHTML = '✓';
      input.type = 'date';
      input.name = 'newDate';
      input.id = 'newDate';
      input.required = true;
      form.id = 'newDateForm';

      form.appendChild(button);
      form.appendChild(input);
      dueDate.appendChild(form);
    }
    else {
      dueDate.className = 'date';
      dueDate.innerHTML = task.dueDate;
      handleDateChange(task.id, dueDate);
    }

    const remove = document.createElement('button');

    remove.type = 'button';
    remove.className = 'remove';
    remove.innerHTML = '✕'

    remove.addEventListener('click', event => {
      storage.removeTask(task.id);
      render(false, false);
    });

    taskEl.appendChild(title);
    taskEl.appendChild(dueDate);
    taskEl.appendChild(remove);
    el.appendChild(taskEl);
  }

  if(isNewTask) {
    const newTask = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');

    newTask.className = 'task new';

    input.type = 'text';
    input.name = 'newTaskName';
    input.id = 'newTaskName';
    input.required = true;
    input.maxLength = 60;
    input.size = '1';
    form.id = 'newTaskForm';

    form.appendChild(input);
    newTask.appendChild(form);
    el.appendChild(newTask);
  }
  else {
    const newTask = document.createElement('button');
    newTask.innerHTML = 'New task';
    newTask.className = 'task newTaskBtn';
    newTask.id = 'newTask';
    el.appendChild(newTask);
    handleNewTask(newTask);
  }

  return el;
}