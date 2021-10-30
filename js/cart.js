let carritoData = [];

let PERCENTAGE_SYMBOL = '%';
let MONEY_SYMBOL = "UYU$";
let DOLLAR_SYMBOL = "USD$";
let PESO_SYMBOL = "UYU$";

let subTotalCost = 0;
let totalCost = 0;
let shippingPercentage = 1.15;
let shippingPorcentageValue = 15;
let currency = false;

function mostrarCarrito(array) {

	let htmlContentToAppend = "";
	let productosHTML = document.getElementById("productos");
	let index = 0;

	 if (carritoData.length == 0) {
	 	productosHTML.innerHTML = htmlContentToAppend;
	 }


	for (let producto of array) {

		htmlContentToAppend += `
		<ul class="list-group-item list-group-item-action">
			<div class="row d-flex justify-content-around">
				<div class="col-2 d-flex align-items-center justify-content-center">
					<img src="${producto.src}" class="img-thumbnail">
				</div>
				<div class="col-2 d-flex align-items-center justify-content-start">
					<div class="d-flex align-items-center">
						<h6 class="text-muted">${producto.name}</h6>
					</div>
				</div>
				<div class="col-2 d-flex align-items-center">
					<div class="d-flex w-100 justify-content-end align-items-center">
						<h6 class="text-muted">${producto.currency}<span id="newCostDOM-${index}" class="costDOM">${producto.unitCost}</span></h6>
					</div>
				</div>
				<div class="col-2 d-flex align-items-center justify-content-center">
					<div class="w-75 d-flex justify-content-center align-items-center">
              			<input type="number" class="form-control" id="articleCount-${index}"value="${producto.count}" min="0" onchange="updateValues();">
					</div>
				</div>
				<div class="col-2 d-flex align-items-center justify-content-center">
					<div class="d-flex justify-content-center align-items-center">
              			<span onclick="deleteArticle(${index});">❌</span>
					</div>
				</div>
			</div>
		</ul>
		`;

		productosHTML.innerHTML = htmlContentToAppend;
		index++;
	};
	 updateValues();
}


function deleteArticle(index) {
	carritoData.splice(index, 1);
	mostrarCarrito(carritoData);
	updateValues();
}


function updateValues() {

	let precioDOM = document.getElementsByClassName("costDOM");
	let countDOM = document.getElementsByTagName("Input");
	let subtotal = 0;
	let precio = 0;
	let cantidadValueInput = 0;

	for (let i = 0; i < precioDOM.length; i++){

		if (carritoData[i].currency == "USD") {
		precio = 40 * (parseFloat(precioDOM[i].innerHTML) * parseFloat(countDOM[i].value)) ;
		} else {
			precio = parseFloat(precioDOM[i].innerHTML) * parseFloat(countDOM[i].value);
		}

		subtotal += precio;
		cantidadValueInput += parseFloat(countDOM[i].value);
	}

	 if (currency) {
	 	subtotal = subtotal / 40;
	 }

	document.getElementById("subTotalDOM").innerHTML = `Subtotal ${MONEY_SYMBOL} ${subtotal}`;
	document.getElementById("cartCountDOM").innerHTML = `${cantidadValueInput} items`;
	document.getElementById("cartCountDOM2").innerHTML = `ITEMS ${cantidadValueInput}`;
	document.getElementById("totalCostDOM").innerHTML = `${MONEY_SYMBOL} ${Math.round(subtotal * shippingPercentage)}`;   

}

function costoEnvio () {
	
	let valor = document.getElementById("selectorEnvio").value;

	if (valor == 1) {
		shippingPercentage = 1.15;
		shippingPorcentageValue = 15;
		updateValues();
	} else if (valor == 2) {
		shippingPercentage = 1.07;
		shippingPorcentageValue = 7;
		updateValues();
	} else if (valor == 3) {
		shippingPercentage = 1.05;
		shippingPorcentageValue = 5;
		updateValues();
	}

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

	getJSONData(CART_INFO_URL).then(function (resultObj) {
		if (resultObj.status === "ok") {

			let data2 = resultObj.data;
			carritoData = data2.articles;

			mostrarCarrito(carritoData);
			updateValues();
			
		}
	});
	
	
	document.getElementById("pesoCurrency").addEventListener("change", () => {
		currency = false;
		MONEY_SYMBOL = PESO_SYMBOL;
	 	updateValues();
	});
	document.getElementById("dollarCurrency").addEventListener("change", () => {
		currency = true;
		MONEY_SYMBOL = DOLLAR_SYMBOL;
	 	updateValues();
	});

	
});