const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");


document.addEventListener("DOMContentLoaded", getList);
toDoButton.addEventListener("click", addToDo);


// CREATE A NEW ITEM
function createNewToDo () {
	let toDoDiv = document.createElement("div");
	toDoDiv.classList.add("todo");
	
	// TEXT IN THE NEW ITEM
	let newToDo = document.createElement("li");
  if (toDoInput.value === "") {
    alert("Write something please :)")
  } else {
    newToDo.innerText = toDoInput.value;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);
    saveList(toDoInput.value);

	
	
	// BUTTON TO MARK THE ITEM AS COMPLETED
	let completedButton = document.createElement("button");
	completedButton.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
	completedButton.classList.add("completed-btn");
	toDoDiv.appendChild(completedButton);
	// CHECK AN ITEM
	completedButton.addEventListener("click", () => {
		completedButton.parentElement.classList.toggle("completed");
	});
	
	// BUTTON TO DELETE AN ITEM
	let trashButton = document.createElement("button");
	trashButton.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>';
	trashButton.classList.add("trash-btn");
	toDoDiv.appendChild(trashButton);
	// DELETE AN ITEM
	trashButton.addEventListener("click", () => {
		trashButton.parentElement.classList.add("removed");
		trashButton.parentElement.addEventListener("transitionend", () => {
			trashButton.parentElement.remove();
		})
	});
	
	// DISPLAY NEW ITEM
	toDoList.appendChild(toDoDiv);
		
	// CLEAR THE INPUT VALUE
	toDoInput.value = "";	
}}


// ADD AN ITEM TO THE TO DO LIST
function addToDo (e) {
	e.preventDefault();
	createNewToDo();
}


// SAVE THE TO DO LIST
function saveList (toDo) {
	let toDos;
	if(localStorage.getItem("toDos") === null) {
		toDos = [];
	} else {
		toDos = JSON.parse(localStorage.getItem("toDos"))
	}
	toDos.push(toDo);
	localStorage.setItem("toDos", JSON.stringify(toDos));
}


// GET SAVED ITEMS
function getList () {
	let toDos;
	if(localStorage.getItem("toDos") === null) {
		toDos = [];
	} else {
		toDos = JSON.parse(localStorage.getItem("toDos"))
	}
	toDos.forEach(toDo => {
		let toDoDiv = document.createElement("div");
		toDoDiv.classList.add("todo");

		// TEXT IN THE NEW ITEM
		let newToDo = document.createElement("li");
		newToDo.innerText = toDo;
		newToDo.classList.add("todo-item");
		toDoDiv.appendChild(newToDo);

		// BUTTON TO MARK THE ITEM AS COMPLETED
		let completedButton = document.createElement("button");
		completedButton.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i>';
		completedButton.classList.add("completed-btn");
		toDoDiv.appendChild(completedButton);
		// CHECK AN ITEM
		completedButton.addEventListener("click", () => {
			completedButton.parentElement.classList.toggle("completed");
		});

		// BUTTON TO DELETE AN ITEM
		let trashButton = document.createElement("button");
		trashButton.innerHTML = '<i class="fas fa-trash" aria-hidden="true"></i>';
		trashButton.classList.add("trash-btn");
		toDoDiv.appendChild(trashButton);
		// DELETE AN ITEM
		trashButton.addEventListener("click", () => {
			trashButton.parentElement.classList.add("removed");
			trashButton.parentElement.addEventListener("transitionend", () => {
				trashButton.parentElement.remove();
				toDos.splice(toDos.indexOf(toDo), 1);
				localStorage.setItem("toDos", JSON.stringify(toDos));
			})
		});

		// DISPLAY NEW ITEM
		toDoList.appendChild(toDoDiv);
	})
}