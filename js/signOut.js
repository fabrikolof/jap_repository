
function cerrarSesion() {

    localStorage.clear();
    console.log('User signed out.');
    window.location.assign("login.html");
  
}

