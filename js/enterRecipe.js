// declare global variables
let recipeName;
let recipeIngredients;
let recipeInstructions;

// select the form element
const searchForm = document.querySelector('form');

// to save a recipe entered by the user
function submitEnteredForm(){
    searchForm.addEventListener('submit', (e) => {
        // stop form from auto-reloading page when submitted        
        e.preventDefault();
        
        // check what is inputted in the search bar
        recipeName = e.target[0].value;
        recipeIngredients = e.target[1].value;
        recipeInstructions = e.target[2].value;

        let recipeObject = {
            'recipeName': recipeName,
            'recipeIngredients': recipeIngredients,
            'recipeInstructions': recipeInstructions,
        };

        // call a helper function to save the recipe to local storage
        saveEnteredRecipe(recipeObject);

        // confirmation message
        swal({
            title: 'Saved!',
            text: "Your recipe was saved successfully!",
            icon: "success",
            buttons: true
        }).then(() => {    
            location.reload();
        });
    });
}

// helper function to save the recipe to local storage
function saveEnteredRecipe(recipeObj){
    let recipes = [];

    // retrieve the recipes already entered by the user  
    if(localStorage.getItem('enteredRecipes')){
        recipes = JSON.parse(localStorage.getItem('enteredRecipes'));
    }

    // append the entered recipe
    recipes.push(recipeObj);
    localStorage.setItem('enteredRecipes', JSON.stringify(recipes));
}

// helper function to 'clean' the input from localStorage
function cleanInput(str){
    let arr = str.split("\n");
    arr = arr.filter(e => e);
    return arr.join("<br>");
}

let resultDiv = document.getElementById('result');

// rendering the list of recipes from localstorage in the User Interface
function showEnteredRecipes(){
    let generatedHTML = "";
    let keyName = "enteredRecipes";
    let recipes = JSON.parse(localStorage.getItem(keyName));
    recipes.map(recipe => {
        let index = recipes.indexOf(recipe);
        // modify ingredients and instructions
        let ingredients = recipe.recipeIngredients;
        ingredients = cleanInput(ingredients);

        let instructions = recipe.recipeInstructions;
        instructions = cleanInput(instructions);

        
        generatedHTML += `
            <div class="item m-5 p-5 bg-light border border-dark">
            
            <div class="flex-container">
                <button 
                    type="button" 
                    class="btn btn-success float-end m-6" 
                    data-bs-toggle="modal" 
                    data-bs-target="#editModal${index}"
                >
                    Edit
                </button>
                <h1 class="title">${recipe.recipeName}</h1>

                <!-- modal trigger -->
                <button
                    type="button"
                    class="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#seeRecipeModal${index}"
                >
                    See recipe information
                </button>
                <button id=${index} onclick="deleteRecipe(this.id)" type="button" class="btn btn-danger float-end m-6">Delete</button>
            </div>


                <!-- modal for seeing recipe info -->
                <div class="modal" id="seeRecipeModal${index}">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${recipe.recipeName}</h5>
                        <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <form>
                        <p class="mb-3">
                        Ingredients:
                        <br>   
                            ${ingredients} 
                            <br>
                            <br>
                        Instructions:
                        <br>   
                            ${instructions}
                        </p>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button
                        type="button"
                        class="btn btn-danger"
                        data-bs-dismiss="modal"
                        >
                        Close
                        </button>
                    </div>
                    </div>
                </div>
                </div>  
                
                <!-- modal for editing -->                
                <div class="modal" id="editModal${index}">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${recipe.recipeName}</h5>
                                <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                ></button>
                            </div>
                            <div class="modal-body">
                                <form id="toBeEdited${index}">
                                    <div class="form-group pb-3">
                                    <label for="recipeName">Recipe Name</label>
                                    <input
                                        value="${recipe.recipeName}"
                                        autocomplete="off"
                                        type="text"
                                        class="form-control"
                                        id="recipeName"
                                        placeholder="eg: Salad"
                                        required
                                    />
                                    </div>
                                    <div class="form-group pb-3">
                                    <label for="recipeIngredients">Recipe Ingredients</label>
                                    <br />
                        
                                    <textarea
                                        class="form-control"
                                        name="ingredients"
                                        id="recipeIngredients"
                                        rows="10"
                                        placeholder="It is recommended that you number the ingredients and include the desired amount. eg:&#10;1. Flour, 100g&#10;2. Butter, 1 tablespoon"
                                    >${recipe.recipeIngredients}</textarea>
                                    </div>
                                    <div class="form-group pb-3">
                                    <label for="recipeInstructions">Recipe Instructions</label>
                                    <br />
                                    
                                    <textarea
                                        class="form-control"
                                        name="instructions"
                                        id="recipeInstructions"
                                        rows="10"
                                        placeholder="It is recommended that you number the instructions. eg:&#10;1. Stir the mixture&#10;2. Combine the two mixtures"
                                    >${recipe.recipeInstructions}</textarea>                            
                                    </div>
                                    <button
                                    type="submit"
                                    onclick="editRecipe(${index})"
                                    class="btn btn-outline-primary mb-4"
                                    >
                                    Save your edited Recipe
                                    </button>
                                </form>
                            </div>
                    <div class="modal-footer">
                        <button
                        type="button"
                        class="btn btn-danger"
                        data-bs-dismiss="modal"
                        >
                        Close without saving                        
                        </button>                        
                    </div>
                    </div>
                </div>
                </div>
            </div>
            `;
    })
    resultDiv.innerHTML = generatedHTML;
}

function editRecipe(index){
    let id = `toBeEdited${index}`;
    let currentForm = document.getElementById(id);

    currentForm.addEventListener('submit', (e) => {
        // stop form from auto-reloading page when submitted        
        e.preventDefault();
        
        let keyName = "enteredRecipes";
        let recipes = JSON.parse(localStorage.getItem(keyName));
        // check what is inputted in the search bar
        recipeName = e.target[0].value;
        recipeIngredients = e.target[1].value;
        recipeInstructions = e.target[2].value;

        let recipe = recipes[index];
        console.log(recipes[index]);

        // keep track of if anything has been changed
        let flag = false;

        if (recipeName.trim() != recipe.recipeName.trim()){
            recipe.recipeName = recipeName;
            flag = true;                        
        } 
        if (recipeIngredients.trim() != recipe.recipeIngredients.trim()) {
            recipe.recipeIngredients = recipeIngredients;
            flag = true;
        }
        if (recipeInstructions.trim() != recipe.recipeInstructions.trim()) {
            recipe.recipeInstructions = recipeInstructions;
            flag = true;
        }
        
        // if anything has changed, then save the edits to local storage
        if(flag){
            localStorage.setItem("enteredRecipes", JSON.stringify(recipes));     
            location.reload();
        }
    })
}

// deleting a recipe from local storage
function deleteRecipe(id){
    let keyName = "enteredRecipes";
    let entered = JSON.parse(localStorage.getItem(keyName));
    let recipe = entered[parseInt(id)];
    
    // warning
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this recipe!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            entered.splice(parseInt(id), 1);
            localStorage.setItem(keyName, JSON.stringify(entered));
            location.reload();
        } else {            
            swal(`The recipe for ${recipe.recipeName} is safe!`);
        }
    });
}