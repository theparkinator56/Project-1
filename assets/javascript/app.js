
$(document).ready(function() {
    $('#results').html("<tr id='result" + //Result Number//
    4+ "'>" + recipeimage + recipeName + recipeCalories + recipeModal + "</tr>");
    var recipeName = $("<td>" + //RecpieName Placeholder// 
    3+"</td>");
    var recipeimage = $("<td>" + //RecpieImage Placeholder//
    2+"</td>");
    var recipeCalories = $("<td>" + //RecpieCalories Placeholder//
    1+"</td>");
    var recipeModal = $("<a>");
    recipeModal.attr("href", "#modal1");
    recipeModal.attr("class", "waves-effect waves-light btn modal-trigger");
    console.log('sucess')

});




