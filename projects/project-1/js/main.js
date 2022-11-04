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
let currentDir = "right"; //a way to check that player can only go orthogonal dir from current dir.
let snakeSpeed = 500;
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
  setInterval(moveSnake, snakeSpeed)
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startBtn.style.display = "inline";
  gameInstruc.style.display = "block";
  gameOn = false;
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

//section below deals with changing snake direction by changing direction of the head. 
function moveUp() {
  //moving up a row, maintain y-dir.
  let nextPos = [snakeBody[0][0] - 1, snakeBody[0][1]];
  //set head to next Pos
  snakeBody[0] = nextPos;
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
  if (currentDir === "up") {
    //head will continue to keep moving with y values unchanged.
    snakeBody[0] = [snakeBody[0][0] - 1, snakeBody[0][1]];
  } else if (currentDir === "down") {
    //head will continue to keep moving with y values unchanged.
    snakeBody[0] = [snakeBody[0][0] + 1, snakeBody[0][1]];
  } else if (currentDir === "left") {
      //head will continue to keep moving with x values unchanged.
      snakeBody[0] = [snakeBody[0][0], snakeBody[0][1]-1];
  } else if (currentDir === "right") {
      //head will continue to keep moving with x values unchanged.
      snakeBody[0] = [snakeBody[0][0], snakeBody[0][1]+1];
      console.log(snakeBody)
  }
  //make end tail disappear...this is wrong:
  let snakeEnd = snakeBody[snakeBody.length-1].join('-')
  document.getElementById(snakeEnd).classList.remove("snake-body");

  //incrementally moving each element towards the head.
  for (let i = 1; i< snakeBody.length; i++){
    snakeBody[i] = snakeBody[i-1]
  }
  


  snakeBody.forEach((segment) => {
    console.log(segment)
    let snakeSegId = segment.join("-")
    document.getElementById(snakeSegId).classList.add("snake-body");
  })


}



