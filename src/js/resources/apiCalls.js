// function second(){
//     setTimeout(() => {
//         console.log('two');
//     }, 1500);
// }

// function first(){
//     console.log('one');
//     second();
//     console.log('three');
// }

// first()

// const getID = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([523, 883, 432, 974]);
//     }, 1500)
// })

// const getRecipe = recID => {
//     return new Promise((resolve, reject) => {
//         setTimeout((ID) => {
//             const recipe = {
//                 title: 'Fresh Mozarella Pizza',
//                 publisher: 'Jonas'
//             };
//             resolve([`${ID}: ${recipe.title} by ${recipe.publisher}`, recipe]);
//         }, 1500, recID);
//     });
// };

// const getRelated = publisher => {
//     return new Promise((resolve, reject) => {
//         setTimeout((pub) => {
//             const recipe2 = {
//                 title: 'Fresh Tomato Pasta',
//                 publisher: 'Jonas'
//             }
//             resolve([`Anotehr recipe by ${pub}: ${recipe2.title}, by ${recipe2.publisher}`, recipe2]);
//         }, 1500, publisher);
//     })
// };

// async function recipeAW(){
//     const IDs = await getID;
//     console.log(IDs);

//     const res = await getRecipe(IDs[2]);
//     console.log(res[0]);

//     const res2 = await getRelated(res[1].publisher);
//     console.log(res2[0]);

//     return res[0];
// }
// recipeAW().then(res => console.log(`${res} is the best`));

// getID
// .then(IDs => {
//     console.log(IDs);
//     return getRecipe(IDs[2]);
// })
// .then(res => {
//     console.log(res[0]);
//     return getRelated(res[1].publisher);
// })
// .then(res2 => {
//     console.log(res2[0]);
// })
// .catch(Error => {
//     console.log('Error!!!')
// })

/*
AJAX from weather API
*/

// function getWeather(woeid){
//     fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`)
//     .then(result => {
//         // console.log(result);
//         return result.json();
//     })
//     .then(data => {
//         // console.log(data);
//         let today = data.consolidated_weather[0];
//         // console.log(today);
//         console.log(`Tempratures in ${data.title} will stay between ${Math.round(today.min_temp * 100) / 100}°C and ${Math.round(today.max_temp * 100) / 100}°C today.`);
//     })
//     .catch(error => console.log(error));
// }
// getWeather(2487956);
// getWeather(44418);

// async function getWeatherAW(woeid){
//     try {
//         const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`);
//         const data = await result.json();
//         const today = data.consolidated_weather[0];
//         console.log(`Tempratures in ${data.title} will stay between ${Math.round(today.min_temp * 100) / 100}°C and ${Math.round(today.max_temp * 100) / 100}°C today.`);
//     } catch(error){
//         console.log('error');
//     }
// }
// getWeatherAW(2487956);
// getWeatherAW(44418);