



    var mymap = L.map('mapid').setView([-34.896153586856826, -56.169921951022246], 13);
    
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=4PxZstjsc8r0QupGuz5o', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(mymap);

        L.marker([-34.896153586856826, -56.169921951022246]).addTo(mymap);





//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById("caritaFelizMap").addEventListener("click",()=>{
        let element = document.getElementById('caritaFelizMap');
        element.classList.add('animate__animated');
        element.classList.add('animate__shakeY');
    });
    
});


