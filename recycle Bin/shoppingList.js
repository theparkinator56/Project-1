$(document).ready( function (){


    // Add selected ingredients into shopping list
    var shoppingList = function() {
        for (i in ingredients.spices) {
            var ingredient = ingredients.spices[i]
            var domIngredient = $("<li>").text(ingredient);
            
            $(".listItems").append(domIngredient);
            $(".listItems").append("<hr>")
            
        }
    }
    
    shoppingList();
    });