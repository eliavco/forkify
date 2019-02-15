// import str from './tests2/search';
// import { add as a, multiply as m, ID } from './tests/searchView';
// import * as searchView from './tests/searchView';
// console.log(`Using imported functions! ${a(ID, 2)} and ${searchView.multiply(ID, 3)} ${str}`);
// searchQuery('pizza');

// ctrl + j to open terminal 

// Global app controller
import Search from './models/search';
import Recipe from './models/recipe';
import { elements, renderLoader, clearLoader, scrollToTop } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

/** Global state of the app:
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Object
 */
const state = {};


/**
 * Search Controller
 */
const controlSearch = async (e) => {

    // 1) Get query from view
    const query = searchView.getInput();

    if (query){
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        if (elements.wrapper.classList.contains('beginning-position')){
            elements.wrapper.classList.remove('beginning-position')
        }
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) search for recipes
            await state.search.getResults();
    
            // 5) Render Recipes to UI
            clearLoader();
            searchView.renderRecipes(state.search.result);
        } catch (err) {
            clearLoader();
        }
    }
};

elements.searchBox.addEventListener('keydown', (e) => {
    if (e.which === 13){
        e.preventDefault();
        controlSearch(e);
    }
})

elements.searchBox.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch(e);
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        scrollToTop();
        searchView.renderRecipes(state.search.result, goToPage);
    }
});

/**
 * Recipe Controller
 */
const controlRecipe = async () => {
    // Get ID from the URL
    const id = window.location.hash.replace('#', '');

    if (id){

        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Create a new recipe object
        state.recipe = new Recipe(id);

        try {
            // get the data for our object
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            // calculate time and servings
            state.recipe.calcServings();
            state.recipe.calcTime();
    
            // Render data to the UI
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (err) {
            alert('');
        }
    }
};
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));