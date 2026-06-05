const board = document.querySelector('.board');
const blockHeight = 50
const blockWidth = 50

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight)

const blocks = [];
const snake =[{
    x: 1, y: 3 
    }]

let direction = "down"
let intervalId = null ;
for (let row=0; row < rows ; row++) {
    for (let col=0; col < cols ; col++) {
    const block = document.createElement('div')
    block.classList.add("block")
    board.appendChild(block);
    blocks[`${col}-${row}`] = block; 
    }
}

function render() {
        snake.forEach(segment=> {
        blocks[`${segment.y}-${segment.x}` ].classList.add("fill")
        })
}

intervalId = setInterval(() => {

    let head = null

    if (direction === "left") {
        head = { x: snake[ 0 ].x, y: snake[ 0 ].y-1 }
    } else if (direction === "right") {
        head = { x: snake[ 0 ].x, y: snake[ 0 ].y+1 }
    } else if (direction === "up") {
        head = {x : snake[0].x-1, y: snake[0].y}
    } else if (direction === "down" ) {
        head = {x: snake[0].x+1, y:snake[0].y}
    }

    if (head.x <0 || head.x >= rows || head.y < 0 || head.y>= cols) {
        alert("Game Over")
        clearInterval(intervalId)
    }

    snake.forEach(segment=> {
    blocks[`${segment.y}-${segment.x}` ].classList.remove("fill")
    })

    snake.unshift(head)
    snake.pop()
    render()
}, 300);

addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") {
        direction = "up"
    } else if (event.key == "ArrowDown") {
        direction = "down"
    } else if (event.key == "ArrowRight") {
        direction = "right"
    } else if (event.key == "ArrowLeft") {
        direction = "left"
    }
})
