 // Not so good: https://crossorigin.me/ // Very good:   https://cors-anywhere.herokuapp.com/ // https://www.food2fork.com/api/search // https://www.food2fork.com/api/get // 769d447afbec39f60297c0f3bc6aab14 // Axios is already un-json-ed // Don't forget the limit of 500 calls per day; // For whole documentation tests2/search.js // search.js 
 import axios from 'axios'; // async function getResults(query){ //     const key = '769d447afbec39f60297c0f3bc6aab14'; //     const proxy = 'https://cors-anywhere.herokuapp.com/'; //     try { //         const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`); //         const recipes = result.data.recipes //         console.log(recipes); //     } catch (error) { //         alert('We\'re sorry, something got wrong with the search...'); //     } // }; // export const searchQuery = getResults;
 export default class Search{
    constructor(query){
        this.query = query;
    }
    
    async getResults(){
        const keys = ['769d447afbec39f60297c0f3bc6aab14', '989b0516cc7f7f45946f767ae654a3df', '8036a931f33976ac29c4fec8067b65c2'];
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try {
            // for (key in keys){
                const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${keys[2]}&q=${this.query}`);
                this.result = result.data.recipes;
            //     if (result !== undefined){
            //         break;
            //     }
            // }
            // console.log(this.result);
        } catch (error) { 
            // try {
            //     const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${keys[1]}&q=${this.query}`);
            //     this.result = result.data.recipes;
            // } catch (error) {
            //     try {
            //         const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${keys[2]}&q=${this.query}`);
            //         this.result = result.data.recipes;
            //     } catch (error) {
                    alert('We\'re sorry, something got wrong with the search...');
            //     }
            // }
        }
    }
 
};