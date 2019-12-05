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



//Selection page/Index
var player = null;
var selectedPlayer = document.getElementById("selectedPlayer");
var startButton = document.getElementById("startButton");

console.log("playButton", startButton);


//Click event on class="characters"
const characters = document.querySelectorAll(".character");

characters.forEach(function(character) {

    character.addEventListener("click", function() {

        // get character name from data- attribute
        var characterName = this.dataset.name;

        player = characterName;
        selectedPlayer.innerHTML = player;

        localStorage.setItem("player", player);

        if(player !== null) {
            startButton.disabled = false;
        }
        else {
            startButton.disabled = true;
        }        
    });

});

startButton.addEventListener("click", function() {
    window.location.href = "boardgame.html";
})