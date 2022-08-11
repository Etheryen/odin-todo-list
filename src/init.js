import handleNewProject from "./handleNewProject";

export default function init() {
  const element = document.createElement('main');
  const header = document.createElement('h1');
  const newProject = document.createElement('button');

  header.innerHTML = 'Todo List';
  newProject.innerHTML = 'New project';

  element.className = 'init';
  newProject.id = 'newProject';
  newProject.className = 'project';
  
  handleNewProject(newProject)

  element.appendChild(header);
  element.appendChild(newProject);

  return element;
}