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
        },
                {
            "name": "gray baby",
            "imageUrl": "http://placekitten.com/250/250",
            "clicks": 0
        },
                {
            "name": "tabby",
            "imageUrl": "http://placekitten.com/285/250",
            "clicks": 0
        },
                {
            "name": "tiger",
            "imageUrl": "http://placekitten.com/325/365",
            "clicks": 0
        }
    ]
}

// Helper HTML
var catDiv = '<div class="cat" data-catnumber="%catNum"><h1>%name</h1><h2>%clicks</h2></div>';
var catImage = '<img src="%data">';
var catListItem = '<li class="catname" data-catnumber="%catNum">%name</li>';

$(document).ready(function(){
    //loop through animals object and append divs.
    var catsLength = animals.cats.length;

    // Now these are hidden by default in CSS
    for(var i = 0; i < catsLength; i++){
        // First using helper variables replace names
        var newCatDiv = catDiv.replace('%name', animals.cats[i].name).replace('%clicks', animals.cats[i].clicks).replace('%catNum', i);
        var newCatImage = catImage.replace('%data', animals.cats[i].imageUrl);
        // Now append new html
        $('.main').append(newCatDiv);
        $('.main .cat:last').append(newCatImage);
    };


    //create a list of cats
    for(var i = 0; i < catsLength; i++){
        var newCatListItem = catListItem.replace('%catNum', i).replace('%name', animals.cats[i].name);
        $('#catlist').append(newCatListItem);
    };


    //Track clicks when a cat is clicked
    $('.cat').click(function(){
        // First determine which cat was clicked by it's data number
        var myCat = $(this).data('catnumber');
        // Using the datan number construct the jQuery selector
        var catSelector = '.cat[data-catnumber="' + myCat + '"] h2';
        // Get the current click count and change it into an integer
        var currentClick = parseInt($(catSelector).html());
        // Update the click count by 1
        $(catSelector).html(currentClick + 1);
    });

    $('.catname').click(function(){
        // Get data id from this list item
        var myCat = $(this).data('catnumber');
        // now ceate the div cat selector
        var catSelector = '.cat[data-catnumber="' + myCat + '"]';
        // first hide all cats
        $('.cat').css('display', 'none');
        // now show the selected cat
        $(catSelector).css('display', 'block');
    });
});