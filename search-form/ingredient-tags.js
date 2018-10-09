// Global

var userIngredients = [];    //div id = $("#ingredientTags")

//needed for click function on submit button
var healthsearch = ""
var dietsearch = ""
var caloriessearch = ""
var ingredientssearch = ""
var dynamicurl = "https://api.edamam.com/search?q=" + userIngredients + "&app_id=65e2efca&app_key=a27e3c83b5786423f4acc469987a7164&from=0&to=100"
var count = 0
let usefulObject = [];
let sortedRecipes = []
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
  $("#ingredientInput").keypress(function (e) {
    if (e.which == 13) {
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


  // deleting ingredient tag
  $(document).on("click", ".close", function () {
    var splicevalue = $(this).val();

    index = userIngredients.indexOf(splicevalue);
    userIngredients.splice(index, 1);
  });

  //CHECKBOXES
  var dietOptionsArray = [];

  $(".health-label").on("click", function () {

    let checkedItem = $(this);
    if (checkedItem.prop("checked") == true) {
      dietOptionsArray.push(checkedItem.attr('id'));
      console.log(dietOptionsArray);
    } else if (checkedItem.prop("checked") == false) {
      var splicevalue = $(this).val();
      index = dietOptionsArray.indexOf(splicevalue);
      dietOptionsArray.splice(index, 1);
      console.log(dietOptionsArray);
    }
  });

    $("#submitButton").on("click",function(){
      var mainIngredient = userIngredients[0]
      console.log(mainIngredient)
      $(".recipes-displayed").empty();
      $("#submitButton").hide()
      $(".midquery").show()
      $.ajax({
        url :  "https://api.edamam.com/search?q="+mainIngredient+"&app_id=65e2efca&app_key=a27e3c83b5786423f4acc469987a7164&from=0&to=100",
        method: "GET"
      }).then(function(response){
        for (ingredientList in response.hits){
          var rating = 0
          for (ingredient in userIngredients){
            console.log(ingredientList)
            for (ingredientLine in response.hits[ingredientList].recipe.ingredientLines){
              if (response.hits[ingredientList].recipe.ingredientLines[ingredientLine].includes(userIngredients[ingredient])){
                rating++
              }
            }
          }
          usefulObject.push({name:response.hits[ingredientList].recipe.label,url:response.hits[ingredientList].recipe.url, ingredientLines:response.hits[ingredientList].recipe.ingredientLines, image:response.hits[ingredientList].recipe.image, reciperating:rating})
        }
        sortedRecipes = SortByRatingDesc(usefulObject)
      }).then(function(){
          $(".midquery").hide()
          $("#resetButton").show()
          $(".moreButton").show()
          addRecipes()
        })
      })

  $("#resetButton").on("click",function(){
    userIngredients = [];
    count = 0
    usefulObject = []
    $("#ingredientInput").val("");
    $("#ingredientTags").empty();

    $(".moreButton").hide();
    $("#resetButton").hide();
    $("#submitButton").show();
  })

  //Modal Functionality

  $(document).ready(function () {
    $('.modal').modal();

  });


  $(".moreButton").on("click", function () {
    addRecipes()
  })

})

function addRecipes(){
    var tempArray = sortedRecipes.splice(count, 6)
    count += 6
    for (i in tempArray){
    main = $("<div>")
    main.addClass("col m4")
    card = $("<div>")
    card.addClass("card sticky-action")
    cardImage = $("<div>")
    cardImage.addClass("card-image waves-effect waves-block waves-light")
    cardImage.append('<img class="activator" src='+tempArray[i].image+'>')
    cardLink = $("<div>")
    cardLink.addClass("card-action")
    cardLink.append('<a href="'+tempArray[i].url+'">'+tempArray[i].name+'</a>')
    cardReveal = $("<div>")
    cardReveal.addClass("card-reveal")
    cardReveal.append('<span class="card-title grey-text text-darken-4">Ingredients<i class="material-icons right">close</i></span>')
    for(line in tempArray[i].ingredientLines){
      cardReveal.append('<p class="individualIngredient">'+tempArray[i].ingredientLines[line]+'</p>')
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

//Grocery Store API search based on ZIP code entered

  $("#groceryButton").on("click",function() {
    event.preventDefault();

    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://ca329482.herokuapp.com/' + options.url;
        }
    });

    var zipCode = $("#zipCode").val().trim();
    $("#zipCode").empty();

    var groceryURL = "https://api.yelp.com/v3/businesses/search?location=" + zipCode + "&radius=16000&categories=grocery&limit=3";

    $.ajax({
        url: groceryURL,
        method: 'GET',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer 4gdKRNJYZoIQVLQcdHSNDkZa57qwDCoDujLgbwOvF9qoF_lQi_L9FuNFZ_Ird3JvzIedlK9a6ZloCtTEVwPER__gGFROm1Aywh0YQT_-A2P1CeSZMhMA4F6fzMm8W3Yx');
        },
    }).then(function(response) {
        $("#groceryDisplay").empty();

        for (i=0; i < 3; i++) {
            let groceryDiv = $("<div>");
                groceryDiv.addClass("col s4");

                groceryDiv.append("<h5>" + response.businesses[i].name + "</h5>");
                groceryDiv.append("<span>" + response.businesses[i].location.display_address[0] + "</span> <br>");
                groceryDiv.append("<span>" + response.businesses[i].location.display_address[1] + "</span>");
            $("#groceryDisplay").append(groceryDiv);        
        }
    });
  });

// Options button
  $(document).ready(function(){
    $('.fixed-action-btn').floatingActionButton();
  });


function SortByRatingDesc(unsortedArray) {
  return unsortedArray.sort((a,b) => b.reciperating - a.reciperating);
  x}

