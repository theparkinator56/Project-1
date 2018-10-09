// Global

var userIngredients = [];    //div id = $("#ingredientTags")

//needed for click function on submit button
var healthsearch = ""
var dietsearch = ""
var caloriessearch = ""
var ingredientssearch = ""
var dynamicurl = "https://api.edamam.com/search?q=" + userIngredients + "&app_id=65e2efca&app_key=a27e3c83b5786423f4acc469987a7164&from=0&to=100"
var ingredientsArray = []
var ratingArray = []
var recipeImages = []
var ratingRecipes7 = [];
var ratingRecipes6 = [];
var ratingRecipes5 = [];
var ratingRecipes4 = [];
var ratingRecipes3 = [];
var ratingRecipes2 = [];
var ratingRecipes1 = [];
var ratingRecipes5 = [];
var ratingRecipesArrays = [ratingRecipes7,ratingRecipes6,ratingRecipes5,ratingRecipes4,ratingRecipes3,ratingRecipes2,ratingRecipes1];
var maxRatingRecipes = [];
var count = 0

$(document).ready(function () {
    $(".midquery").hide()
    $("#resetButton").hide()
    $(".moreButton").hide()
    //autocomplete results are equal to ingredients object
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
        if (userIngredients.includes(ingredientInput)) {
            return 0;
        } else {
            userIngredients.push(ingredientInput);
            displayTags(userIngredients);
        }
        $("#ingredientInput").val("");
    });
    $("#ingredientInput").keypress(function(e) {
      if(e.which == 13) {
        event.preventDefault();
        // pass search input into tag
        var ingredientInput = $("#ingredientInput").val().trim();
        if (userIngredients.includes(ingredientInput)) {
            return 0;
        } else {
            userIngredients.push(ingredientInput);
            displayTags(userIngredients);
        }
        $("#ingredientInput").val("");
      }
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


    //on deleting ingredient tag

    //on chip delete
    //1. removing button
    //2. remove from userIngredient array .splice
    $(document).on("click", ".close", function (){
        var splicevalue = $(this).val();

        index = userIngredients.indexOf(splicevalue);
        userIngredients.splice(index, 1);
    });


    var dietOptionsArray = [];
    var healthLabels = $(".health-label");

    $(healthLabels).on("click", function () {

        for (i in healthLabels) {

            if (healthLabels[i].checked === true) {
                dietOptionsArray.push(healthLabels[i].id);
            }
        };

      })
    $("#submitButton").on("click",function(){
      var mainIngredient = userIngredients[0]
      $(".recipes-displayed").empty();
      $("#submitButton").hide()
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




      for (i = 0; i < ratingArray.length; i++) {
           if (ratingArray[i] >= userIngredients.length) {
              ratingRecipes7.push(response.hits[i].recipe);
          }

          else if (ratingArray[i] === userIngredients.length - 1) {
              ratingRecipes6.push(response.hits[i].recipe);
          }

          else if (ratingArray[i] === userIngredients.length - 2) {
              ratingRecipes5.push(response.hits[i].recipe);
          }
          else if (ratingArray[i] === userIngredients.length - 3) {
              ratingRecipes4.push(response.hits[i].recipe);
          }

          else if (ratingArray[i] === userIngredients.length - 4) {
              ratingRecipes3.push(response.hits[i].recipe);
          }
          else if (ratingArray[i] === userIngredients.length - 5) {
              ratingRecipes2.push(response.hits[i].recipe);
          }

          else if (ratingArray[i] === userIngredients.length - 6) {
              ratingRecipes1.push(response.hits[i].recipe);
          }

          else {
            $(".recipes-displayed").text("Sorry, we didn't find any recipes that matched closely enough with your ingredients.  Try removing one ingredient and search again.")
          }
      }
      for (recipeArray in ratingRecipesArrays){
        for (recipe in ratingRecipesArrays[recipeArray]){
          maxRatingRecipes.push(ratingRecipesArrays[recipeArray][recipe])
        }
      }
    }).then(function(){
      $(".midquery").hide()
      $("#resetButton").show()
      $(".moreButton").show()
      addRecipes()
    })
})

  $("#resetButton").on("click",function(){
    ingredientsArray = [];
    ratingArray = [];
    recipeImages = [];
    maxRatingRecipes = [];
    midRatingRecipes = [];
    lowRatingRecipes = [];
    userIngredients = [];

    $("#ingredientInput").val("");
    $("#ingredientTags").empty();

    $(".moreButton").hide();
    $("#resetButton").hide();
    $("#submitButton").show();
  })

//Modal Functionality

  $(document).ready(function(){
      $('.modal').modal();

    });


  $(".moreButton").on("click",function(){
    addRecipes()
  })

})

function addRecipes(){
  thisCount = count + 6
  for(i=count; i<thisCount ; i++){
    main = $("<div>")
    main.addClass("col m4")
    card = $("<div>")
    card.addClass("card sticky-action")
    cardImage = $("<div>")
    cardImage.addClass("card-image waves-effect waves-block waves-light")
    cardImage.append('<img class="activator" src='+maxRatingRecipes[i].image+'>')
    cardLink = $("<div>")
    cardLink.addClass("card-action")
    cardLink.append('<a href="'+maxRatingRecipes[i].url+'">'+maxRatingRecipes[i].label+'</a>')
    cardReveal = $("<div>")
    cardReveal.addClass("card-reveal")
    cardReveal.append('<span class="card-title grey-text text-darken-4">Ingredients<i class="material-icons right">close</i></span>')
    for(line in maxRatingRecipes[i].ingredientLines){
      cardReveal.append('<p class="individualIngredient">'+maxRatingRecipes[i].ingredientLines[line]+'</p>')
    }
    card.append(cardImage)
    card.append(cardLink)
    card.append(cardReveal)
    main.append(card)
    $(".recipes-displayed").append(main)
    count += 1
  }

    // Add items to shopping list
    $(document).on("click",".individualIngredient", function(){
      var clickIngredient = $(this).text();
      var domIngredient = $("<li>").text(clickIngredient);
      console.log(clickIngredient);
      $(".listItems").append(domIngredient);
      $(".listItems").append("<hr>")
    })
  

  
}

// Options button
  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });