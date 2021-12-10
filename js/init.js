
const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
let suertuda = {};

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}


// Realiza descuentos al usuario
function alertaSuertuda(){
  let contador = 0;
  let descuento;
  let datos;
  let codigo = makeid(5);


  if(JSON.parse(sessionStorage.getItem("Suerte")) != null){
    datos = JSON.parse(sessionStorage.getItem("Suerte"));
    contador = datos.contador;
    descuento = datos.descuento;
  }
  
  // Máximo son 3 intentos
  if (contador < 3) {
  contador++;
  descuento = Math.round(Math.random() * 100);
  swal("Vas a tener Suerte! Intento " + contador + " de 3",

   "Descuento de " +
    descuento +
    '% para tí!'+
    "\n Código de descuento: " +
     codigo,

     "success");

     
    } else {
      contador++;
      swal("Vas a tener Suerte! Intento " + contador + " de 3",

      "Descuento de " +
       descuento +
       '% para tí no cambiará.'+
       "\n Código de descuento definitivo: " +
       'codigo',
   
        "success");
    }

    //Guardo los datos en el sessionStorage
    suertuda.contador = contador;
    suertuda.descuento = descuento;

    sessionStorage.setItem(
      "Suerte",
      JSON.stringify(suertuda)
    );


}

// Genera el código random para que el usuario use el descuento
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
 }
 return result;
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
});




