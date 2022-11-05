//rendering game board, adding id number to square for reference purposes
/*----- constants -----*/
let boardSize = 30;
let initSnakeLen = 3;
let snakeStartPos = [14, 14];
let direction = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};


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
let currentDir = "right"; //a way to check that player can only go orthogonal dir from current dir.
let snakeSpeed = 100;
let gameStart = null; //used to store id from setInterval so we can stop it in reset btn or you lose.

/*----- cached element references -----*/
let startBtn = document.querySelector("#start-btn");
let resetBtn = document.querySelector("#reset-btn");
let gameBoard = document.querySelector(".game-board");
let gameSqs = document.querySelectorAll("div");
let gameInstruc = document.querySelector(".game-board >p");

/*----- event listeners -----*/
startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.target.style.display = "none";
  gameInstruc.style.display = "none";
  gameOn = true;
  snakeInit();
  genFood();
  gameStart = setInterval(moveSnake, snakeSpeed);
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startBtn.style.display = "inline";
  gameInstruc.style.display = "block";
  gameOn = false;
  snakeBody = [];
  currentDir = "right";
  snakeSpeed = 500;
  clearInterval(gameStart);
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

//initializing snake body
function snakeInit() {
  for (let i = 0; i < initSnakeLen; i++) {
    let identifier =
      snakeStartPos[0].toString() + "-" + (snakeStartPos[1] - i).toString();
    snakeBody.push([snakeStartPos[0], snakeStartPos[1] - i]);
    document.getElementById(identifier).classList.add("snake-body");
  }
}

//randomly generates food on the board.
function genFood() {
  let randomPos = [
    Math.floor(Math.random() * boardSize),
    Math.floor(Math.random() * boardSize),
  ];
  //make sure food doesnt spawn on snake body.
  while (snakeBody.includes(randomPos)) {
    randomPos = [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize),
    ];
  }
  //display food on board.
  let foodid = randomPos[0].toString() + "-" + randomPos[1].toString();
  document.getElementById(foodid).classList.add("food");
}

//section below deals with changing snake direction by changing direction of the head.
function moveUp() {
  //moving up a row, maintain y-dir.
  let nextPos = [snakeBody[0][0] - 1, snakeBody[0][1]];
  //set head to next Pos
  currentDir = "up";
  console.log("moving up");
}

function moveDown() {
  let nextPos = [snakeBody[0][0] + 1, snakeBody[0][1]];
  currentDir = "down";
  console.log("moving down");
}

function moveLeft() {
  let nextPos = [snakeBody[0][0], snakeBody[0][1] - 1];
  currentDir = "left";
  console.log("moving left");
}

function moveRight() {
  let nextPos = [snakeBody[0][0], snakeBody[0][1] + 1];
  currentDir = "right";
  console.log("moving right");
}

//deals with moving the snake only. cb function for the setInterval higher-order function.
function moveSnake() {
  let end = snakeBody.length - 1;
  document.getElementById(snakeBody[end].join("-")).classList.remove("snake-body");
  for (let i = end; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [direction[currentDir][0] + snakeBody[0][0],direction[currentDir][1] + snakeBody[0][1]];
  
  //stop game when snake hits borders 
  if (snakeBody[0][0]<0 || snakeBody[0][0]>boardSize-1 || snakeBody[0][1]<0 || snakeBody[0][1]>boardSize-1 ){
    console.log("ahh")
    clearInterval(gameStart)
  } else {

    //check if snake hit itself before adding class.
    document.getElementById(snakeBody[0].join("-")).classList.add("snake-body");
    console.log(snakeBody[0])
  }

  //stop game when snake hits itself

}
