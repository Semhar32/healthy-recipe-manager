class Recipe {
    constructor(id, name, ingredients, instructions, mealType) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.mealType = mealType;
    }
}

const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

document.getElementById('recipe-form').addEventListener('submit', addRecipe);
document.getElementById('search-button').addEventListener('click', searchRecipes);

function addRecipe(e) {
    e.preventDefault();
    const id = recipes.length ? recipes[recipes.length - 1].id + 1 : 1;
    const name = document.getElementById('name').value;
    const ingredients = document.getElementById('ingredients').value.split(',').map(ingredient => ingredient.trim());
    const instructions = document.getElementById('instructions').value;
    const mealType = document.getElementById('meal-type').value;

    const newRecipe = new Recipe(id, name, ingredients, instructions, mealType);
    recipes.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
    document.getElementById('recipe-form').reset();
}

function searchRecipes() {
    const search = document.getElementById('search').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(search)));
    displayRecipes(filteredRecipes);
}

function displayRecipes(recipeList = recipes) {
    const recipesDiv = document.getElementById('recipes');
    recipesDiv.innerHTML = '';
    recipeList.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
            <p><strong>Meal Type:</strong> ${recipe.mealType}</p>
        `;
        recipesDiv.appendChild(recipeDiv);
    });
}

// Initialize recipes on page load
document.addEventListener('DOMContentLoaded', displayRecipes);
