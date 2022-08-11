import render from "./render";
import { storage } from "./storageAndClasses";

export default function handleDateChange(taskId, dueDate) {
  dueDate.addEventListener('click', event => {
    storage.changeTaskWithNewDate(taskId);
    render(false, false);
    document.querySelector('#newDate').focus();
    const form = document.querySelector('#newDateForm');
    const field = document.querySelector('#newDate');
    form.addEventListener('submit', event => {
      event.preventDefault();
      storage.changeDate(taskId, field.value);
      storage.changeTaskWithNewDate(null);
      render(false, false);
    })
  });
}