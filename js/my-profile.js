let perfil = {};
let avatars;
//let perfilData = JSON.parse(sessionStorage.Perfil);

function previewFile() {
  let preview = document.querySelector("img");
  let file = document.querySelector("input[type=file]").files[0];
  let reader = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
    //document.getElementById("profileImageLoad").innerHTML = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function guardarPerfil() {
    let nombreDOM = document.getElementById("profileFirstName");
    let apellidoDOM = document.getElementById("profileFirstLastName");
    let edadDOM = document.getElementById("profileDayOfBirth");
    let emailDOM = document.getElementById("profileEmail");
    let telDOM = document.getElementById("profileNumber");
    let imgDOM = document.getElementById("profileImage");

    perfil.nombre = nombreDOM.value;
    perfil.apellido = apellidoDOM.value;
    perfil.edad = edadDOM.value;
    perfil.email = emailDOM.value;
    perfil.telefono = telDOM.value;
    perfil.imagen = imgDOM.src;

    localStorage.setItem(
		"Perfil",
		JSON.stringify(perfil)
	);
    
    swal("Se ha guardado con éxito", "Perfecto!", "success");

     mostrarPerfil();
 
 }

//  function getAvatars(){

//   let avatars = fetch("./img/avatars/avatars.JSON").then(res => res.json()).then(data => data);
 
//   console.log(avatars);
//   console.log('hola');
  
//  }

 async function getAvatars() {
  const response = await fetch('./img/avatars/avatars.JSON');
  avatars = await response.json();
  console.log(avatars);
  console.log('hola');
}


function mostrarPerfil() {
    let mostrarNombre = document.getElementById("profileNameDOM");
    let mostrarEdad = document.getElementById("profileDayOfBirthDOM");
    let mostrarEmail = document.getElementById("profileEmailDOM");
    let mostrarTel = document.getElementById("profileNumberDOM");
    let mostrarImg = document.getElementById("profileImage");

    let perfil = JSON.parse(localStorage.getItem("Perfil"));  

    mostrarNombre.innerHTML = perfil.nombre + " " + perfil.apellido;
    mostrarEdad.innerHTML = perfil.edad;
    mostrarEmail.innerHTML = perfil.email;
    mostrarTel.innerHTML = perfil.telefono;
    mostrarImg.src = perfil.imagen;
}


getAvatars();
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", () => {
    mostrarPerfil();
    
});
