// import str from './tests2/search';
// import { add as a, multiply as m, ID } from './tests/searchView';
// import * as searchView from './tests/searchView';
// console.log(`Using imported functions! ${a(ID, 2)} and ${searchView.multiply(ID, 3)} ${str}`);
// searchQuery('pizza');

// ctrl + j to open terminal 

// Global app controller
import Search from './models/search';
import Recipe from './models/recipe';
import List from './models/list';
import Like from './models/likes';
import { elements, renderLoader, clearLoader, scrollToTop } from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import Likes from './models/likes';

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
            alert('We\'re sorry, something got wrong with the search...');
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

        // Highlight selected item
        if (state.search) searchView.highlightSelected(id);

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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );

        } catch (err) {
            alert('There was a problem showing the recipe you\'ve asked for...');
        }
    }
};
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

/**
 * List Controller
 */

const controlList = () => {
    // create a new list
    if (!state.list) state.list = new List();

    // Add all elements to the array and UI
    state.recipe.ingredients.forEach(ingredient => {
        const item = state.list.addItem(ingredient.count, ingredient.unit, ingredient.ingredient);
        listView.renderItem(item);
    });
};

elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    if (e.target.matches('.shopping__delete, .shopping__delete *')){
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if(e.target.matches('.shopping__count-value')){
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    };

});    

/**
 * Likes Controller
 */

const controlLike = () => {

    if (!state.likes) state.likes = new Like();
    const currentID = state.recipe.id;

    // current recipe is'nt liked
    if (!state.likes.isLiked(currentID)){
        
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );
        
        
        // Toggle the like button
        likesView.toggleLikeBtn(true);
        
        // Add like to the UI
        likesView.renderLike(newLike);
        
        // User liked current recipe
    } else {
        
        // Remove like from the state
        state.likes.deleteLike(currentID);
        
        // Toggle the like button
        likesView.toggleLikeBtn(false);
        
        // remove like from the UI
        likesView.removeLike(currentID);

        //
    }
    likesView.toggleLikesMenu(state.likes.getNumLikes());
};

// Restore likes items each time that the page load
window.addEventListener('load', () => {
    
    if (!state.likes) state.likes = new Like();

    // Restore likes
    state.likes.readStorage();

    likesView.toggleLikesMenu(state.likes.getNumLikes());

    state.likes.likes.forEach(like => likesView.renderLike(like));

});

// END OF Likes CONTROL

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')){
        // Decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
        }    
    } else if (e.target.matches('.btn-increase, .btn-increase *')){        
        // Increase button is clicked
        if (state.recipe.servings < 100){
            state.recipe.updateServings('inc');
        }    
    } else if (e.target.matches('.recipe__btn-add, .recipe__btn-add *')){        
        // Add all ingredients to shopping list button is clicked
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')){
        // Like the current viewd recipe
        controlLike();
    };    
    recipeView.updateServingsIngredients(state.recipe);
});    