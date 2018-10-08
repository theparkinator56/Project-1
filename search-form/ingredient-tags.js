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

    //on deleting ingredient tag 
    //1. removing button
    //2. remove from userIngredient array .splice
    $(document).on("click", ".close", function () {
        var splicevalue = $(this).val();


        index = userIngredients.indexOf(splicevalue);
        userIngredients.splice(index, 1);
        console.log(userIngredients);
    });

    //Checkboxes --> add health and diet 

    var dietOptionsArray = [];
    var healthLabels = $(".health-label");
    console.log(healthLabels[0].id);




    $(healthLabels).on("click", function () {

        for (i in healthLabels) {
            console.log('id: ' + healthLabels[i].id);
            console.log('checked: ' + healthLabels[i].checked);

            if (healthLabels[i].checked === true){
                dietOptionsArray.push( healthLabels[i].id);
            }
            console.log(dietOptionsArray);
        };



    });

});
