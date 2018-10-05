// Global

var userIngredients = [];    //div id = $("#ingredientTags")

$(document).ready(function () {

    //autocomplete results are equal to ingredients object
    console.log(ingredients);
    $('input.autocomplete').autocomplete({
        data: {
            "Apple": null,
            "Watermellon": null,
            "Chicken": null
        },
    });

    
    
    //on click function for adding ingredients
    $("#addButton").on("click", function (event) {
        event.preventDefault();

        // pass search input into tag 
        var ingredientInput = $("#ingredientInput").val().trim();
        console.log(ingredientInput);

        userIngredients.push(ingredientInput);
        console.log(userIngredients);

        displayTags();

    });

    // add selected ingredients to tags 
    function displayTags() {
        $("#ingredientTags").empty();
        // Loops through the array of topics
        for (var i = 0; i < userIngredients.length; i++) {

            // Then dynamicaly generates tags for each topic in the array
            //<div class="chip">Chicken <i class="close material-icons">close</i></div>
            let tag = $("<div>");
            tag.addClass("chip");  
            tag.html(userIngredients[i]);     
                         
            $("#ingredientTags").append(tag);          // Added the button to the addTopics div
        };
    };




});
