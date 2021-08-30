document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("cerrarSesion").addEventListener("click", function (e) {
        signOut();
        salir();
        window.location = "index.html";
    });

    

});

function salir(){
    localStorage.clear();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        location.href = "index.html";
    });
}

