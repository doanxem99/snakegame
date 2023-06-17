var ctx = document.getElementById("com_territory");
var ctxdraw = ctx.getContext("2d");
var playButton = document.getElementById("com_playButton");
var velocity = 15;
var dirx = -1;
var diry = 0;
var running = false;
var snake = [];
var food;
var levelUp = false;
var clearBoard = false;
var user_score = 0;
var dash = true;
var difficult = 75;
function startGame(){
    if (playButton.innerHTML == "PAUSE") playButton.innerHTML = "CONTINUE", running = false;
    else if (playButton.innerHTML == "CONTINUE") running = true, runGame(), playButton.innerHTML = "PAUSE";
    else {
        difficult = Number(localStorage.getItem('user_difficult'));
        velocity = velocity + difficult;
        difficult = 60 - 10 * difficult;
        document.getElementById("user_over").style.display = "none";
        playButton.innerHTML = "PAUSE";
        running = true;
        user_score = 0;
        document.getElementById("user_score").innerHTML = `SCORE: ${user_score}`;
        createCharacter();
        createFood();
        runGame();
    }
}
function resetGame(){
    running = false;
    if (playButton.innerHTML != "AGAIN?") playButton.innerHTML = "PLAY";
    clearBoard = true;
}
function gameOver(){
    document.getElementById("user_over").style.display = "block";
    playButton.innerHTML = "AGAIN?";
    resetGame();
}
function createCharacter()
{
    snake = [];
    snake.push({type: "head", posx: ctx.clientWidth / 2, posy: ctx.clientHeight / 2, radius:10, wind: 1, numwind: 0});
    snake.push({type: "mouth", posx: ctx.clientWidth / 2, posy: ctx.clientHeight / 2, width: 7, height: 12});
    snake.push({type: "eye1", posx: ctx.clientWidth / 2, posy: ctx.clientHeight / 2, radius: 1.5});
    snake.push({type: "eye2", posx: ctx.clientWidth / 2, posy: ctx.clientHeight / 2, radius: 1.5});
    //snake.push({type: "body", posx: ctx.clientWidth / 2 - 20, posy: ctx.clientHeight / 2, width: 20, height: 20});
    /*if (dirx > 0)
             calcFace(20, 4, 18, 5, 18, 15);
        else if (dirx < 0)
            calcFace(0, 4, 2, 5, 2, 15);
        else if (diry > 0)
              calcFace(4, 20, 5, 18, 15, 18);
        else if (diry < 0)
              calcFace(4, -20, 5, -18, 15, -18);*/
}
function createFood()
{
    var pox, poy;
    let ok = true;
    do{
        pox = Math.floor(Math.random() * ctx.clientWidth + 1);
        poy = Math.floor(Math.random() * ctx.clientHeight + 1);
        
        ok = true;
        for (i = 0; i < snake.length; i++)
            if (pox >= snake[i].posx && pox <= snake[i].posx + 15 && poy >= snake[i].posy && poy <= snake[i].posy + 15) {
                ok = false;
                break;
            }
    }
    while(ok == false);
    food = {posx : pox, posy : poy};
}
function runGame(){
    if (running) {
        setTimeout(()=>{
            moveSnake();
            drawCanvas();
            runGame();
        }, difficult);
    }
}
var pre1 = {x: 0, y: 0}, pre2 = {x: 0, y: 0};
function moveSnake()
{
    for (i = 0; i < snake.length; i++)
        if (snake[i].type == "head"){
            pre1 = {x : snake[i].posx, y : snake[i].posy};
            snake[i].posx += velocity * dirx + 1 * snake[i].wind * diry;
            snake[i].posy += velocity * diry + 1 * snake[i].wind * dirx;
            if (snake[i].posx > ctx.width) snake[i].posx = 0;
            if (snake[i].posx < 0) snake[i].posx = ctx.width;
            if (snake[i].posy > ctx.height) snake[i].posy = 0;
            if (snake[i].posy < 0) snake[i].posy = ctx.height;
            if (snake[i].wind == 1 && ++snake[i].numwind == 3) snake[i].wind = -1;
            else if (snake[i].wind == -1 && --snake[i].numwind == -3) snake[i].wind = 1;  
        }
        else 
        if (snake[i].type == "body"){
            pre2 = {x : snake[i].posx, y : snake[i].posy};
            snake[i].posx = pre1.x;
            snake[i].posy = pre1.y;
            pre1 = pre2;
        }
        else if (i == 1) {
            if (dirx > 0)
                calcFace(10, -6, 8, -5, 8, 5), snake[1].width = 7, snake[1].height = 12;
            else if (dirx < 0)
                calcFace(-17, -6, -8, -5, -8, 5), snake[1].width = 7, snake[1].height = 12;
            else if (diry > 0)
                calcFace(-6, 10, -5, 8, 5, 8), snake[1].width = 12, snake[1].height = 7;
            else if (diry < 0)
                calcFace(-6, -17, -5, -8, 5, -8), snake[1].width = 12, snake[1].height = 7;
            
            if ((dirx > 0 && checkEatting(7, 0, 7, 12)) || ((dirx < 0) && checkEatting(0, 0, 0, 12)) 
                || ((diry < 0) && checkEatting(0, 0, 7, 0)) || ((diry > 0) && checkEatting(0, 7, 12, 7))) levelUp = true;
        }     
    if (levelUp)
        snake.push({type: "body", posx: pre1.x, posy: pre1.y, radius:10}), 
        document.getElementById("user_score").innerHTML = `SCORE: ${++user_score}`;
    if (!dash && velocity > 10) velocity--;
}
function checkEatting(x1, y1, x2, y2)
{
    for (j = 4; j < snake.length; j++)
            if ((snake[1].posx + x1 >= snake[j].posx - 10 && snake[1].posx + x1 <= snake[j].posx + 10
                && snake[1].posy + y1 >= snake[j].posy - 10 && snake[1].posy + y1 <= snake[j].posy + 10) || 
                (snake[1].posx + x2 >= snake[j].posx - 10 && snake[1].posx + x2 <= snake[j].posx + 10
                    && snake[1].posy + y2 >= snake[j].posy - 10 && snake[1].posy + y2 <= snake[j].posy + 10))
                        gameOver();
    if ((snake[1].posx + x1 >= food.posx - 10 && snake[1].posx + x1 <= food.posx + 10
        && snake[1].posy + y1 >= food.posy - 10 && snake[1].posy + y1 <= food.posy + 10) || 
        (snake[1].posx + x2 >= food.posx - 10 && snake[1].posx + x2 <= food.posx + 10
            && snake[1].posy + y2 >= food.posy - 10 && snake[1].posy + y2 <= food.posy + 10))
                return true;
    return false;
}
function calcFace(xmo, ymo, xe1, ye1, xe2, ye2)
{
    snake[1].posx = xmo + snake[0].posx;
    snake[1].posy = ymo + snake[0].posy;
    snake[2].posx = xe1 + snake[0].posx;
    snake[2].posy = ye1 + snake[0].posy;
    snake[3].posx = xe2 + snake[0].posx;
    snake[3].posy = ye2 + snake[0].posy;
}
var eraseMouth = false;
var erasepx = 0, erasepy = 0;
function drawCanvas(){
    ctxdraw.beginPath();
    ctxdraw.clearRect(0, 0, ctx.width, ctx.height);
    if (levelUp){
        levelUp = false;
        createFood();
    }
    for (i = 0; i < snake.length; i++)
    {
        if (snake[i].type == "eye1" || snake[i].type == "eye2"){
            ctxdraw.beginPath();
            ctxdraw.fillStyle = "black";
            ctxdraw.fill();
            ctxdraw.arc(snake[i].posx, snake[i].posy, snake[i].radius, 0, 2 * Math.PI);
            ctxdraw.stroke();
        }else if (snake[i].type == "head"){
            ctxdraw.beginPath();
            ctxdraw.arc(snake[i].posx, snake[i].posy, snake[i].radius, 0, 2 * Math.PI);
            ctxdraw.fillStyle = "red";
            ctxdraw.fill();
            ctxdraw.stroke();
        } else if (snake[i].type == "body"){
            ctxdraw.beginPath();
            ctxdraw.arc(snake[i].posx, snake[i].posy, snake[i].radius, 0, 2 * Math.PI);
            ctxdraw.fillStyle = "green";
            ctxdraw.fill();
            ctxdraw.stroke();
        }
    }
    ctxdraw.beginPath();
    ctxdraw.fillStyle = "red";
    ctxdraw.fillRect(snake[1].posx, snake[1].posy, snake[1].width, snake[1].height);
    //ctxdraw.stroke();
    ctxdraw.beginPath();
    ctxdraw.arc(food.posx, food.posy, 10, 0, 2 * Math.PI, false);
    ctxdraw.fillStyle = "orange";
    ctxdraw.fill();
    ctxdraw.lineWidth = 0;
    ctxdraw.stroke();
}
window.addEventListener("keydown", changeDirection);
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const SHIFT = 16;
    let redirx;
    let rediry;
    if (dirx != 0 || diry != 0) redirx = dirx, rediry = diry;
    dirx = (keyPressed == LEFT) ? -1 : (keyPressed == RIGHT ? 1 : 0);
    diry = (keyPressed == UP) ? -1 : (keyPressed == DOWN ? 1 : 0);
    if (dirx == 0 && diry == 0 && !dash) dirx = redirx, diry = rediry;
    if ((dirx != 0 && dirx == redirx * -1) || (diry != 0 && diry == rediry * -1)) dirx = redirx, diry = rediry;
    if (keyPressed == SHIFT) velocity = Math.min(++velocity, 100), dash = true;
    else dash = false;
}