import header from "./header";
import renderProjects from "./projects";

export default function render(isNewProject, isNewTask) {
  document.querySelector('body').innerHTML = '';
  document.querySelector('body').appendChild(header());
  document.querySelector('body').appendChild(renderProjects(isNewProject, isNewTask));
}