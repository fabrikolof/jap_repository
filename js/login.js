//window.location.assign("login.html"); 
//window.location = "index.html";


/*
1- El usuario ingresa los datos en el loggin/registro
2- Almacenas esos datos en el localstorage
3- Lo redirigis al home
El temaa es que vas a necesitar una funcion de "loggout"

Vas a necesitar una funcion global que chequee en cualquier parte de la web,
si existe un usuario registrado en el localhost
despues estaa funcion, va a chequear ademas lo de google a futuro

en un archivo js que lo carguen todas las paginas
creo que es el init el que comparten

*/ 




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    buttonDOM.addEventListener("click", (e) => {

        let inputUserDOM = document.getElementById("inputUserDOM");
        let inputPasswordDOM = document.getElementById("inputPasswordDOM");
        let validacion = true;


        if (inputUserDOM.value.trim() === "" && inputPasswordDOM.value.trim() === "") {
            validacion = false;
            alert("⛔ Favor de ingresar un nombre de usuario y contraseña ⛔");
        } else if (inputUserDOM.value.trim() === "") {
            validacion = false;
            alert("⛔ Favor de ingresar un nombre de usuario ⛔");
        } else if (inputPasswordDOM.value.trim() === "") {
            validacion = false;
            alert("⛔ Favor de ingresar una contraseña ⛔");
        }



        if (validacion) {
            
            localStorage.setItem(
                "User",
                JSON.stringify({ usuario: inputUserDOM.value })
            );
            console.log({ localStorage });
            
            window.location = "index.html";
        }

        
    });



});