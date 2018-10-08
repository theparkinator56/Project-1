// Global

var userIngredients = [];    //div id = $("#ingredientTags")

$(document).ready(function () {

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


});

// Modal trigger

$(document).ready(function(){
    $('.modal').modal();
  });
