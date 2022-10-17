// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navToggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToggle.addEventListener('click', function(){
	//Verificamos si la variable links contiene la clase
	//show-links
	/*if(links.classList.contains("show-links")){
		//si la contiene se la eliminamos
		links.classList.remove("show-links");
	}else{
		//de caso contrario se la agregamos
		links.classList.add("show-links");
	}*/

	//Esta funcion lo que hace es agregar y remover la case dada
	links.classList.toggle("show-links");
});
