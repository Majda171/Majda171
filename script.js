// board
let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;
let score = 0; // start score
let restartBtn = document.querySelector("#restart");

window.onload = function () {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); // for drawing on the board
    placeFood();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1500 / 10);
    document.getElementById('score').innerText = "Score: " + score;
    restartBtn.addEventListener("click", restartGame);
}

function update() {
    if (gameOver) {
        return; // Pokud je hra ukončena, nevykonávej žádné další akce
    }
    if (snakeX == foodX && snakeY == foodY) {
        increaseScore(); // increase score
        snakeBody.push([foodX, foodY])
        placeFood();
    }
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);
    context.fillStyle = "brown"; // barva pro jídlo
    context.fillRect(foodX, foodY, blockSize, blockSize)
    context.fillStyle = "greenyellow"; // barva pro hada
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
    //game over conditions
    if (snakeX < 0 || snakeX > cols * blockSize || snakeY < 0 || snakeY > rows * blockSize) {
        gameOver = true;
        document.getElementById('gameOver').innerHTML = "Game Over!";
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            document.getElementById('gameOver').innerHTML = "Game Over!";
        }
    }
}

// snake
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];

//food
let foodX;
let foodY;

let gameOver = false;

// Fce for change direction snake
function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Fce for food random palce
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Fce incerase score
function increaseScore() {
    score++;
    document.getElementById('score').innerText = "Score: " + score; // actual score
}

// Fce new game
function restartGame() {
    score = 0;
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    document.getElementById('score').innerText = "Score: " + score;
    document.getElementById('gameOver').innerText = "";
    placeFood();
}
