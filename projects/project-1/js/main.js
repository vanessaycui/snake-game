//rendering game board, adding id number to square for reference purposes
/*----- constants -----*/
let boardSize = 30;
let initSnakeLen = 3;
let snakeStartPos = [14, 14];

//creating boardMatrix (2D array) AND creating divs
//don't know if i need boardMatrix yet. might delete.
let boardMatrix = [];
for (let x = 0; x < boardSize; x++) {
  let rowArr = [];
  for (let y = 0; y < boardSize; y++) {
    rowArr.push(0);
    let square = document.createElement("div");
    square.classList.add("cell");
    square.setAttribute("id", x + "-" + y);
    document.querySelector(".game-board").appendChild(square);
  }
  boardMatrix.push(rowArr);
}

/*----- app's state (variables) -----*/
let gameOn = false;
let snakeBody = [];
let snakeHead = snakeBody[0];

/*----- cached element references -----*/
let startBtn = document.querySelector("#start-btn");
let resetBtn = document.querySelector("#reset-btn");
let gameBoard = document.querySelector(".game-board");
let gameSqs = document.querySelectorAll("div");
let gameInstruc = document.querySelector(".game-board >p")

/*----- event listeners -----*/

startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.target.style.display = "none";
  gameInstruc.style.display="none";
  gameOn = true;
  snakeInit();
  genFood();
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startBtn.style.display = "inline";
  gameInstruc.style.display="block";
  gameOn = false;

  //reset board.
  gameSqs.forEach((sq) => sq.classList.remove("snake-body", "food"));
});

//only listen for arrow keys if the game is on
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowUp" && gameOn) {
    moveUp();
  } else if (event.key === "ArrowDown" && gameOn) {
    moveDown();
  } else if (event.key === "ArrowLeft" && gameOn) {
    moveLeft();
  } else if (event.key === "ArrowRight" && gameOn) {
    moveRight();
  }
});

// //check div populated properly
// gameBoard.addEventListener("click", function (event) {
//   if (event.target.nodeName === 'DIV'){
//     console.dir(event.target)
//   }
// });

/*----- functions -----*/

function snakeInit() {
  for (let i = 0; i < initSnakeLen; i++) {
    let identifier =
      snakeStartPos[0].toString() + "-" + (snakeStartPos[1] - i).toString();
    snakeBody.push([snakeStartPos[0], snakeStartPos[1] - i]);
    document.getElementById(identifier).classList.add("snake-body");
  }
}

function genFood() {
  let randomPos = [
    Math.floor(Math.random() * 30),
    Math.floor(Math.random() * 30),
  ];
  //make sure food doesnt spawn on snake body.
  while (snakeBody.includes(randomPos)) {
    randomPos = [
      Math.floor(Math.random() * 30),
      Math.floor(Math.random() * 30),
    ];
  }
  //display food on board.
  let foodid = randomPos[0].toString() + "-" + randomPos[1].toString();
  document.getElementById(foodid).classList.add("food");
}

function moveUp() {
  console.log("moving up");
}

function moveDown() {
  console.log("moving down");
}

function moveLeft() {
  console.log("moving left");
}

function moveRight() {
  console.log("moving right");
}
