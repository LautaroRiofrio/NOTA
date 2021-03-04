const carga = document.getElementById("carga");
const logo = document.getElementById("logo");
const name = document.getElementById("name");
const developer = document.getElementById("developer");


const principal = document.getElementById("principal");
const readContainer = document.getElementById("read");
	const read = document.querySelector(".read");
const writeContainer = document.getElementById("write");
const plusDoc = document.querySelector("#plus");


const titleDoc = document.getElementById("title");
const contentDoc = document.getElementById("content");


plusDoc.addEventListener("click",function(){
	writeContainer.style.marginTop = "0px"

});


const editDoc = document.querySelector(".edit");
	editDoc.addEventListener("click",function(){edit()});


const delete_btn = document.querySelector(".delete");
	delete_btn.addEventListener("click",function(){sure()});


var hour;
var minute;

var dayNumber;
var month;
var year;



var actualNote = null;

var title = [];
var content = [];
var notes = [];
var generalDate = [];
var generalHour = [];


// esta funcion abre la pestaña para editar y le da los valores a los textarea


function edit(){
	var titulo = document.querySelector(".read p").innerText;
	var contenido = document.querySelector(".read textarea").value;
	writeContainer.style.marginTop = "0px"

	titleDoc.value = `${titulo}`;
	contentDoc.value = `${contenido}`;
}







// abrir ventana de "read"

function openNote(){
	readContainer.style.marginTop = "0px";
}



//  mostrar el titulo y el contenido en "read".



function noteContent(nota){
	read.innerHTML = 
	`
	<p><b>${title[nota]}<b/></p><br>
	<textarea class="content" readonly="readonly">${content[nota]}</textarea>
	`;
}


// efecto del click en la pre view de la nota

function clic(num){
	actualNote = num;
	var nota = document.getElementById(`note${num}`);
	nota.style.background = "#7f8c8d";
	setTimeout(function() {
		nota.style.background = "#fff";
	}, 200);
}











//  funcion para regresar, detecta si se encuentra en read o write.



function back(row){
	if (row == 0) {
		windowDoc.style.display = "none";

		readContainer.style.marginTop = "100vh";
		writeContainer.style.marginTop = "100vh";

		read.innerHTML = "";
		titleDoc.value = "";
		contentDoc.value = "";

		actualNote = null;
	} else if (row == 1) {
		noteType();
	} else if (row == 2) {
		if (titleDoc.value.length > 0 || contentDoc.value.length > 0) {
			backWindow();
		} else {
			back(0);
		}
	}
}










// al momento de guardar, esta funcion detecta si lo que se guarda es edit o new




function noteType(){
	if (actualNote == null) {
		newNote();
	} else {
		saveData();
	}
}



// guarda lo que se edita 


function saveData(){
	//  en caso de que los parametros sean > 0 ,  se guardara el edit sin problema


	if (contentDoc.value.length > 0 && titleDoc.value.length > 0) {

		title[actualNote] = titleDoc.value;
		content[actualNote] = contentDoc.value;

		principal.innerHTML = "";

		read.innerHTML = 
		`
		<p><b>${title[actualNote]}<b/></p><br>
		<textarea class="content">${content[actualNote]}</textarea>
		`;

		writeContainer.style.marginTop = "100vh";
	} else {


		//  en caso de que un parametro sea igual a 0, esto te avisara cual es, ademas de que no se guardara el edit.


		if (contentDoc.value.length == 0 && titleDoc.value.length > 0) {
			contentDoc.style.boxShadow = "0px 0px 5px #b22"
		} else if (contentDoc.value.length > 0 && titleDoc.value.length == 0) {
			titleDoc.style.boxShadow = "0px 0px 5px #b22"
		} else {
			contentDoc.style.boxShadow = "0px 0px 5px #b22"
 			titleDoc.style.boxShadow = "0px 0px 5px #b22"
		}
		setTimeout(function() {
 				contentDoc.style.boxShadow = "none"
 				titleDoc.style.boxShadow = "none"
 		}, 500);
	}


	generar();
	saveNotes()
}



//  guarda las nuevas notas


function newNote(){
	//  en caso de que los parametros sean > 0, la nota se guardara sin problemas 

	if (contentDoc.value.length > 0 && titleDoc.value.length > 0) {

		hour = new Date().getHours();
		minute = new Date().getMinutes();

		dayNumber = new Date().getDate();
		month = new Date().getMonth();
		year = new Date().getFullYear();

		content.push(contentDoc.value);	
		title.push(titleDoc.value);	
		generalDate.push(`${dayNumber}/${month + 1}/${year}`);
		generalHour.push(`${hour}:${minute}`)

		contentDoc.value = "";
		titleDoc.value = "";

		writeContainer.style.marginTop = "100vh";

	} else {

		//  en caso de que los parametros sean iguales a 0, esto te avisara cual es, ademas no se guardara la nota


		if (contentDoc.value.length == 0 && titleDoc.value.length > 0) {
			contentDoc.style.boxShadow = "0px 0px 5px #b22"
		} else if (contentDoc.value.length > 0 && titleDoc.value.length == 0) {
			titleDoc.style.boxShadow = "0px 0px 5px #b22"
		} else {
			contentDoc.style.boxShadow = "0px 0px 5px #b22"
 			titleDoc.style.boxShadow = "0px 0px 5px #b22"
		}
		setTimeout(function() {
 				contentDoc.style.boxShadow = "none"
 				titleDoc.style.boxShadow = "none"
 		}, 500);
	}


	saveNotes()




	generar();
}






// Esta funcion es para volver del edit o write, pero antes te pregunta si deseas o no guardar.





const windowDoc = document.getElementById("window");

function backWindow(){
	windowDoc.style.display = "block";
	if (actualNote == null) {
		windowDoc.innerHTML = 
		`
		<p class="query">¿Guardar nota?</p>
		<button class="allow btn" onclick="newNote(), windowNone()">SI</button>
		<button class="deny btn" onclick="back(0), windowNone()" >NO</button>
		`
	} else {
		if (contentDoc.value != content[actualNote] || titleDoc.value != title[actualNote]) {

			windowDoc.innerHTML = 
			`
			<p class="query">¿Guardar cambios?</p>
			<button class="allow btn" onclick="saveData(), windowNone()" >SI</button>
			<button class="deny btn" onclick="back(0), windowNone()" >NO</button>
			`
		} else {
			back(0)
		}
	}
}



function windowNone(){
	windowDoc.style.display = "none";
}





// ------------------------------- //
 		// ELIMINAR //


//	 funcion "splice()".
//	 esta funcion lo que hace es eliminar el elemento de un array, para eso necesita dos parametros.
//	 El primero es la posicion del elemento.
//	 Y el segundo es el numero de elementos totales del array. para este caso funciona el length





function sure(){
	windowDoc.style.display = "block";
	windowDoc.innerHTML = 
	`
		<p class="query">¿Desea eliminar?</p>
		<button class="allow btn" onclick="delet(${actualNote}), windowNone()" >SI</button>
		<button class="deny btn" onclick=" windowNone()" >NO</button>
	`
}




 function delet(noteNumber){
 	var total = content.length;

 	content.splice(noteNumber,1);
 	title.splice(noteNumber,1);
 	generalDate.splice(noteNumber,1);
 	generalHour.splice(noteNumber,1);

 	saveNotes()
 	generar();

 	actualNote = null;
 	readContainer.style.marginTop = "100vh";
 }



// ------------------------------- //





// genera la ventana principal





function generar(){
	var contentCopy = content;
	var titleCopy = title;


	principal.innerHTML = "";
	notes = [];
	for(let i = 0; i < contentCopy.length;i++){
		notes.push(
		`
		<div class="nota" id="note${i}" onclick="clic(${i}), openNote(${i}), noteContent(${i})" >
			<div class="info-pre-view">
				<div id="general-date-pre-view"><b>${generalDate[i]}</b></div>
				<div id="date-pre-view">${generalHour[i]}</div>
			</div>
 			<div class="pre-view">
 				<div class="title-pre-view"><b>${titleCopy[i]}</b></div>
 				<textarea class="content-pre-view" readonly="readonly">${contentCopy[i]}</textarea>
 			</div>
 			</div>
		`);
	}
	notes.reverse();
	for(let i = 0; i < content.length;i++){
		principal.innerHTML += notes[i]
	}
}







// al iniciar la pagina esta funcion extrae los datos de las notas


function saveNotes(){
	localStorage.setItem("content",JSON.stringify(content));
	localStorage.setItem("title",JSON.stringify(title));
	localStorage.setItem("generalDate",JSON.stringify(generalDate));
	localStorage.setItem("generalHour",JSON.stringify(generalHour));
}


function getData(){
	if (localStorage.getItem("content") && localStorage.getItem("title")) {
		content = JSON.parse(localStorage.getItem("content"));
		title = JSON.parse(localStorage.getItem("title"));
		generalDate = JSON.parse(localStorage.getItem("generalDate"));
		generalHour = JSON.parse(localStorage.getItem("generalHour"));
	} else {
		localStorage.setItem("content",JSON.stringify(content));
		localStorage.setItem("title",JSON.stringify(title));
		localStorage.setItem("generalDate",JSON.stringify(generalDate));
		localStorage.setItem("generalHour",JSON.stringify(generalHour));
	}
}














window.onload = () => {
	getData();
	generar();

	logo.style.transitionDuration = ".5s";
	name.style.transitionDuration = ".5s";
	developer.style.transitionDuration = ".5s";
	logo.style.opacity = "1";
	name.style.opacity = "1";
	developer.style.opacity = "1";

	setTimeout(function() {
		carga.style.opacity = "0";
		carga.style.background = "rgba(255,255,255,0)";
	}, 1000);
	setTimeout(function() {
		carga.style.display = "none";	
	}, 1600);

}



































