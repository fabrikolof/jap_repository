document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("cerrarSesion").addEventListener("click", function (e) {
        salir();
        signOut();
    });

    

});

function salir(){
    localStorage.clear();
    window.location = "index.html";
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        location.href = "index.html";
    });
}

