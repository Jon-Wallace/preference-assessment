var combinations = [];
var current = 0;
var dictionary = {};

function setImages(index) {
    var combination = combinations[index];
    $('#leftHidden').attr('value', combination.first);
    $('#leftSelector').attr('src', 'images/' + 
        combination.first + '.png');

    $('#rightHidden').attr('value', combination.second);
    $('#rightSelector').attr('src', 'images/' + 
        combination.second + '.png');

    $(".progressContainer").text(
        (index + 1) + " of " + combinations.length);
}

function advanceImages(selection) {
    if(dictionary.hasOwnProperty(selection)) {
        dictionary[selection] = dictionary[selection] + 1;
    }
    else {
        dictionary[selection] = 1;
    }

    current = current + 1;

    if(current < combinations.length) {
        setImages(current);
    }
    else {
        displaySummary();
    }
}

function displaySummary() {
    $("#heading").text("Results");
    $(".selectorContainer").hide();
    $(".progressContainer").hide();
    $(".resultsContainer").show();

    for(var key in dictionary){
      var value = dictionary[key];
      console.log(key + ' = ' + value);
      $("#resultsText").append("<p>" + key + " : " + value + "</p>");
    }
}

$(function(){
    
    $("#leftSelector").click(function() {
        var selection = $("#leftHidden").val();
        advanceImages(selection);
    });

    $("#rightSelector").click(function() {
        var selection = $("#rightHidden").val();
        advanceImages(selection);
    });

    $("#restartButton").click(function() {
        location.reload();
    });

    var list = [
        'basketball', 
        'computer-time',
        'donut',
        'games',
        'goldfish',
        'oreo',
        'pretzels',
        'scratch-book',
        'skittles'
        ];

    for (var i = 0; i <= list.length - 1; i++) {
        dictionary[list[i]] = 0;
    }

    for (var i = 0; i < list.length - 1; i++) {
        for (var j = i; j < list.length - 1; j++) {
            combinations.push(
                {
                    'first': list[i],
                    'second': list[j+1]
                });
        }
    };

    console.log(combinations.length);

    for (var i = 0; i < combinations.length - 1; i++) {
        console.log(combinations[i].first + 
            ',' + 
            combinations[i].second);
    };

    setImages(current);
})

