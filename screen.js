//document.getElementById("iFrame").style.display = "none";
const com_menuButton = document.getElementById("com_menuButton");
const com_aboutModal = document.getElementById("com_aboutModal");
const com_closeButton = document.getElementsByClassName("close")[0];
const com_minusButton = document.getElementById("com_minusButton");
const com_plusButton = document.getElementById("com_plusButton");
const com_comment = document.getElementById("com_comment");
com_menuButton.onclick = function(){
    com_aboutModal.style.display = "block";
}
com_closeButton.onclick = function(){
    com_aboutModal.style.display = "none";
}
window.onclick = function(event){
    if (event.target == com_aboutModal){
        com_aboutModal.style.display = "none";
    }
}
const ctx = document.getElementById("com_rectangle").getContext("2d");
var levelDiff = 3;
ctx.beginPath();
for (i = 0; i < levelDiff; i++) {
    ctx.lineWidth = "3";
    ctx.strokeStyle = "black";
    ctx.strokeRect(i * 30 + 6, 2, 17, 17);
    ctx.fillStyle = "yellow";
    ctx.fillRect(i * 30 + 7, 3, 15, 15);
}

function diff(number)
{
    if (number < 0)
    levelDiff = Math.max(1, levelDiff + number);
    if (number > 0)
    levelDiff = Math.min(5, levelDiff + 1);
    if (levelDiff == 1) com_comment.innerHTML = "You are noob huh?";
    if (levelDiff == 2) com_comment.innerHTML = "Not bad bruh";
    if (levelDiff == 3) com_comment.innerHTML = "Just normal";
    if (levelDiff == 4) com_comment.innerHTML = "Pretty good";
    if (levelDiff == 5) com_comment.innerHTML = "You are insane dude";
    ctx.beginPath();
    for (i = 0; i < levelDiff; i++) {
        ctx.lineWidth = "3";
        ctx.strokeStyle = "black";
        ctx.strokeRect(i * 30 + 6, 2, 17, 17);
        ctx.beginPath();
        if (levelDiff <= 2) ctx.fillStyle = "green";
        else if (levelDiff <= 4) ctx.fillStyle = "orange";
        else ctx.fillStyle = "red";
        ctx.fillRect(i * 30 + 7, 3, 15, 15);
    }
    for (i = levelDiff; i < 5; i++)
    {
        ctx.clearRect(i * 30 + 4, 0, 21, 20);
    }
}
function startGame()
{
    localStorage.setItem('user_difficult', levelDiff);
}