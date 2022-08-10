const resultDiv = document.querySelector(".result");

// render all the 'favorites' in the UI
function showFavorites() {
    let generatedHTML = "";
    let keyName = "favorites";
    let favorites = JSON.parse(localStorage.getItem(keyName));

    favorites.map((recipe) => {
        let index = favorites.indexOf(recipe);
        generatedHTML += `
        <div class="flex-container item m-5 p-5 bg-light border border-dark">            
            <h1 class="title">${recipe.recipeName} (${recipe.nutritionalInfo} calories)</h1>
            <a class="btn btn-info" href="${recipe.recipeLink}" target="_blank">View Recipe</a>                
            
            <button id=${index} onclick="deleteFavorite(this.id)" type="button" class="btn btn-danger btn-lg float-end m-6">Delete</button>    
        </div>
        `;
    });
    resultDiv.innerHTML = generatedHTML;
}

// delete a recipe from the local storage
function deleteFavorite(id){
    let keyName = "favorites";
    let favorites = JSON.parse(localStorage.getItem(keyName));
    let recipe = favorites[parseInt(id)];
    // warning
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this recipe!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            favorites.splice(parseInt(id), 1);
            localStorage.setItem(keyName, JSON.stringify(favorites));
            location.reload();
        } else {
            swal(`The recipe for ${recipe.recipeName} is safe!`);
        }
    });
}