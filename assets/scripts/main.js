// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
    // Get the recipes from localStorage
    let recipes = getRecipesFromStorage();
    // Add each recipe to the <main> element
    addRecipesToDocument(recipes);
    // Add the event listeners to the form elements
    initFormHandler();
}

function getRecipesFromStorage() {
    return JSON.parse(localStorage.getItem('recipes')) || [];
}

function addRecipesToDocument(recipes) {
    let main = document.querySelector('main');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = recipe;
        main.appendChild(recipeCard);
    });
}

function saveRecipesToStorage(recipes) {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

function initFormHandler() {
    const form = document.querySelector('#new-recipe');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        let recipeObject = {};
        formData.forEach((value, key) => {
            recipeObject[key] = value;
        });

        const recipeCard = document.createElement('recipe-card');
        recipeCard.data = recipeObject;
        document.querySelector('main').appendChild(recipeCard);

        let recipes = getRecipesFromStorage();
        recipes.push(recipeObject);
        saveRecipesToStorage(recipes);
    });

    const clearButton = document.querySelector('.danger');
    clearButton.addEventListener('click', function() {
        localStorage.clear();
        let main = document.querySelector('main');
        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
    });
}
