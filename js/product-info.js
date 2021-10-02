let currentCategoriesArray = {};
let productArray = [];
let commentariostArray = {};

function showImagenes(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        if (i === 0) {
            htmlContentToAppend += `
            <div class="carousel-item active">
                    <h5><strong>${currentProductInfoArray.name}</strong></h5>
                    <img class="d-block w-100" src="${imageSrc}" alt="First slide">
                    <p><strong>${currentProductInfoArray.currency} $${currentProductInfoArray.cost}</strong></p>
                    </div>
        `
            continue;
        }

        htmlContentToAppend += `
        <div class="carousel-item">
                <h5><strong>${currentProductInfoArray.name}</strong></h5>
                <img class="d-block w-100" src="${imageSrc}" alt="First slide">
                  <p><strong>${currentProductInfoArray.currency} $${currentProductInfoArray.cost}</strong></p>
                </div>
    `
        document.getElementById("imagenesProductInfo").innerHTML = htmlContentToAppend;
    }
}

function produRelacionados(array){
    
    let htmlContentToAppend = "";

    for(let valor of array){

      let relatedProductsIndex = productArray[valor];
      
      htmlContentToAppend += `
      <div class="card" style="width: 18rem;">
      <img class="card-img-top" src="${relatedProductsIndex.imgSrc}" alt="${relatedProductsIndex.name}">
      <div class="card-body">
        <h5 class="card-title">${relatedProductsIndex.name}</h5>
        <p class="card-text">${relatedProductsIndex.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">${relatedProductsIndex.currency} $${relatedProductsIndex.cost} </li>
        <li class="list-group-item">Vendidos: ${relatedProductsIndex.soldCount}</li>
      </ul>
      <div class="card-body">
        <a href="#" class="card-link">Ver Producto</a>
      </div>
    </div>
		`;

    }

    document.getElementById("productRelated").innerHTML = htmlContentToAppend;
}

function desplegarComentarios(array){

    let htmlContentToAppend = "";

    for (let lugar of array){
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3 d-flex align-items-center">
                <img src='./img/user-avatar.png' class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <div class="mb-1">
                        <h6 class="font-weight-bold margin-score">${lugar.user} ${showScore(lugar.score)}</h6>
                        <p>${lugar.description}</p>
                    </div>
                    <small class="text-muted">${lugar.dateTime}</small>
                </div>
            </div>
        </div>
    </div>
        `
        document.getElementById("comentarios").innerHTML = htmlContentToAppend;
    }
}

function showScore(score) {
	let stars = "";

	for (var i = 0; i < score; i++) {
		stars += `
			<span class="star-fill">★</span>
		`;
	}

	for (var j = score; j < 5; j++) {
		stars += `
			<span class="star">★</span>
		`;
	}

	return stars;
}

function formatDate() {
	let date = new Date();

	if ((date.getMonth() + 1) < 10) {
		var month = "0" + (date.getMonth() + 1);
	} else {
        var month = (date.getMonth() + 1);
    };
	if (date.getDate() < 32) {
		var day = "" + date.getDate();
	};
	var fullDate = date.getFullYear() + '-' + month + '-' + day;
	var hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
	var fullDateAndHour = fullDate + ' ' + hour;

	return fullDateAndHour;
}


function enviarComentario(){
    let descripInput = document.getElementById("comnent").value; //comentario
    let userName = JSON.parse(localStorage.User); //userName.usuario
    let scoreValue = document.getElementsByName("scores");
    let newCommentData = {
        "description": descripInput,
        "user": userName.usuario,
        "dateTime": formatDate()
    };
    
    for (let value of scoreValue) {
        if (value.checked) {
            newCommentData.score = value.value;
		}
    }
    //guardo el nuevo comentario y luego despliego la nueva lista
    document.getElementById("comnent").value = "";
    commentariostArray.push(newCommentData);
    desplegarComentarios(commentariostArray);
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfoArray = resultObj.data;

            let proInfoDescriptionHTML = document.getElementById("proInfoDescription");
            let productCategoryHTML = document.getElementById("productCategory");
            let productVendidosHTML = document.getElementById("productVendidos");

            proInfoDescriptionHTML.innerHTML = currentProductInfoArray.description;
            productCategoryHTML.innerHTML = currentProductInfoArray.category;
            productVendidosHTML.innerHTML = currentProductInfoArray.soldCount;
        }
        //muestro imagenes
        showImagenes(currentProductInfoArray.images);

        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                productArray = resultObj.data;
            }
            //muestro relacionados
            produRelacionados(currentProductInfoArray.relatedProducts);
        });
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            commentariostArray = resultObj.data;
            //muestro comentarios
            desplegarComentarios(commentariostArray);
        }
    });

});

