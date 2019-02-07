// Not so good: https://crossorigin.me/
// Very good:   https://cors-anywhere.herokuapp.com/
// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get
// 769d447afbec39f60297c0f3bc6aab14

// For whole documentation tests2/search.js

// search.js
import axios from 'axios';

async function getResults(query){
    const key = '769d447afbec39f60297c0f3bc6aab14';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const result = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${query}`);
    console.log(result);
};
export const searchQuery = getResults;
