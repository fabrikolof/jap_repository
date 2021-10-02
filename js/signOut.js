document.addEventListener("DOMContentLoaded", function (e) {
    onLoad()

});

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        location.href = "index.html";
    });
}

function onLoad() {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
}

function cerrarSesione() {

    if(gapi == undefined){
        signOut();
    }
    
    
    localStorage.clear();
    window.location = "login.html";
}


