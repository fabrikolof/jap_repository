document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("cerrarSesion").addEventListener("click", function (e) {
  
      localStorage.removeItem("User");
      window.location = "login.html";
  
    });
  
  });
