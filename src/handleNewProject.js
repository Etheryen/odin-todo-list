import render from "./render";
import { storage } from "./storageAndClasses";

export default function handleNewProject(newProject) {
  newProject.addEventListener('click', event => {
    render(true, false);
    document.querySelector('#newProjectName').focus();
    const form = document.querySelector('#newProjectForm');
    const field = document.querySelector('#newProjectName');
    form.addEventListener('submit', event => {
      event.preventDefault();
      storage.addProject(field.value);
      render(false, false);
    })
  });
}