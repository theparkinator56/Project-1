ingredients = {
vegetables: ['alfalfa sprouts', 'artichokes', 'asparagus', 'avocado', 'bamboo shoots', 'bean sprouts', 'beets', 'Brussels sprouts', 'cabbage', 'cauliflower', 'celery', 'cucumbers', 'eggplant', 'garlic', 'green beans', 'green peppers', 'jicama', 'leeks', 'lettuce iceberg', 'mung bean sprouts', 'mushrooms', 'okra', 'onions', 'pattypan squash', 'radicchio', 'radishes', 'red cabbage', 'scallions', 'snow peas', 'tomatillos', 'turnips', 'wax beans', 'yellow squash', 'zucchini','bean burger', 'black beans,', 'black-eyed peas', 'chickpeas','garbanzo beans', 'edamame', 'falafel', 'fava beans', 'hummus', 'kidney beans', 'lentils', 'lima beans', 'navy beans', 'pinto beans', 'soy beans', 'split peas', 'white beans','cassava', 'corn', 'green bananas', 'green lima beans', 'green peas', 'parsnips', 'plantains', 'potatoes, white', 'taro', 'water chestnuts', 'yams','arugula', 'bok choy', 'broccoli', 'broccoli rabe', 'rapini', 'broccolini', 'collard greens', 'dark-green leafy lettuce', 'endive', 'escarole', 'kale', 'mesclun', 'mixed greens', 'mustard greens', 'romaine lettuce', 'spinach', 'Swiss chard', 'turnip greens', 'watercress'],

meats: ['anchovies', 'sardines', 'tuna','clams', 'crab', 'crayfish', 'lobster', 'mussels', 'octopus', 'oysters', 'scallops', 'shrimp', 'squid', 'calamari','catfish', 'cod', 'flounder', 'haddock', 'halibut', 'herring', 'mackerel','pollock', 'porgy', 'salmon', 'sea bass', 'snapper', 'sushi', 'swordfish', 'tilapia', 'trout', 'tuna', 'tofu','chicken', 'duck', 'goose', 'turkey','giblets', 'liver','bison', 'rabbit', 'venison','beef', 'chicken', 'ham', 'pork', 'turkey','beef', 'pork', 'sausage'],

nuts:['almonds', 'almond butter', 'cashews', 'chia seeds', 'hazelnuts', 'mixed nuts', 'peanuts', 'peanut butter', 'pecans', 'pistachios', 'pumpkin seeds', 'sesame seeds', 'sunflower seeds', 'walnuts'],

fruits:['acai berries', 'blackberries', 'blueberries', 'cranberries', 'currants', 'goji berries', 'huckleberries', 'lingonberries (cowberries)', 'mulberries', 'raspberries', 'strawberries','apples', 'apricots', 'bananas', 'cherries', 'dates', 'figs', 'fruit cocktail', 'grapefruit', 'grapes', 'guava', 'kiwi fruit', 'lemons', 'limes', 'mangoes', 'nectarines', 'oranges', 'papaya', 'peaches', 'pears', 'persimmons', 'pineapple', 'plums', 'pomegranate', 'prunes', 'raisins', 'star fruit', 'tangerines','cantaloupe', 'honeydew', 'horned melon', 'watermelon'],

grains:['bagels', 'biscuits', 'breadcrumbs', 'cakes', 'challah bread', 'cookies', 'corn flakes', 'corn tortillas', 'cornbread', 'couscous', 'crackers', 'English muffins', 'flour tortilla', 'French bread', 'grits', 'hominy', 'matzo', 'naan', 'noodles', 'pancakes', 'pasta', 'pie crusts', 'pita bread', 'pizza crust', 'polenta', 'pretzels', 'ramen noodles', 'rice cakes', 'rice paper', 'rice vermicelli', 'waffles', 'white bread', 'white rice', 'white sandwich buns and rolls','amaranth', 'brown rice', 'buckwheat', 'bulgur', 'kamut', 'millet', 'muesli', 'oatmeal', 'popcorn', 'quinoa', 'rolled oats', 'sorghum', 'spelt', 'teff', 'whole grain barley', 'whole grain cornmeal', 'whole grain sorghum', 'whole rye', 'whole wheat bread', 'whole wheat cereal flakes', 'whole wheat crackers', 'whole wheat pasta', 'whole wheat sandwich buns and rolls', 'whole wheat tortillas', 'wild rice'],

nuts2: ['almonds', 'almond butter', 'cashews', 'chia seeds'],

dairy:['cheddar', 'Gouda', 'mozzarella', 'muenster', 'parmesan', 'provolone', 'Romano', 'Swiss','brie', 'camembert', 'cottage cheese', 'feta', 'ricotta','milk','american cheese'],

spices:['Coriander Powder', 'Chives', 'Galangal', 'Tulsi', 'Sage', 'Rosemary', 'Yellow Chillies', 'Oregano', 'Nasturtium', 'Salt', 'Mustard Powder', 'Paprika', 'Mint Leaves', 'Marjoram', 'Lemongrass', 'Red Chilli', 'Saffron', 'Dried Fenugreek Leaves','Kashmiri Mirch', 'Onion Seeds', 'Mace', 'Nutmeg', 'Herbs', 'Thyme', 'Turmeric', 'Five Spice Powder', 'Fenugreek Seeds', 'Fennel', 'Green Cardamom', 'Dry Ginger Powder', 'Dill', 'Curry Leaves', 'Cumin Seeds', 'Coriander Seeds', 'Coriander Leaves','Cloves', 'Cinnamon', 'Star Anise', 'Cayenne', 'Caraway Seeds', 'Cajun Spices', 'Rock Salt', 'Black Pepper', 'Black Cumin', 'Bay Leaf', 'Basil', 'Black Cardamom', 'Asafoetida', 'Aniseed', 'Raw Mango Powder', 'Allspice', 'Carom Seeds', 'Parsley','Acacia', 'Carom Seeds', 'Parsley']}

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