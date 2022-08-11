import handleNewProject from "./handleNewProject";
import render from "./render";
import { storage } from "./storageAndClasses";
import renderTasks from "./tasks";

export default function renderProjects(isNewProject, isNewTask, isNewDate) {
  const main = document.createElement('main');
  const container = document.createElement('div');

  main.className = 'app';
  container.className = 'container';

  for(const project of storage.getProjects()) {
    const el = document.createElement('div');
    const title = document.createElement('div');
    const remove = document.createElement('button');
    
    el.className = 'project';
    title.innerHTML = project.title;
    title.className = 'title';
    remove.type = 'button';
    remove.className = 'remove';
    remove.innerHTML = '✕'

    remove.addEventListener('click', event => {
      event.stopPropagation();
      storage.removeProject(project.id);
      storage.changeCurrentProject(null);
      render(false, false);
    });

    el.addEventListener('click', event => {
      storage.changeCurrentProject(project.id);
      render(false, false);
    });

    el.appendChild(title);
    el.appendChild(remove);
    container.appendChild(el);
  }

  if(isNewProject) {
    const newProject = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');

    newProject.className = 'project new';

    input.type = 'text';
    input.name = 'newProjectName';
    input.required = true;
    input.maxLength = 25;
    input.id = 'newProjectName';
    input.size = '1';
    form.id = 'newProjectForm';

    form.appendChild(input);
    newProject.appendChild(form);
    container.appendChild(newProject);
  }
  else {
    const newProject = document.createElement('button');
    newProject.innerHTML = 'New project';
    newProject.className = 'project newProjectBtn';
    newProject.id = 'newProject';
    container.appendChild(newProject);
    handleNewProject(newProject);
  }

  main.appendChild(container);

  if(storage.getCurrentProjectId() || storage.getCurrentProjectId() === 0) {
    main.appendChild(renderTasks(isNewTask, isNewDate));
  }
  else {
    const content = document.createElement('div');
    content.className = 'content';
  
    const img = document.createElement('img');
    img.src = 'img/enter-outline.svg';
    img.className = 'emptyContent';
    const span = document.createElement('span');
    span.innerHTML = 'Click a project do display its contents';
    
    content.appendChild(img);
    content.appendChild(span);
    main.appendChild(content)
  }

  return main;
}