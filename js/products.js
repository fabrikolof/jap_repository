var currentCategoriesArray = [];
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
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))) {
            if (query == undefined ||
                category.name.toLowerCase().indexOf(query) != -1 ||
                category.description.toLowerCase().indexOf(query) != -1) {



                htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <small class="text-muted">` + "Vendidos: " + category.soldCount + `</small>
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + `</h4>
                            <small class="text-muted">` + category.cost + " " + category.currency + `</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
            }
        }

        document.getElementById("pro-list-container").innerHTML = htmlContentToAppend;

    }
}
function sortAndShowCategories(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.    
document.addEventListener("DOMContentLoaded", function (e) {
    
    query = document.getElementById("searcherPro").value.toLowerCase();


    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentCategoriesArray = resultObj.data;
            showCategoriesList();
        }
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("precioMin").addEventListener("click", function () {
        //Mínimo
        sortAndShowCategories(ORDER_BY_COSTO_MIN);
    });
    document.getElementById("precioMax").addEventListener("click", function () {
        //Máximo
        sortAndShowCategories(ORDER_BY_COSTO_MAX);
    });
    document.getElementById("relevancia").addEventListener("click", function () {
        //Relevancia
        sortAndShowCategories(ORDER_BY_RELEVANCIA);
    });


    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
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
        query = document.getElementById("searcherPro").value.toLowerCase();
        showCategoriesList();
      })

});

