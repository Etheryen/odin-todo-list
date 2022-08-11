(()=>{"use strict";const e=function*(){let e=function(){if(!a.getProjects().length)return 0;let e=[];return a.getProjects().forEach((t=>{e.push(t.id),t.tasksArray.forEach((t=>{e.push(t.id)}))})),Math.max(...e)+1}();for(;;)yield e++}();class t{constructor(t){this.title=t,this.tasksArray=[],this.id=e.next().value}}class n{constructor(t){this.title=t,this.dueDate="No date",this.id=e.next().value}}const a=function(){let e=[],a=null,r=null;return{addProject:n=>{let a=new t(n);e.push(a),localStorage.setItem("projects",JSON.stringify(e))},getProjects:()=>e,updateProjects:t=>{e=t},removeProject:t=>{e=e.filter((e=>{if(e.id!=t)return e})),localStorage.setItem("projects",JSON.stringify(e))},changeCurrentProject:e=>{r=null,a=e},getCurrentProjectId:()=>a,getTasksArray:()=>e.filter((e=>{if(e.id===a)return e}))[0].tasksArray,addTask:t=>{e.filter((e=>{e.id===a&&e.tasksArray.push(new n(t))})),localStorage.setItem("projects",JSON.stringify(e))},changeTaskWithNewDate:e=>{r=e},getTaskWithNewDate:()=>r,removeTask:t=>{e.filter(((n,r)=>{n.id===a&&n.tasksArray.filter(((n,a)=>{n.id===t&&e[r].tasksArray.splice(a,1)}))})),localStorage.setItem("projects",JSON.stringify(e))},changeDate:(t,n)=>{e.filter(((r,c)=>{r.id===a&&r.tasksArray.filter(((a,r)=>{a.id===t&&(e[c].tasksArray[r].dueDate=n)}))})),localStorage.setItem("projects",JSON.stringify(e))}}}();function r(e,t){t.addEventListener("click",(t=>{a.changeTaskWithNewDate(e),c(!1,!1),document.querySelector("#newDate").focus();const n=document.querySelector("#newDateForm"),r=document.querySelector("#newDate");n.addEventListener("submit",(t=>{t.preventDefault(),a.changeDate(e,r.value),a.changeTaskWithNewDate(null),c(!1,!1)}))}))}function c(e,t){document.querySelector("body").innerHTML="",document.querySelector("body").appendChild(function(){const e=document.createElement("h1");return e.innerHTML="Todo List",e}()),document.querySelector("body").appendChild(function(e,t,n){const d=document.createElement("main"),s=document.createElement("div");d.className="app",s.className="container";for(const e of a.getProjects()){const t=document.createElement("div"),n=document.createElement("div"),r=document.createElement("button");t.className="project",n.innerHTML=e.title,n.className="title",r.type="button",r.className="remove",r.innerHTML="✕",r.addEventListener("click",(t=>{t.stopPropagation(),a.removeProject(e.id),a.changeCurrentProject(null),c(!1,!1)})),t.addEventListener("click",(t=>{a.changeCurrentProject(e.id),c(!1,!1)})),t.appendChild(n),t.appendChild(r),s.appendChild(t)}if(e){const e=document.createElement("div"),t=document.createElement("form"),n=document.createElement("input");e.className="project new",n.type="text",n.name="newProjectName",n.required=!0,n.maxLength=25,n.id="newProjectName",n.size="1",t.id="newProjectForm",t.appendChild(n),e.appendChild(t),s.appendChild(e)}else{const e=document.createElement("button");e.innerHTML="New project",e.className="project newProjectBtn",e.id="newProject",s.appendChild(e),o(e)}if(d.appendChild(s),a.getCurrentProjectId()||0===a.getCurrentProjectId())d.appendChild(function(e){const t=document.createElement("div");t.className="tasks";for(let e of a.getTasksArray()){const n=document.createElement("div");n.className="task";const o=document.createElement("div");o.innerHTML=e.title;const d=document.createElement("div");if(e.id===a.getTaskWithNewDate()){const e=document.createElement("form"),t=document.createElement("input"),n=document.createElement("button");d.className="newDate",n.innerHTML="✓",t.type="date",t.name="newDate",t.id="newDate",t.required=!0,e.id="newDateForm",e.appendChild(n),e.appendChild(t),d.appendChild(e)}else d.className="date",d.innerHTML=e.dueDate,r(e.id,d);const s=document.createElement("button");s.type="button",s.className="remove",s.innerHTML="✕",s.addEventListener("click",(t=>{a.removeTask(e.id),c(!1,!1)})),n.appendChild(o),n.appendChild(d),n.appendChild(s),t.appendChild(n)}if(e){const e=document.createElement("div"),n=document.createElement("form"),a=document.createElement("input");e.className="task new",a.type="text",a.name="newTaskName",a.id="newTaskName",a.required=!0,a.maxLength=60,a.size="1",n.id="newTaskForm",n.appendChild(a),e.appendChild(n),t.appendChild(e)}else{const e=document.createElement("button");e.innerHTML="New task",e.className="task newTaskBtn",e.id="newTask",t.appendChild(e),function(e){e.addEventListener("click",(e=>{c(!1,!0),document.querySelector("#newTaskName").focus();const t=document.querySelector("#newTaskForm"),n=document.querySelector("#newTaskName");t.addEventListener("submit",(e=>{e.preventDefault(),a.addTask(n.value),c(!1,!1)}))}))}(e)}return t}(t));else{const e=document.createElement("div");e.className="content";const t=document.createElement("img");t.src="img/enter-outline.svg",t.className="emptyContent";const n=document.createElement("span");n.innerHTML="Click a project do display its contents",e.appendChild(t),e.appendChild(n),d.appendChild(e)}return d}(e,t))}function o(e){e.addEventListener("click",(e=>{c(!0,!1),document.querySelector("#newProjectName").focus();const t=document.querySelector("#newProjectForm"),n=document.querySelector("#newProjectName");t.addEventListener("submit",(e=>{e.preventDefault(),a.addProject(n.value),c(!1,!1)}))}))}const d=JSON.parse(localStorage.getItem("projects"));null!=d&&0!=d.length?(a.updateProjects(JSON.parse(localStorage.getItem("projects"))),c(!1,!1)):(localStorage.setItem("projects",JSON.stringify([])),document.querySelector("body").appendChild(function(){const e=document.createElement("main"),t=document.createElement("h1"),n=document.createElement("button");return t.innerHTML="Todo List",n.innerHTML="New project",e.className="init",n.id="newProject",n.className="project",o(n),e.appendChild(t),e.appendChild(n),e}()))})();