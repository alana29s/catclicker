$(document).ready(function(){

var model = {
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
            "imageUrl": "http://placekitten.com/350/250",
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
    ],

    getAllCats: function() {
        return this.cats;
    },

    getSingleCat: function(cat) {
        return this.cats[cat];
    },

    catClicked: function(cat) {
        this.cats[cat].clicks ++;
        return this.cats[cat].clicks;
    }
}

var octopus = {
    init: function() {
        viewCatList.init();
        viewCatMain.init();
    },

    getCatsList: function () {
        return model.getAllCats();
    },

    changeCat: function(myCat) {
        //get new cat from model
        var newCat = model.getSingleCat(myCat);

        //send cat and catnumber to view for render
        viewCatMain.render(newCat, myCat);
    },

    catClicked: function(myCat) {
        //update model with click
        var newClickCount = model.catClicked(myCat);

        //call view to update clicks
        viewCatMain.renderClick(newClickCount);
    }
};

var viewCatList = {
        init: function(){
            //create a list of cats by asking octupus for list of cats then display
            var catList = octopus.getCatsList();
            var catsLength = catList.length;
            var catListItem = '<li class="catname" data-catnumber="%catNum">%name</li>';
            for(var i = 0; i < catsLength; i++){
                var newCatListItem = catListItem.replace('%catNum', i).replace('%name', catList[i].name);
                $('#catlist').append(newCatListItem);
            };

            //Setup click
            $('.catname').click(function(){
                //Determine which cat is clicked
                var myCat = $(this).attr('data-catnumber');
                //Now ask octopus to change cat
                octopus.changeCat(myCat);
             });
        }
};

var viewCatMain = {
        init: function() {
            //Ask Octopus for first cats
            var catList = octopus.getCatsList();

            //Helper HTML
            var catDiv = '<div class="cat" data-catnumber="%catNum"><h1>%name</h1><h2>%clicks</h2></div>';
            var catImage = '<img src="%data">';

            //Set initial div to the first cat in the Array
            var newCatDiv = catDiv.replace('%name', catList[0].name).replace('%clicks', catList[0].clicks).replace('%catNum', 0);
            var newCatImage = catImage.replace('%data', catList[0].imageUrl);

            // Now append new html
            $('.main').append(newCatDiv);
            $('.main .cat:last').append(newCatImage);

            //Track clicks when a cat is clicked
            $('.cat').click(function(){
                //First determine which cat was clicked by it's data number
                var myCat = $(this).attr('data-catnumber');
                //Call Octopus to increase clicks
                octopus.catClicked(myCat);
            });
        },

        render: function(cat, catnumber) {
            $('.cat img').attr('src', cat.imageUrl );
            $('.cat h1').html(cat.name);
            $('.cat h2').html(cat.clicks);
            $('.cat').attr('data-catnumber', catnumber);
        },

        renderClick: function(clickCount) {
            $('.cat h2').html(clickCount);
        }
};

octopus.init();

});