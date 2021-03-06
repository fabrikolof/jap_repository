var currentProductInfoArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
const ORDER_BY_COSTO_MAX = "MAX";
const ORDER_BY_COSTO_MIN = "MIN";
const ORDER_BY_RELEVANCIA = "Cant.";
let query = undefined;

function sortCategories(criteria, array) {
    let result = [];
    if (criteria === ORDER_BY_COSTO_MIN) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_COSTO_MAX) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_RELEVANCIA) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showCategoriesList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductInfoArray.length; i++) {
        let category = currentProductInfoArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {
            if (query == undefined ||
                category.name.toLowerCase().indexOf(query) != -1 ||
                category.description.toLowerCase().indexOf(query) != -1) {



                htmlContentToAppend += `

        <div class="col-md-4 col-lg-3">
            <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                <img src="${category.imgSrc}" class="card-img-top" alt="${category.description}">
                <div class="card-body">
                    <h3 class="mb-3">${category.name}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">${category.cost} ${category.currency}</h6>
                            <p class="card-text">
                                ${category.description}
                             </p>
                </div>
            </a>
        </div>

        
            `

            }
        }

        document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;

    }
}
function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentProductInfoArray = categoriesArray;
    }

    currentProductInfoArray = sortCategories(currentSortCriteria, currentProductInfoArray);

    //Muestro las categor??as ordenadas
    showCategoriesList();
}

function lupaSearch(){
    //focus a la barra de busqueda
    document.getElementById("searcherPro").focus();
}

//Funci??n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.    
document.addEventListener("DOMContentLoaded", function (e) {

    query = document.getElementById("searcherPro").value.toLowerCase();


    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductInfoArray = resultObj.data;
            showCategoriesList();
        }
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        
        query = "";
        document.getElementById("searcherPro").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("precioMin").addEventListener("click", function () {
        //M??nimo
        sortAndShowCategories(ORDER_BY_COSTO_MIN);
    });
    document.getElementById("precioMax").addEventListener("click", function () {
        //M??ximo
        sortAndShowCategories(ORDER_BY_COSTO_MAX);
    });
    document.getElementById("relevancia").addEventListener("click", function () {
        //Relevancia
        sortAndShowCategories(ORDER_BY_RELEVANCIA);
    });


    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el m??nimo y m??ximo 
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showCategoriesList();
    });

    document.getElementById("searcherPro").addEventListener("input", function (e) {
        //buscador
        query = document.getElementById("searcherPro").value.toLowerCase();
        showCategoriesList();
    });
    
    
});

