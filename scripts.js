var combinations = [];
var currentCombination = 0;
var selectionsMap = {};

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

    // add keys to dictionary
    for (var i = 0; i <= list.length - 1; i++) {
        selectionsMap[list[i]] = 0;
    }

    // shuffle list
    shuffle(list);

    // compute combinations
    for (var i = 0; i < list.length - 1; i++) {
        for (var j = i; j < list.length - 1; j++) {
            combinations.push(
                {
                    'first': list[i],
                    'second': list[j+1]
                });
        }
    };

    // shuffle combinations
    shuffle(combinations);

    console.log("There are " + combinations.length + " combinations");

    for (var i = 0; i < combinations.length - 1; i++) {
        console.log(combinations[i].first + 
            ',' + 
            combinations[i].second);
    };

    setImages(currentCombination);
})

function advanceImages(selection) {
    console.log("You selected " + selection);
    if(selectionsMap.hasOwnProperty(selection)) {
        selectionsMap[selection] = selectionsMap[selection] + 1;
    }
    else {
        selectionsMap[selection] = 1;
    }

    currentCombination += 1;

    if(currentCombination < combinations.length) {
        setImages(currentCombination);
    }
    else {
        displaySummary();
    }
}

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

function displaySummary() {
    $("#heading").text("Results");
    $(".selectorContainer").hide();
    $(".progressContainer").hide();
    $(".resultsContainer").show();

    for(var key in selectionsMaap){
      var value = selectionsMap[key];
      console.log(key + ' = ' + value);
      $("#resultsText").append("<p>" + key + " : " + value + "</p>");
    }
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
  }