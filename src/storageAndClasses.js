function findHighestId() {
  if(!storage.getProjects().length) {
    return 0;
  }
  let ids = [];
  storage.getProjects().forEach(project => {
    ids.push(project.id);
    project.tasksArray.forEach(task => {
      ids.push(task.id);
    })
  });

  return Math.max(...ids) + 1;
}

function* idMaker() {
  let current = findHighestId();
  while(true)
    yield current++;
}

const gen = idMaker();

class Project {
  constructor(title) {
    this.title = title;
    this.tasksArray = [];
    this.id = gen.next().value;
  }
}

class Task {
  constructor(title) {
    this.title = title;
    this.dueDate = 'No date';
    this.id = gen.next().value;
  }
}

export const storage = (function() {
  let _projects = [];
  let _currentProjectId = null;
  let _taskWithNewDate = null;

  const addProject = (newProjectName) => {
    let newProject = new Project(newProjectName);
    _projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(_projects));
  }

  const getProjects = () => _projects;

  const updateProjects = (newArray) => {
    _projects = newArray;
  }

  const removeProject = (projectIdToRemove) => {
    _projects = _projects.filter((project) => {
      if(project.id != projectIdToRemove) {
        return project;
      }
    });
    localStorage.setItem("projects", JSON.stringify(_projects));
  }

  const changeCurrentProject = (newCurrentProjectId) => {
    _taskWithNewDate = null;
    _currentProjectId = newCurrentProjectId;
  }

  const getCurrentProjectId = () => _currentProjectId;

  const getTasksArray = () => {
    const project = _projects.filter((project) => {
      if(project.id === _currentProjectId) {
        return project;
      }
    });

    return project[0].tasksArray;
  }

  const addTask = (newTaskName) => {
    _projects.filter((project) => {
      if(project.id === _currentProjectId) {
        project.tasksArray.push(new Task(newTaskName));
      }
    });
    localStorage.setItem("projects", JSON.stringify(_projects));
  }

  const removeTask = (taskIdToRemove) => {
    _projects.filter((project, iOfProject) => {
      if(project.id === _currentProjectId) {
        project.tasksArray.filter((task, iOfTask) => {
          if(task.id === taskIdToRemove) {
            _projects[iOfProject].tasksArray.splice(iOfTask, 1);
          }
        });
      }
    });
    localStorage.setItem("projects", JSON.stringify(_projects));
  }

  const changeTaskWithNewDate = (taskId) => {
    _taskWithNewDate = taskId;
  }

  const getTaskWithNewDate = () => _taskWithNewDate;

  const changeDate = (taskIdNewDate, newDate) => {
    _projects.filter((project, iOfProject) => {
      if(project.id === _currentProjectId) {
        project.tasksArray.filter((task, iOfTask) => {
          if(task.id === taskIdNewDate) {
            _projects[iOfProject].tasksArray[iOfTask].dueDate = newDate;
          }
        });
      }
    });
    localStorage.setItem("projects", JSON.stringify(_projects));
  }

  return {
    addProject,
    getProjects,
    updateProjects,
    removeProject,
    changeCurrentProject,
    getCurrentProjectId,
    getTasksArray,
    addTask,
    changeTaskWithNewDate,
    getTaskWithNewDate,
    removeTask,
    changeDate,
  }
})();