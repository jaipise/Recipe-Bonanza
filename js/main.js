// API link: https://developer.edamam.com/edamam-recipe-api
// Recipe Search API: https://developer.edamam.com/admin/applications/1409622019501?service_id=2555417725632 


// DOM elements:
const searchForm = document.querySelector('form');
const searchResultDiv = document.querySelector('.show-result');
const container = document.querySelector('.container');
const belowSearchBar = document.getElementById('below-search-bar');

// create spinner
let spinner = document.createElement("div");
spinner.setAttribute('class', 'spinner-border');  
spinner.setAttribute('style', 'width: 7rem; height: 7rem;');  

let newResults = [];

// API constants unique to me:
const API_ID = '48773b04';
const API_KEY = '0f4fe081493f4775edc3bf8e47760b85';

// describe how the UI will look
const NUM_RESULTS = 18;
const NUM_PER_ROW = 3;

function submitSearchForm(){
    searchForm.addEventListener('submit', (e) => {
        // stop form from auto-reloading page when submitted
        e.preventDefault();
    
        // check what is inputted in the search bar
        let searchQuery = e.target.querySelector('input').value;

        // input validation
        try {
            if(searchQuery == "") {
                throw 'Please type something in the search bar';
            } 
            else {
                while (belowSearchBar.firstChild) {
                    belowSearchBar.removeChild(belowSearchBar.lastChild);
                }
                fetchAPI(searchQuery);
                addSpinner();
            }
        } catch (error) {
            swal('Error!',error,'warning');
        }
    })   
}


// API call using an asynchronous JS function
async function fetchAPI(recipe) {    
    // Dynamic JS string for url
    const baseURL = `https://api.edamam.com/api/recipes/v2/?q=${recipe}&app_id=${API_ID}&app_key=${API_KEY}&type=public`;

    // get response from the API
    const response = await fetch(baseURL);
    // convert the response data to the JSON format
    const data = await response.json();

    // retrieve only the number of results desired
    let dataArr = data.hits.splice(0, NUM_RESULTS);    

    try {
        if(dataArr.length == 0 && recipe != "") {
            throw "This recipe is not available";            
        } else {
            generateHTML(dataArr);
        }
    } catch (error) {
        removeSpinner();
        swal('Error!',error,'warning');
    }
}

// helper function to transform 1D array into 2D array
function oneDToTwoD(oneD){
    let twoD = [];
    for(let i = 0; i < oneD.length; i += NUM_PER_ROW) {
        twoD.push([oneD[i], oneD[i+1], oneD[i+2]]);
    }
    let remainder = oneD.length%NUM_PER_ROW;
    let lastFew = oneD.slice(oneD.length-remainder, oneD.length);
    if (lastFew.length != 0) {
        twoD.push([lastFew]);
    }
    return twoD;
}

// render the recipes retrieved from the API in the User Interface
function generateHTML(results) {
    if(results.length > 0) {
        container.classList.remove('initial');
    }

    // erase the newResults queue
    newResults = [];

    // transform the parameter (1D array) into a 2D array to be rendered in a 3 x 3 grid
    let twoDresults = oneDToTwoD(results);

    let generatedHTML = '';

    // use nested iteration to render the grid-based UI
    twoDresults.map((oneDresults) => {
        generatedHTML += `<div class="row pb-3 d-flex justify-content-center text-light">`
        oneDresults.map((result) => {
            let index = results.indexOf(result);
            
            generatedHTML +=
            `        
                <div class="col-md-4 pb-3 d-flex justify-content-center">
                    <div class="card bg-dark border-info" style="width: 30rem">
                        <img class="card-img-top p-3" src="${result.recipe.image}" alt="Image not loading..." />
                        <div class="card-body">
                            <h5 class="card-title">${result.recipe.label}</h5>
                            <p class="card-text">
                                Calories: ${Math.round(result.recipe.calories)}
                            </p>
                            <a class="btn btn-info" href="${result.recipe.url}" target="_blank">View Recipe</a>
                            <button id="${index}" onclick="saveToFavorites(this.id)" class="btn btn-success">Save to Favorites</button>
                        </div>
                    </div>
                </div>      
            `;

            let recipeObject = {
                'recipeName': result.recipe.label, 
                'recipeLink': result.recipe.url,
                'nutritionalInfo': Math.round(result.recipe.calories)
            };
            newResults.push(recipeObject);
        })
        generatedHTML += `</div>`;
    })

    searchResultDiv.innerHTML = generatedHTML;
    removeSpinner();
}

// saving recipes to local storage based on their id
function saveToFavorites(id) {
    let recipes = [];

    if(localStorage.getItem('favorites')){
        recipes = JSON.parse(localStorage.getItem('favorites'));
    }

    let recipe = newResults[parseInt(id)];

    // Error handling
    let flag = false;

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].recipeName == recipe.recipeName && recipes[i].recipeLink == recipe.recipeLink) {
            flag = true;
        }
    }

    // prevent repetitions in local storage to optimize storage
    if(!flag) {
        recipes.push(recipe);
        swal(`${recipe.recipeName} has been saved to your Favorites!`,'','success');
    }
    else {
        swal('','This recipe is already in your favorites','warning');
    }

    localStorage.setItem('favorites', JSON.stringify(recipes));
}

// 2 helper functions to toggle the spinner
function addSpinner(){
    // adding spinner's styling
    belowSearchBar.classList.add('d-flex');
    belowSearchBar.classList.add('justify-content-center');  
    
    // adding spinner            
    belowSearchBar.appendChild(spinner);
}

function removeSpinner(){
    belowSearchBar.classList.remove('d-flex');
    belowSearchBar.classList.remove('justify-content-center');
    belowSearchBar.removeChild(spinner);
}
