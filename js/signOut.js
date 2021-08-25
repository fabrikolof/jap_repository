onLoad()

function cerrarSesion() {

    localStorage.clear();
    console.log('User signed out.');
    window.location.assign("login.html");
  
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        location.href = "index.html";
    });
    localStorage.clear();
    window.location = "index.html";
}

function onLoad() {
    gapi.load("auth2", function () {
        gapi.auth2.init();
    });
/*
    let bienvenidaDOM = document.getElementById("bienvenidaDOM");
    let articlesOnCart = document.getElementById("articlesOnCart");
    // let articlesOnCartLocalStorage = JSON.parse(localStorage.cantArt);
    let userName = JSON.parse(localStorage.User);
    let avatar = document.getElementById("avatar");

    bienvenidaDOM.innerHTML = `<strong>${userName.email}</strong>`;
    avatar.style.backgroundImage = `url('${userName.avatar}')`;
    // articlesOnCart.innerHTML = articlesOnCartLocalStorage;
    */
}