const board = document.querySelector('.board');
const blockHeight = 50;
const blockWidth = 50;

const startButton = document.querySelector(".btn-start");
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");
const highScoreElement = document.querySelector("#high-score")
const scoreElement = document.querySelector("#score")
const timeElement = document.querySelector("#time")

const blocks = [];


let score = 0
let time = 0
let highScore = `00-00`

let snake = [{x: 1,y: 3}];

let direction = "down";
let intervalId = null;
let food = {x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${col}-${row}`] = block;
    }
}

function render() {
    let head = null;
    if (direction === "left") {head = {x: snake[0].x - 1,y: snake[0].y};
    } else if (direction === "right") {head = {x: snake[0].x + 1,y: snake[0].y};
    } else if (direction === "up") {head = {x: snake[0].x,y: snake[0].y - 1};
    } else if (direction === "down") {
        head = {
            x: snake[0].x,
            y: snake[0].y + 1
        };
    }

    // Correct boundary check
    if (
        head.x < 0 ||
        head.x >= cols ||
        head.y < 0 ||
        head.y >= rows
    ) {
        clearInterval(intervalId);

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";

        return;
    }

    // Remove old snake drawing
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`]?.classList.remove("fill");
    });

    let ateFood = false;

    // Food consume logic
    if (head.x === food.x && head.y === food.y) {

        ateFood = true;

        score += 10
        
        if (score > highScore) {
    highScore = score;
}

scoreElement.innerText = score;
highScoreElement.innerText = highScore;



        blocks[`${food.x}-${food.y}`]?.classList.remove("food");

        food = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows)
        };
    }

    
    // Move snake
    snake.unshift(head);

    // Only remove tail if food NOT eaten
    if (!ateFood) {
        snake.pop();
    }

    // Draw snake
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`]?.classList.add("fill");
    });

    // Draw food
    blocks[`${food.x}-${food.y}`]?.classList.add("food");

}

// intervalId = setInterval(() => {
//     render();
// }, 300);

startButton.addEventListener("click", () => {
    modal.style.display = "none";

    clearInterval(intervalId);

    intervalId = setInterval(() => {
        render();
    }, 300);
});

restartButton.addEventListener("click", restartGame);

function restartGame() {

    clearInterval(intervalId);
    blocks[`${food.x}-${food.y}`]?.classList.remove("food");
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`]?.classList.remove("fill");
    });
    modal.style.display = "none";
    direction = "down";
    snake = [{x: 1,y: 3}];
    food = {x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows)};
    intervalId = setInterval(() => {render();}, 300);
}

addEventListener("keydown", (event) => {

    if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }

});