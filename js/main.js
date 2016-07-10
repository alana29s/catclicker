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
    },

    currentCat: function(cat) {
        return this.cats[cat];
    }
}

var octopus = {
    init: function() {
        viewCatList.init();
        viewCatMain.init();
        viewAdmin.init();
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
    },

    currentCat: function(myCat) {
        return model.currentCat(myCat);

    },

    updateCat: function(newName, newImageURL, newClicks,myCat){
        model.cats[myCat].name = newName;
        model.cats[myCat].imageUrl = newImageURL;
        model.cats[myCat].clicks = newClicks;
        octopus.changeCat(myCat);
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
            $('.main').prepend(newCatDiv);
            $('.main .cat').append(newCatImage);

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

var viewAdmin = {
        init: function (){
            // add event listeners to show admin area
            $('#adminbutton').click(function(){
                $('.admin').css('display', 'block');
                //now I need currently selected cat
                var myCat = $('.cat').attr('data-catnumber');
                //now call octopus to get the current cat object
                var currentCat = octopus.currentCat(myCat);
                // now fill in fields
                $('input[name="catname"]').val(currentCat.name);
                $('input[name="imageurl"]').val(currentCat.imageUrl);
                $('input[name="clicks"]').val(currentCat.clicks);
                $('input[name="catidentifier"]').val(myCat);
            });

            // add event listeners to hide admin area
            $('#cancelbutton').click(function(){
                $('.admin').css('display', 'none');
            });

            //add submit event listener
            $('.admin').submit(function(event) {
                console.log('submit clicked');
                event.preventDefault();

                // now get values and send to octopus
                var newName = $('input[name="catname"]').val();
                var newImageURL = $('input[name="imageurl"]').val();
                var newClicks = $('input[name="clicks"]').val();
                var newCat = $('input[name="catidentifier"]').val();
                octopus.updateCat(newName, newImageURL, newClicks,newCat)

                //also update cat list with new name
                $('.catname[data-catnumber="'+ newCat +'"]').html(newName);
                //hide admin area
                $('.admin').css('display', 'none');
            });
        }
};

octopus.init();

});