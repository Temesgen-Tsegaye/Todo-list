import "./style.css";
import { differenceInCalendarQuarters, differenceInDays, format } from "date-fns";

const projecttab = document.getElementById("project");
const leftBar = document.getElementById("left-bar");
const projectNameForm = document.createElement("div");
const inputForProject = document.createElement("input");
const addProject = document.createElement("button");
const cancel = document.createElement("button");
const todoFormCreater = document.getElementById("pop-todo-form");
var mainFild = document.getElementById("main-fild");
const today = document.getElementById("today");
const month = document.getElementById("month");

leftBar.appendChild(projectNameForm);
projectNameForm.appendChild(inputForProject);
projectNameForm.appendChild(addProject);
projectNameForm.appendChild(cancel);
addProject.textContent = "add";
cancel.textContent = "cancel";
projectNameForm.classList.add("project-name-form");

projecttab.addEventListener("click", function () {
  projectNameForm.classList.remove("project-name-form");
});
addProject.addEventListener("click", function () {
  let listOfProject = document.createElement("button");
  projectNameForm.insertAdjacentElement("afterend", listOfProject);

  listOfProject.dataset.project = "yes";
  listOfProject.textContent = inputForProject.value;
  inputForProject.value = "";
  projectNameForm.classList.add("project-name-form");
});
cancel.addEventListener("click", function () {
  projectNameForm.classList.add("project-name-form");
});

//popup form

function todolistfun() {
  const todoForm = document.createElement("div");
  document.body.appendChild(todoForm);
  todoForm.classList.add("todo-form");

  const title = document.createElement("div");
  todoForm.appendChild(title);
  const titleLable = document.createElement("div");
  const titleInputFild = document.createElement("input");
  title.appendChild(titleLable);
  titleLable.textContent = "title";
  title.appendChild(titleInputFild);
  titleInputFild.setAttribute("id", "title-input");

  const description = document.createElement("div");
  todoForm.appendChild(description);
  const discriptionLable = document.createElement("div");
  const discriptionfild = document.createElement("input");
  description.appendChild(discriptionLable);
  discriptionLable.textContent = "Description";
  description.appendChild(discriptionfild);
  discriptionfild.setAttribute("id", "discription-fild");

  const prioprity = document.createElement("div");
  todoForm.appendChild(prioprity);
  const priopitylable = document.createElement("div");
  const priorityselect = document.createElement("select");
  prioprity.appendChild(priopitylable);
  priopitylable.textContent = "Periority";
  prioprity.appendChild(priorityselect);
  //
  const optHeigh = document.createElement("option");
  const optMidum = document.createElement("option");
  const optLow = document.createElement("option");
  priorityselect.appendChild(optHeigh);
  priorityselect.appendChild(optMidum);
  priorityselect.appendChild(optLow);
  optHeigh.textContent = "High";
  optMidum.textContent = "Middium";
  optLow.textContent = "Low";
  priorityselect.setAttribute("id", "priority-select");

  const date = document.createElement("div");
  todoForm.appendChild(date);
  const datelable = document.createElement("div");
  const datefild = document.createElement("input");
  datefild.type = "date";
  date.appendChild(datelable);
  date.appendChild(datefild);
  datefild.setAttribute("id", "date-fild");
  datelable.textContent = "Date";

  const project = document.createElement("div");
  todoForm.appendChild(project);
  const projectLable = document.createElement("div");
  const projectSelect = document.createElement("select");
  project.appendChild(projectLable);
  project.appendChild(projectSelect);
  projectLable.textContent = "Project";
  projectSelect.setAttribute("id", "project-select");

  const addTodo = document.createElement("button");
  const cancelTodo = document.createElement("button");
  todoForm.appendChild(addTodo);
  todoForm.appendChild(cancelTodo);
  addTodo.setAttribute("id", "add-Todo");
  cancelTodo.setAttribute("id", "cancel-Todo");
  addTodo.textContent = "add Todo";
  cancelTodo.textContent = "cancel";
  //
  cancelTodo.addEventListener("click", function (e) {
    e.target.parentElement.remove();
  });
  return {
    titleInputFild,
    projectSelect,
    discriptionfild,
    priorityselect,
    addTodo,
    cancelTodo,
    datefild,
  };
}

//object for input form

function optionGenarator() {
  const projectList = document.querySelectorAll("button[data-project='yes']");

  var obj = todolistfun();

  projectList.forEach((element) => {
    const option = document.createElement("option");
    obj.projectSelect.appendChild(option);
    option.textContent = element.innerHTML;
  });
}

todoFormCreater.addEventListener("click", optionGenarator);
var todoArray = [];
//create todolist arr
function todoArryCreater() {
  document.body.addEventListener("click", function (e) {
    let input = document.getElementById("title-input");
    let description = document.getElementById("discription-fild");
    let periority = document.getElementById("priority-select");
    let date = document.getElementById("date-fild");
    let project = document.getElementById("project-select");

    if (e.target.textContent == "add Todo") {
      var todoobject = new todoObj(
        input.value,
        description.value,
        periority.value,
        date.value,
        project.value
      );
      todoArray.push(todoobject);

      e.target.parentElement.remove();
    }
  });
}

todoArryCreater();

function todoObj(title, description, priority, date, project) {
  this.title = title;
  this.description = description;
  this.periority = priority;
  this.date = date;
  this.project = project;
}

leftBar.addEventListener("click", function (e) {
  if (e.target.hasAttribute("data-project")) {
    var filteredA = todoArray.filter(function (t) {
      if (e.target.textContent == t.project) {
        return true;
      }
    });
    createtodocontainer(filteredA);
  }
});

function createtodocontainer(filtred) {
  mainFild.innerHTML = "";

  filtred.forEach((element) => {
    const toContainer = document.createElement("div");
    const titleConainer = document.createElement("div");
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    const deleteButton = document.createElement("button");
    mainFild.appendChild(toContainer);
    toContainer.classList.add("todolistContainer");
    toContainer.appendChild(checkBox);
    toContainer.appendChild(titleConainer);
    toContainer.appendChild(deleteButton);

    //
    const fullinfo = document.createElement("div");
    const fullinfotitle = document.createElement("div");
    const fullinfoDate = document.createElement("div");
    const title_date = document.createElement("div");
    const fullinfoperiority = document.createElement("div");
    const fullinfoProject = document.createElement("div");
    const periority_project = document.createElement("div");
    const fullinfoDescription = document.createElement("div");
    toContainer.appendChild(fullinfo);
    fullinfo.classList.add("todo-full-info");
    fullinfo.appendChild(title_date);
    title_date.classList.add("todo-full-info-items");
    title_date.appendChild(fullinfotitle);
    title_date.appendChild(fullinfoDate);
    fullinfo.appendChild(periority_project);
    periority_project.classList.add("todo-full-info-items");
    periority_project.appendChild(fullinfoperiority);
    periority_project.appendChild(fullinfoProject);
    fullinfo.appendChild(fullinfoDescription);

    checkBox.addEventListener("click", function () {
      const cc = todoArray.findIndex(function (item) {
        if (element.title == item.title) {
          return true;
        }
      });
      if (checkBox.checked == true) {
        todoArray[cc].ch = "n";
        console.log(todoArray[cc]);
      }
      //  && todoArray[cc].hasOwnProperty('ch')
      if (checkBox.checked == false) {
        delete todoArray[cc].ch;

        console.log(todoArray[cc]);
      }
      //
    });
    if (element.hasOwnProperty("ch")) {
      checkBox.checked = true;
    } else {
      checkBox.checked = false;
    }
    //
    deleteButton.addEventListener("click", function (e) {
      e.target.parentElement.remove();
      const cc = todoArray.findIndex(function (item) {
        if (element.title == item.title) {
          return true;
        }
      });
      delete todoArray[cc];
    });

    titleConainer.textContent = element.title;
    deleteButton.textContent = "Delete";
  });
}
// filter based on time
function datebasrdfilter() {
  today.addEventListener("click", function () {
    let curretDateTask = todoArray.filter(function (item) {
      let diffenceindate = differenceInDays(new Date(item.date), new Date());
      if (diffenceindate == 0) {
        return true;
      }
      //
      mainFild.innerHTML = "";

      curretDateTask.forEach((element) => {
        const toContainer = document.createElement("div");
        const titleConainer = document.createElement("div");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        const deleteButton = document.createElement("button");
        mainFild.appendChild(toContainer);
        toContainer.classList.add("todolistContainer");
        toContainer.appendChild(checkBox);
        toContainer.appendChild(titleConainer);
        toContainer.appendChild(deleteButton);
    
        //
        const fullinfo = document.createElement("div");
        const fullinfotitle = document.createElement("div");
        const fullinfoDate = document.createElement("div");
        const title_date = document.createElement("div");
        const fullinfoperiority = document.createElement("div");
        const fullinfoProject = document.createElement("div");
        const periority_project = document.createElement("div");
        const fullinfoDescription = document.createElement("div");
        toContainer.appendChild(fullinfo);
        fullinfo.classList.add("todo-full-info");
        fullinfo.appendChild(title_date);
        title_date.classList.add("todo-full-info-items");
        title_date.appendChild(fullinfotitle);
        title_date.appendChild(fullinfoDate);
        fullinfo.appendChild(periority_project);
        periority_project.classList.add("todo-full-info-items");
        periority_project.appendChild(fullinfoperiority);
        periority_project.appendChild(fullinfoProject);
        fullinfo.appendChild(fullinfoDescription);
    
        checkBox.addEventListener("click", function () {
          const cc = todoArray.findIndex(function (item) {
            if (element.title == item.title) {
              return true;
            }
          });
          if (checkBox.checked == true) {
            todoArray[cc].ch = "n";
            console.log(todoArray[cc]);
          }
          //  && todoArray[cc].hasOwnProperty('ch')
          if (checkBox.checked == false) {
            delete todoArray[cc].ch;
    
            console.log(todoArray[cc]);
          }
          //
        });
        if (element.hasOwnProperty("ch")) {
          checkBox.checked = true;
        } else {
          checkBox.checked = false;
        }
        //
        deleteButton.addEventListener("click", function (e) {
          e.target.parentElement.remove();
          const cc = todoArray.findIndex(function (item) {
            if (element.title == item.title) {
              return true;
            }
          });
          delete todoArray[cc];
        });
    
        titleConainer.textContent = element.title;
        deleteButton.textContent = "Delete";
      });
      //
    });
    
   
  
  });
  month.addEventListener("click", function () {
    let curretMonthTask = todoArray.filter(function (item) {
      let diffenceindate = differenceInDays(new Date(item.date), new Date());
      if (diffenceindate<=30 && diffenceindate>=0) {
        return true;
      }
      mainFild.innerHTML = "";

      curretMonthTask.forEach((element) => {
        const toContainer = document.createElement("div");
        const titleConainer = document.createElement("div");
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        const deleteButton = document.createElement("button");
        mainFild.appendChild(toContainer);
        toContainer.classList.add("todolistContainer");
        toContainer.appendChild(checkBox);
        toContainer.appendChild(titleConainer);
        toContainer.appendChild(deleteButton);
    
        //
        const fullinfo = document.createElement("div");
        const fullinfotitle = document.createElement("div");
        const fullinfoDate = document.createElement("div");
        const title_date = document.createElement("div");
        const fullinfoperiority = document.createElement("div");
        const fullinfoProject = document.createElement("div");
        const periority_project = document.createElement("div");
        const fullinfoDescription = document.createElement("div");
        toContainer.appendChild(fullinfo);
        fullinfo.classList.add("todo-full-info");
        fullinfo.appendChild(title_date);
        title_date.classList.add("todo-full-info-items");
        title_date.appendChild(fullinfotitle);
        title_date.appendChild(fullinfoDate);
        fullinfo.appendChild(periority_project);
        periority_project.classList.add("todo-full-info-items");
        periority_project.appendChild(fullinfoperiority);
        periority_project.appendChild(fullinfoProject);
        fullinfo.appendChild(fullinfoDescription);
    
        checkBox.addEventListener("click", function () {
          const cc = todoArray.findIndex(function (item) {
            if (element.title == item.title) {
              return true;
            }
          });
          if (checkBox.checked == true) {
            todoArray[cc].ch = "n";
            console.log(todoArray[cc]);
          }
          //  && todoArray[cc].hasOwnProperty('ch')
          if (checkBox.checked == false) {
            delete todoArray[cc].ch;
    
            console.log(todoArray[cc]);
          }
          //
        });
        if (element.hasOwnProperty("ch")) {
          checkBox.checked = true;
        } else {
          checkBox.checked = false;
        }
        //
        deleteButton.addEventListener("click", function (e) {
          e.target.parentElement.remove();
          const cc = todoArray.findIndex(function (item) {
            if (element.title == item.title) {
              return true;
            }
          });
          delete todoArray[cc];
        });
    
        titleConainer.textContent = element.title;
        deleteButton.textContent = "Delete";
      });
    });
   
  });

}
datebasrdfilter();
