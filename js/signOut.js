
function cerrarSesion() {

    localStorage.clear();
    window.location.assign("login.html");
  
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      window.location.assign("login.html");
    });
  }
