
function cerrarSesion(){
    localStorage.removeItem("User");
    window.location.assign("login.html");
  }