var player = localStorage.getItem("player");

console.log(player);


var playerDisplay = document.getElementById("player");
playerDisplay.innerHTML = player;