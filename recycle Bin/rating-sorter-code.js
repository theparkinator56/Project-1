

var maxRatingRecipes = [];
var midRatingRecipes = [];
var lowRatingRecipes = [];

//Should go inside the AJAX call in order to access the proper variables

for (i = 0; i < ratingObj.length; i++) {

    if (ratingObj[i] >= useringredients.length) {
        maxRatingRecipes.push(response.hits[i].recipe);
    }

    else if (ratingObj[i] === useringredients.length - 1) {
        midRatingRecipes.push(response.hits[i].recipe);
    }

    else if (ratingObj[i] === useringredients.length - 2) {
        lowRatingRecipes.push(response.hits[i].recipe);
    }

    else {
        //psudeocode, need id for the DOM element that will display recipes
        //"Sorry, we didn't find any recipes that matched closely enough with your ingredients."
    }
}