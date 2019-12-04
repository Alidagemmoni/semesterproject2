var character1Score = 0;
var characterScoreDisplay = document.getElementById("characterScoreDisplay");

var player = localStorage.getItem("player");

var playerDisplay = document.getElementById("player");
playerDisplay.innerHTML = player;

var token = document.getElementById("token");
token.classList.add(player);

characterScoreDisplay.innerHTML = character1Score;

// get the dice element
var dice = document.getElementById("dice");

// add a click listener to the dice
dice.addEventListener("click", function() {
    //inside a function the "this" keyword refers to the element the function is running on
    // in this case it is the dice element
    // we need to store it so we can use it in the setTimeout function
    var theDice = this;

    // change the inner HTML
    theDice.innerHTML = "Rolling...";
    // add a class
    theDice.classList.add("rolling");

    //setTimeout function waits x amount of milliseconds before running the code inside the function
    setTimeout(function() {
        // we use some built-in JS maths function to get a number between 1 and 6
        var diceRoll = Math.floor(Math.random() * 6) + 1;

        updateScore(diceRoll);
        moveToken();

        // create a class for the dice
        var diceClass = "dice" + diceRoll;

        // clear all classes on the dice
        theDice.classList = ""

        // add the dice class
        theDice.classList.add(diceClass);

        // we set the innerHTML of the button to what the random number is
        theDice.innerHTML = diceRoll;
        // remove the class
        theDice.classList.remove("rolling");
    }, 500); // this is the amount of milliseconds we are waiting
});

function updateScore(newRoll) {
    // add the new dice rolll to the character score
    character1Score = character1Score + newRoll;
    updateScoreDisplay(character1Score);
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

    console.log("totalTiles", totalTiles);
    

    // check if token has gone past total
    // if it has, go back
    if (character1Score > totalTiles - 1) {
        var scorePastTotal = character1Score - (totalTiles - 1);
        var recalculateScore = totalTiles - scorePastTotal;
        character1Score = recalculateScore;
        updateScoreDisplay(character1Score);
    }

    tiles.forEach(function(tile, indexOfTile) {
        //these are the elements inside the tile
        var elementsInsideTile = tile.childNodes;

        // loop through the elements to check if #token1 is inside it
        elementsInsideTile.forEach(function(element) {
            // if token1 is inside, remove it
            if (element.id === "token") {
                element.remove();
            }
        });

        //chcek if the score (-1) matches the tile
        // if it does, append the token element
        if (indexOfTile === character1Score) {
            // make the token element
            var tokenOne = document.createElement("div");
            tokenOne.classList.add("token", player);
            tokenOne.id = "token";

            tile.appendChild(tokenOne);

            // check if token is on the last tile
            if (character1Score === totalTiles - 1) {
                // go to winners page

                window.location.href = "winner.html";
            }
        }
    });

}
