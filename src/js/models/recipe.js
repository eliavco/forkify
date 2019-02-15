import axios from 'axios';
import { apiTools } from './../views/base';

export default class Recipe{
    
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            const result = await axios(`${apiTools.proxy}https://www.food2fork.com/api/get?key=${apiTools.keys[3]}&rId=${this.id}`);
            const recipe = result.data.recipe;

            this.title = recipe.title;
            this.author = recipe.publisher;
            this.img = recipe.image_url;
            this.url = recipe.source_url;
            this.ingredients = recipe.ingredients;
            this.source = recipe.f2f_url;
            this.socialRank = recipe.social_rank;
            this.urlDomain = recipe.publisher_url;
        
        } catch (error) {
            alert('There was a problem showing the recipe you\'ve asked for...');
        }
    }

    calcTime(){
        const numIngredients = this.ingredients.length;
        const periods = Math.ceil(numIngredients / 3);
        this.time = periods * 15;
    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons','tablespoon','teaspoons','teaspoon','cups','pounds','ounces','ounce'];   
        const unitsShort = ['tbsp','tbsp','tsp','tsp','cup','pound','oz','oz'];
        const units = [...unitsShort,'kg','g'];

        const newIngredients = this.ingredients.map(el => {
            // 1. Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });

            // 2. Get rid of parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            // 3. Separate the ingredients into quantity, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

            let objIng;
            if (unitIndex > -1){
                // There is a unit
                const arrCount = arrIng.slice(0, unitIndex);

                let count;
                if (arrCount.length == 1){
                    count = Math.round( eval(arrIng[0].replace('-', '+')) * 100) / 100;
                } else {
                    count = Math.round( eval(arrIng.slice(0, unitIndex).join('+')) * 100) / 100;
                }
                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.slice(unitIndex + 1).join(' ').trimEnd()
                };
            } else if (parseInt(arrIng[0], 10)) {
                // There is NO unit, but there is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ').trimEnd()
                }
            } else if (unitIndex === -1) {
                // There is NO unit nor a number in first position
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient.trimEnd()
                }
            }

            // return
            return objIng;
            // return ingredient;
        });
        this.ingredients = newIngredients;
    }

};