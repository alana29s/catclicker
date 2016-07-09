var animals = {
    "cats": [
        {
            "name": "poofy",
            "imageUrl": "http://placekitten.com/200/300",
            "clicks": 0
        },
        {
            "name": "fluffy",
            "imageUrl": "http://placekitten.com/300/200",
            "clicks": 0
        }
    ]
}

// Helper HTML
var catDiv = '<div class="cat" data-catnumber="%catNum"><h1>%name</h1><h2>%clicks</h2></div>';
var catImage = '<img src="%data">';

$(document).ready(function(){
    //loop through animals object and append divs.
    var catsLength = animals.cats.length;
    for(var i = 0; i < catsLength; i++){
        // First using helper variables replace names
        var newCatDiv = catDiv.replace('%name', animals.cats[i].name).replace('%clicks', animals.cats[i].clicks).replace('%catNum', i);
        var newCatImage = catImage.replace('%data', animals.cats[i].imageUrl);
        // Now append new html
        $('.main').append(newCatDiv);
        $('.main .cat:last').append(newCatImage);
    };


    //Track clicks when a cat is clicked
    jQuery('.cat').click(function(){
        // First determine which cat was clicked by it's data number
        var myCat = $(this).data('catnumber');
        // Using the datan number construct the jQuery selector
        var catSelector = '.cat[data-catnumber="' + myCat + '"] h2';
        // Get the current click count and change it into an integer
        var currentClick = parseInt($(catSelector).html());
        // Update the click count by 1
        $(catSelector).html(currentClick + 1);
    });
});