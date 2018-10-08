// Global

var userIngredients = [];    //div id = $("#ingredientTags")

//needed for click function on submit button
var healthsearch = ""
var dietsearch= ""
var caloriessearch = ""
var ingredientssearch = ""
var dynamicurl = "https://api.edamam.com/search?q="+userIngredients+"&app_id=65e2efca&app_key=a27e3c83b5786423f4acc469987a7164&from=0&to=100"
var ingredientsArray = []
var ratingArray = []
var recipeImages = []
var maxRatingRecipes = [];
var midRatingRecipes = [];
var lowRatingRecipes = [];


$(document).ready(function () {
    $(".midquery").hide()
    //autocomplete results are equal to ingredients object
    console.log(ingredients);
    $('input.autocomplete').autocomplete({
        data,
            // "Apple": null,
            // "Watermellon": null,
            // "Chicken": null
        minLength: 3,
    });

    //on click function for adding ingredients
    $("#addButton").on("click", function (event) {
        event.preventDefault();

        // pass search input into tag
        var ingredientInput = $("#ingredientInput").val().trim();
        console.log(ingredientInput);

        if (userIngredients.includes(ingredientInput)) {
            return 0;
        } else {
            userIngredients.push(ingredientInput);
            displayTags(userIngredients);
        }
        console.log(userIngredients);

    });

    // add selected ingredients to tags
    function displayTags() {
        $("#ingredientTags").empty();
        // Loops through the array of topics
        for (i in userIngredients) {

                // Then dynamicaly generates tags for each topic in the array
                //<div class="chip">Chicken <i class="close material-icons">close</i></div>
                let tag = $("<div>");                   //ingredient tag with class chip
                tag.addClass("chip");
                tag.html(userIngredients[i]);

                let close = $("<i>");
                close.addClass("close material-icons");
                close.text("close");
                close.val(userIngredients[i]);

                $("#ingredientTags").append(tag);          // Added the button to the addTopics div
                $(tag).append(close);

        };
    };

    //on chip delete
    //1. removing button
    //2. remove from userIngredient array .splice
    $(document).on("click", ".close", function(){
        var splicevalue = $(this).val();


        index= userIngredients.indexOf(splicevalue);
        userIngredients.splice(index, 1);
        console.log(userIngredients);
    });

    $("#submitButton").on("click",function(){
      var mainIngredient = userIngredients[0]
      $(".start").hide()
      $(".midquery").show()
      $.ajax({
        url :  "https://api.edamam.com/search?q="+mainIngredient+"&app_id=65e2efca&app_key=a27e3c83b5786423f4acc469987a7164&from=0&to=100",
        method: "GET"
      }).then(function(response){
        for (let i=0;i < response.hits.length;i++){
          var  ingredientlist = response.hits[i].recipe.ingredientLines
          ingredientsArray.push(ingredientlist)
          recipeImages.push(response.hits[i].recipe.image||"https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiMl5rxn_fdAhUr0YMKHdiDBxEQjRx6BAgBEAU&url=https%3A%2F%2Fgorving.com%2Fwhat-to-do%2Frecipes-for-the-road&psig=AOvVaw1j9R-0ISQKVVNrQU_XYKI5&ust=1539101999459901")
        }
        for (ingredientList in ingredientsArray){
          var rating = 0
          for (ingredient in userIngredients){
            for (ingredientLine in ingredientsArray[ingredientList]){
              if (ingredientsArray[ingredientList][ingredientLine].includes(userIngredients[ingredient])){
                rating++
              }
            }
          }
          ratingArray.push(rating)
        }


      //Should go inside the AJAX call in order to access the proper variables

      for (i = 0; i < ratingArray.length; i++) {

          if (ratingArray[i] >= userIngredients.length) {
              maxRatingRecipes.push(response.hits[i].recipe);
          }

          else if (ratingArray[i] === userIngredients.length - 1) {
              midRatingRecipes.push(response.hits[i].recipe);
          }

          else if (ratingArray[i] === userIngredients.length - 2) {
              lowRatingRecipes.push(response.hits[i].recipe);
          }

          else {
              //psudeocode, need id for the DOM element that will display recipes
              //"Sorry, we didn't find any recipes that matched closely enough with your ingredients."
          }
      }
    }).then(function(){
      $(".midquery").hide()
})
});



$(document).ready(function(){
    $('.modal').modal();
  });

