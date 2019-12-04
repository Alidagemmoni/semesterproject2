//10 API´s
/*var johnSnow = "https://anapioficeandfire.com/api/characters/583";
var aryaStark = "https://www.anapioficeandfire.com/api/characters/148";
var daenerys= "https://anapioficeandfire.com/api/characters/1303 ";
var rhaegar= "https://www.anapioficeandfire.com/api/characters/867 ";
var obara = "https://anapioficeandfire.com/api/characters/1768 ";
var nymeria = "https://anapioficeandfire.com/api/characters/1766";
var ygritte= "https://www.anapioficeandfire.com/api/characters/2126";
var tormund= "https://www.anapioficeandfire.com/api/characters/2024";
var theon= "https://anapioficeandfire.com/api/characters/1022";
var asha= "https://anapioficeandfire.com/api/characters/150";
*/
//Connect to API

function getCharacter(characterId, elementId, imageName) {

    const url = "https://anapioficeandfire.com/api/characters/" + characterId;

    fetch(url)
        .then(result => result.json())
        .then((res) => {
            createCard(res);
        })
        .catch(err => console.log(err));

    function createCard(result){
        var details = document.getElementById(elementId);

        details.innerHTML = `<div class="card">
                                
                                <div class="card__details">
                                    <span>Name: ${result.name}</span>
                                </div>
                                <div class="card__details">
                                    <span>Gender: ${result.gender}</span>
                                </div>
                                <div class="card__details">
                                    <span>Culture: ${result.culture}</span>
                                </div>
                            </div>`;
    }
}

getCharacter(583, "johnSnow", "image-name");
getCharacter(148, "aryaStark", "image-name");
getCharacter(1303, "daenerys", "image-name");
getCharacter(867, "rhaegar", "image-name");
getCharacter(1768, "obara", "image-name");
getCharacter(1766, "nymeria", "image-name");
getCharacter(2126, "ygritte", "image-name");
getCharacter(2024, "tormund", "image-name");
getCharacter(1022, "theon", "image-name");
getCharacter(150, "asha", "image-name");

//Click event on class="characters"
const characters = document.querySelectorAll(".character");

characters.forEach(function(character) {
    character.addEventListener("click", function() {
        console.log(this.id)
    });
});

//Selection page/Index
var player1 = null;
var player2 = null;
var playButton = document.getElementById("playButton");

var allCharacters = document.querySelectorAll(".selection-item");

allCharacters.forEach(function(character) {
    character.addEventListener("click", function() {

        var nameOfCharacter = this.dataset.name;

        if(this.classList.contains("selected-player1")) {
            this.classList.remove("selected-player1");
            player1 = null;
            displaySelectedCharacter("player1", null);
            localStorage.removeItem("player1");
        }
        else if(this.classList.contains("selected-player2")) {
            this.classList.remove("selected-player2");
            player2 = null;
            displaySelectedCharacter("player2", null);
            localStorage.removeItem("player2");
        }
        else {
            if(player1 !== null && player2 !== null) {
                return;
            }

            if(player1 === null) {
                this.classList.add("selected-player1");
                player1 = nameOfCharacter;
                displaySelectedCharacter("player1", nameOfCharacter);
                localStorage.setItem("player1", nameOfCharacter)
            }
            else {
                this.classList.add("selected-player2");
                player2 = nameOfCharacter;
                displaySelectedCharacter("player2", nameOfCharacter);
                localStorage.setItem("player2", nameOfCharacter)
            }
        }

        togglePlayButton();
    })
})


function displaySelectedCharacter(player, character) {
    var thePlayer = document.getElementById(player);
    if(character === null) {
        character = "Player not selected"
    }
    thePlayer.innerHTML = character;
}

function savePlayerToStorage(player, character) {
    localStorage.setItem(player, character)
}

function removePlayerFromStorage(player) {
    localStorage.removeItem(player)
}

function togglePlayButton() {
    if(player1 !== null && player2 !== null) {
        playButton.disabled = false;
    }
    else {
        playButton.disabled = true;
    }
}

playButton.addEventListener("click", function() {
    window.location.href = "game.html";
});

//Selector 
var player = null;
var startButton = document.getElementById("startButton");

var allPlayers = document.querySelectorAll(".player");

allPlayers.forEach(function(playerCard){
    
    playerCard.addEventListener("click", function() {

        var characterName = this.dataset.name;

        var selectedPlayerDisplay = document.getElementById("selectedPlayer");
        
        // clicking an already selected character
        if(this.classList.contains("selected-player")) {
            this.classList.remove("selected-player");
            player = null;            
        }
        else {

            // remove selected-player class from all cards
            allPlayers.forEach(function(playerCard) {
                playerCard.classList.remove("selected-player");
            });

            // add selected-player class to the clicked card
            this.classList.add("selected-player");
            player = characterName;            
        }

        
        if(player === null) {
            selectedPlayerDisplay.innerHTML = "Select your player";
            localStorage.removeItem("player");
            startButton.disabled = true;
        }
        else {
            selectedPlayerDisplay.innerHTML = characterName;
            localStorage.setItem("player", characterName);
            startButton.disabled = false;
        }        
    });

})

startButton.addEventListener("click", function() {
    window.location.href = "game.html";
})