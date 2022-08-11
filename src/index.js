import init from "./init";
import { storage } from "./storageAndClasses";
import render from "./render";

const storageCheck = JSON.parse(localStorage.getItem("projects"))

if(storageCheck != null && storageCheck.length != 0) {
  storage.updateProjects(JSON.parse(localStorage.getItem("projects")));
  render(false, false);
}
else {
  localStorage.setItem("projects", JSON.stringify([]));
  document.querySelector('body').appendChild(init());
}