// export default 'I am an exported string';

// Documentation
// Submitting a Query
// All search requests should be made to the search API URL.

// https://www.food2fork.com/api/search
// All recipe requests should be made to the recipe details API URL.

// https://www.food2fork.com/api/get 
// Parameters
// All parameters can be encoded as either HTTP GET or POST parameters.

// Search Parameters
// key: API Key
// q: (optional) Search Query (Ingredients should be separated by commas). If this is omitted top rated recipes will be returned.
// sort: (optional) How the results should be sorted. See Below for details.
// page: (optional) Used to get additional results
// Replace YOUR_API_KEY with your api key, and copy/paste the below url into your browser for an immediate example, searching recipes with "chicken breast" as an ingredient.

// https://www.food2fork.com/api/search?key=YOUR_API_KEY&q=chicken%20breast&page=2 
// Recipe Details Parameters
// key: API Key
// rId: Id of desired recipe as returned by Search Query
// Replace YOUR_API_KEY with your api key, and copy/paste the below url into your browser for an immediate example.

// https://www.food2fork.com/api/get?key=YOUR_API_KEY&rId=35382
// Search Sorting
// The Food2Fork API offers two kinds of sorting for queries. The first is by rating. This rating is based off of social media scores to determine the best recipes.

// sort=r
// The second is by trendingness. The most recent recipes from our publishers have a trend score based on how quickly they are gaining popularity.

// sort=t
// Pages (Search Only)
// Any request will return a maximum of 30 results. To get the next set of results send the same request again but with page = 2

// The default if omitted is page = 1

// Response Parameters
// The response is json encoded.
// Search
// count: Number of recipes in result (Max 30)
// recipes: List of Recipe Parameters ->
// 	image_url: URL of the image
// 	source_url: Original Url of the recipe on the publisher's site
// 	f2f_url: Url of the recipe on Food2Fork.com
// 	title: Title of the recipe
// 	publisher: Name of the Publisher
// 	publisher_url: Base url of the publisher
// 	social_rank: The Social Ranking of the Recipe (As determined by our Ranking Algorithm)
// 	page: The page number that is being returned (To keep track of concurrent requests)
// Sample Response
// Request: https://www.food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken

// {
// "count": 1, 
// "recipes": [{
// "publisher": "Allrecipes.com",
// "social_rank": 99.81007979198002, 
// "f2f_url": "https://www.food2fork.com/recipes/view/29159", 
// "publisher_url": "http://allrecipes.com", 
// "title": "Slow-Cooker Chicken Tortilla Soup", 
// "source_url": "http://allrecipes.com/Recipe/Slow-Cooker-Chicken-Tortilla-Soup/Detail.aspx",
// "page":1}]
// }
// Get Recipe
// recipe: List of Recipe Parameters ->
// 	image_url: URL of the image
// 	source_url: Original Url of the recipe on the publisher's site
// 	f2f_url: Url of the recipe on Food2Fork.com
// 	title: Title of the recipe
// 	publisher: Name of the Publisher
// 	publisher_url: Base url of the publisher
// 	social_rank: The Social Ranking of the Recipe (As determined by our Ranking Algorithm)
// 	ingredients: The ingredients of this recipe

// Commercial Usage
// Recipe images may be subject to copyright. Attribution of the recipe to the original publisher is recommended in all cases.

// The Free API plan is intended for educational, or development purposes only. You may not store the results or publish the results in any application.

// Food2Fork does not impose commercial usage restriction upon Paid API plans.

// Social Ranking Algorithm
// Food2Fork uses a proprietary ranking algorithm based off of how often a recipe is shared across various social-media sites including Facebook, Pinterest, and Twitter.

// This algorithm exposes a floating point number from 1.0 - 100.0 where a higher number means the recipe is more popular relative to the other recipes in our database.

// The rank is updated daily.

// Not so good: https://crossorigin.me/
// Very good:   https://cors-anywhere.herokuapp.com/
// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get
// 769d447afbec39f60297c0f3bc6aab14

//
// search.js test
import axios from 'axios'

