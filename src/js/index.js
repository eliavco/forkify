// import str from './tests2/search';
// import { add as a, multiply as m, ID } from './tests/searchView';
// import * as searchView from './tests/searchView';
// console.log(`Using imported functions! ${a(ID, 2)} and ${searchView.multiply(ID, 3)} ${str}`);
// searchQuery('pizza');

// ctrl + j to open terminal 

// Global app controller
import Search from './models/search';

/** Global state of the app:
 * - Search Object
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Object
 */
const state = {};

const controlSearch = async (e) => {
    // 1) Get query from view
    const query = 'Pizza';

    if (query){
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) search for recipes
        await state.search.getResults();

        // 5) Render Recipes to UI
        console.log(state.search.result);
    }
};

document.querySelector('.search').addEventListener('keydown', (e) => {
    if (e.which === 13){
        controlSearch();
    }
})

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch(e);
});