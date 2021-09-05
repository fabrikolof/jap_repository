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
            
        }

        
    });



});