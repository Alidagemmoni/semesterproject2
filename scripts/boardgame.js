var characterScore = 0;
var characterScoreDisplay = document.getElementById("characterScoreDisplay");

var selectedCharacter = localStorage.getItem("player");

// remove spaces and make lowercase
var characterClass = selectedCharacter.toLowerCase().replace(" ", "-");

var characterDisplay = document.getElementById("characterDisplay");
characterDisplay.innerHTML = selectedCharacter;
characterDisplay.classList.add(characterClass);

var token = document.getElementById("token");
token.classList.add(characterClass);

characterScoreDisplay.innerHTML = characterScore;

// get the dice element
var dice = document.getElementById("dice");

// add a click listener to the dice
dice.addEventListener("click", function() {

    var diceRoll = Math.floor(Math.random() * 6) + 1;

    updateScore(diceRoll);
    moveToken();

    // create a class for the dice
    var diceClass = "dice" + diceRoll;

    // clear all classes on the dice
    this.classList = ""

    // add the dice class
    this.classList.add(diceClass);

    // we set the innerHTML of the button to what the random number is
    this.innerHTML = diceRoll;

});

function updateScore(newRoll) {
    // add the new dice rolll to the character score
    characterScore = characterScore + newRoll;
    updateScoreDisplay(characterScore);
}

function updateScoreDisplay(newScore) {
    // display the new score
    characterScoreDisplay.innerHTML = newScore;
}

function moveToken() {
    // get all the tiles
    var tiles = document.querySelectorAll(".tile");

    // total number of tiles
    var totalTiles = tiles.length;
    
    // check if token has gone past total
    // if it has, go back
    if (characterScore > totalTiles - 1) {
        var scorePastTotal = characterScore - (totalTiles - 1);
        var recalculateScore = totalTiles - scorePastTotal;
        characterScore = recalculateScore;
        updateScoreDisplay(characterScore);
    }

    // this is to loop through all the tiles and clear the token from them
    tiles.forEach(function(tile, indexOfTile) {
        //these are the elements inside the tile
        var elementsInsideTile = tile.childNodes;

        // loop through the elements to check if #token is inside it
        elementsInsideTile.forEach(function(element) {
            // if token is inside, remove it
            if (element.id === "token") {
                element.remove();
            }
        });
    });

    // get the tile that has an id that is the current score
    var theTile = document.getElementById(characterScore);

    // create teh token
    var tokenOne = document.createElement("div");
    tokenOne.classList.add("token", characterClass);
    tokenOne.id = "token";

    // add the token to the tiel
    theTile.appendChild(tokenOne);

    // if the score is equal to the last tile the game is won
    if (characterScore === totalTiles - 1) {
        // go to winners page
        window.location.href = "winner.html";
    }

}