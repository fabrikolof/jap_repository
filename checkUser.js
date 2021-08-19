document.addEventListener("DOMContentLoaded", function (e) {
    checkUser();

    function checkUser() {
        if (localStorage.length === 0) {
            window.location = "login.html";
        }
    }
});