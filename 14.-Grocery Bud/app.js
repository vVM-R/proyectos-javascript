// ****** SELECT ITEMS **********
const alert= document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", addItem);
//boton de limpiar
clearBtn.addEventListener('click', clearItems);
//Cargar items
window.addEventListener('DOMContentLoaded', setupItems);



// ****** FUNCTIONS **********
function addItem(e){
	e.preventDefault();
	const value = grocery.value;

	const id= new Date().getTime().toString();

	if(value && !editFlag){

    createListItem(id, value);

    //muestro alerta
    displayAlert('articulo agregado a la lista', 'success');
    //Mostrar container
    container.classList.add('show-container');
    //Agregar al almacenamiento local
    addToLocalStorage(id,value);
    //Regresar valores a default
    setBackToDefault();

	}else if(value && editFlag){
		editElement	.innerHTML = value;
		displayAlert('el valor a cambiado', 'success' );
		//editando almacenamiento local
		editLocalStorage(editID, value);
		setBackToDefault();
	}else{
		displayAlert('por favor ingrese un articulo', 'danger');
	}

}
//Mostrar Alerta
function displayAlert(text, action){
	alert.textContent = text;
	alert.classList.add(`alert-${action}`);

//quitar alerta
setTimeout(function(){
	alert.textContent = "";
	alert.classList.remove(`alert-${action}`);
},1000);
}
//Limpar articulos
function clearItems(){
	const items = document.querySelectorAll('.grocery-item');

	if(items.length > 0){
		items.forEach(function(item){
			list.removeChild(item);
		});
	}
	container.classList.remove('show-container');
	displayAlert('Lista Vacia', 'danger');
	setBackToDefault();
	localStorage.removeItem('list');
}
//Funcion de editar
function editItem(e){
	const element = e.currentTarget.parentElement.parentElement;
	//editar articulo
	editElement = e.currentTarget.parentElement.previousElementSibling;
	//darle al formulario el nombre del articulo
	grocery.value = editElement.innerHTML;
	editFlag = true;
	editID = element.dataset.id;
	submitBtn.textContent = "editar";
}
//Funcion de eliminar
function deleteItem(e){
	const element = e.currentTarget.parentElement.parentElement;
	const id = element.dataset.id;
	list.removeChild(element);
	if(list.children.length === 0){
		container.classList.remove('show-container');
	}
	displayAlert('articulo removido', 'danger');
	setBackToDefault();
	//Quitar del almacenamiento local
	removeFromLocalStorage(id);
}

//Regresar valores a default
function setBackToDefault(){
	grocery.value = '';
	editFlag = false;
	editID = '';
	submitBtn.textContent = 'agregar';
}



// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value){
	const grocery = {id: id, value: value};
	let items = getLocalStorage();
	//console.log(items);

	items.push(grocery);
	localStorage.setItem('list', JSON.stringify(items));
	
}

function removeFromLocalStorage(id){
	let items = getLocalStorage();

	items = items.filter(function(item){
		if(item.id !== id){
			return item;
		}
	});
	localStorage.setItem('list',JSON.stringify(items));
}
function editLocalStorage(id, value){
	let items = getLocalStorage();
	items = items.filter(function(item){
		if(item.id === id){
			item.value = value;
		}
		return item;
	});
	localStorage.setItem('list',JSON.stringify(items));
}

function getLocalStorage(){
	return localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')): [];
}
// ****** SETUP ITEMS **********
function setupItems(){
	let items = getLocalStorage();
	if(items.length > 0){
		items.forEach(function(item){
			createListItem(item.id,item.value);
		});
		container.classList.add('show-container');
	}
}

function createListItem(id, value){
		//creamos un nuevo elemento del tipo article
		const element = document.createElement('article');
		//agregar class
		element.classList.add('grocery-item');
		//agregar id
		const attr = document.createAttribute('data-id');
		attr.value = id;
		element.setAttributeNode(attr);
		element.innerHTML = `<p class="title">${value}</p>
            <div class="btn-container">
              <buttom class="edit-btn">
                <i class="fas fa-edit"></i>
              </buttom>
              <buttom class="delete-btn">
                <i class="fas fa-trash"></i>
              </buttom>
            </div>`;
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);
    //append child
    list.appendChild(element);
}