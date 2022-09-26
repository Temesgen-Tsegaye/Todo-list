import "./style.css";
import {
  differenceInCalendarQuarters,
  differenceInDays,
  format,
} from "date-fns";

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
//
// const LOCAL_STORAGE_ARRAY_KEY = "toDoArr";
// JSON.parse(localStorage.getItem(LOCAL_STORAGE_ARRAY_KEY)) ||
var todoArray = [];

// function updateLocalStorage() {
//   localStorage.setItem(LOCAL_STORAGE_ARRAY_KEY, JSON.stringify(todoArray));
// }
// updateLocalStorage();

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
  listOfProject.dataset.clickedRecently ="";
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
todoFormCreater.addEventListener("click", todoArryCreater);

//create todolist arr
function todoArryCreater() {
  let input = document.getElementById("title-input");
  let description = document.getElementById("discription-fild");
  let periority = document.getElementById("priority-select");
  let date = document.getElementById("date-fild");
  let project = document.getElementById("project-select");
  let addTodo = document.getElementById("add-Todo");

  addTodo.addEventListener("click", function () {
    var todoobject = new todoObj(
      input.value,
      description.value,
      periority.value,
      date.value,
      project.value
    );
  
    todoArray.push(todoobject);
    bb(todoobject)
    
    // updateLocalStorage();

    addTodo.parentElement.remove();
  });
}

function todoObj(title, description, priority, date, project) {
  this.title = title;
  this.description = description;
  this.periority = priority;
  this.date = date;
  this.project = project;
}

leftBar.addEventListener("click", function (e) {
  var AllTabs=document.querySelectorAll('[data-clicked-recently]')

  AllTabs.forEach(element => {
    if(element==e.target){
     e.target.dataset.clickedRecently='true'
    }
    else{
      element.dataset.clickedRecently='false'
    }
    
  });

  if (e.target.hasAttribute("data-project")) {
    
    let filteredA = todoArray.filter(function (t) {
      if (e.target.textContent == t.project) {
        return true;
      }
    });
    createtodocontainer(filteredA);
  } else if (e.target.hasAttribute("data-today")) {
    console.log("x");
    let curretDateTask = todoArray.filter(function (item) {
      let diffenceindate = differenceInDays(new Date(item.date), new Date());
      if (diffenceindate == 0) {
        return true;
      }
    });
    createtodocontainer(curretDateTask);
  } else if (e.target.hasAttribute("data-month")) {
   
  
      let curretMonthTask = todoArray.filter(function (item) {
        let diffenceindate = differenceInDays(new Date(item.date), new Date());
        if (diffenceindate <= 30 && diffenceindate >= 0) {
          return true;
        }
      });
      createtodocontainer(curretMonthTask);
    
  }
});

function createtodocontainer(filtred) {
  mainFild.innerHTML = "";

  filtred.forEach((element) => {
   appendtodoDom(element);
  });
}
function appendtodoDom(element){
  
  const toContainer = document.createElement("div");
  const TOP=document.createElement('div')
  
  const titleConainer = document.createElement("div");
  const checkBox = document.createElement("input");
  const MORE=document.createElement('button')
  checkBox.type = "checkbox";
  const deleteButton = document.createElement("button");
  mainFild.appendChild(toContainer);
  toContainer.classList.add("todolistContainer");
  toContainer.appendChild(TOP)
  TOP.appendChild(checkBox)
  TOP.appendChild(titleConainer)
  TOP.appendChild(MORE)
  TOP.appendChild(deleteButton)
  TOP.classList.add('top')
  
  //
  
  

  //
  const hiddenContainer = document.createElement("div");
   toContainer.appendChild(hiddenContainer)
   hiddenContainer.classList.add('bottom')
  
  const PERIORITY=document.createElement('div')
  const DATE=document.createElement('div')
  const PROJECT=document.createElement('div')
  const DESCRIPTION=document.createElement('div')
  
  
  
  hiddenContainer.appendChild(PERIORITY)
  hiddenContainer.appendChild(PROJECT)
 hiddenContainer.appendChild(DATE)
 hiddenContainer.appendChild(DESCRIPTION)
  //
  PERIORITY.textContent=`Periority: ${element.periority}`
  DATE.textContent=`Date: ${element.date}`
  PROJECT.textContent=`Project: ${element.project}`
  DESCRIPTION.textContent=`Description: ${element.description}`
  checkBox.addEventListener("click", function () {
    const cc = todoArray.findIndex(function (item) {
      if (element.title == item.title) {
        return true;
      }
    });
    if (checkBox.checked == true) {
      todoArray[cc].ch = "n";
      // updateLocalStorage();
    }
    //  && todoArray[cc].hasOwnProperty('ch')
    if (checkBox.checked == false && element.hasOwnProperty('ch')) {
      delete todoArray[cc].ch
      // updateLocalStorage();
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
    e.target.parentElement.parentElement.remove();
    const cc = todoArray.findIndex(function (item) {
      if (element.title == item.title) {
        return true;
      }
    });
   todoArray.splice(cc,1);
    // updateLocalStorage();
  });
  hiddenContainer.classList.add('bottom-toggle')
  // if(hiddenContainer.hasAttribute('bottom-toggle')){
  //   hiddenContainer.removeAttribute('bottom-toggle')
  // }
  MORE.addEventListener('click',function(){
    
    hiddenContainer.classList.toggle('bottom-toggle')
  })

  titleConainer.textContent = element.title;
  deleteButton.textContent = "Delete";

 }

 //render todo on main fild opend filter(project or time tabs)
 function bb(element){
  let diffenceindate = differenceInDays(new Date(element.date), new Date());
  
   var recentlyClicked=document.querySelector('[data-clicked-recently="true"]')
    
   if(recentlyClicked.innerHTML=='today' && diffenceindate==0){
      appendtodoDom(element)
   }
   else if(recentlyClicked.innerHTML=='month' && (diffenceindate<=30 && diffenceindate>=0)){
    // diffenceindate<=30
     appendtodoDom(element);
   }
   else if(recentlyClicked.innerHTML==element.project){
     appendtodoDom(element)


   }
 }

 //updating function
 function upadate(){
   //get array index of clicked
         //adding data attribute that have arry index
         

   //update arry on  click upadate
            //update title
   //change text content of title of dom 
      //update title
          //
 }