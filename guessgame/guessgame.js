let com_Guess = 0, score = 0;
com_Guess = Math.floor(Math.random() * 10);
console.log(com_Guess);
document.getElementById("user_Submit").onclick = function(){
    let tmp = document.getElementById("user_Guess").value
    tmp = Number(tmp);
    console.log(tmp);
    if (tmp > com_Guess) 
    {
        document.getElementById("com_Comment").textContent = "Your number is upper than answer";
    } else
    if (tmp < com_Guess)
    {
        document.getElementById("com_Comment").textContent = "Your number is lower than answer";
    } else
    if (tmp == com_Guess)
    {
        com_Guess = Math.floor(Math.random() * 10);
        document.getElementById("com_Comment").textContent = "You are correct";
        document.getElementById("com_Score").textContent = `Your score is: ${++score}`;
    }
    document.getElementById("user_Guess").value = null;
}
document.getElementById("user_Reset").onclick = function(){
    com_Guess = Math.floor(Math.random() * 10);
    score = 0;
    document.getElementById("com_Comment").textContent = "This game reseted";
    document.getElementById("com_Score").textContent = `Your score is: ${score}`;
    window.setTimeout(function(){
        document.getElementById("com_Comment").textContent = "Hello Player";}, 1000)
}
