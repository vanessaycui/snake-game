//rendering game board, adding id number to square for reference purposes
/*----- constants -----*/
let boardSize = 30;
let initSnakeLen = 3;
let snakeStartPos = [14, 14]; //center of board
let direction = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};
let initSpeed = 80;
let speedChange = 0.90;
let minInterval = 5;

//dynamically creating divs
for (let i = 0; i < boardSize; i++) {
  for (let j = 0; j < boardSize; j++) {
    let square = document.createElement("div");
    square.classList.add("cell");
    square.setAttribute("id", i + "-" + j);
    document.querySelector(".game-board").appendChild(square);
  }
}

/*----- app's state (variables) -----*/
let gameOn = false;
let snakeBody = [];//store snake length
let currentDir = "right"; //a way to check that player can only go orthogonal dir from current dir.
let snakeSpeed = initSpeed;
let gameStart = null; //used to store id from setInterval so we can stop it in reset btn or when player loses

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
  snakeSpeed = initSpeed;
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
  while (snakeBody.includes(randomPos)) { //make sure food doesnt spawn on snake body
    randomPos = [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize),
    ];
  }
  let foodid = randomPos[0].toString() + "-" + randomPos[1].toString();
  document.getElementById(foodid).classList.add("food");
}
function moveUp() {
  if (currentDir !=="down"){
    let nextPos = [snakeBody[0][0]-1, snakeBody[0][1]];
    currentDir = "up";
    console.log("moving up");
  }
}
function moveDown() {
  if (currentDir !== "up"){
    let nextPos = [snakeBody[0][0]+1, snakeBody[0][1]];
    currentDir = "down";
    console.log("moving down");
  }
}
function moveLeft() {
  if (currentDir !== "right"){
    let nextPos = [snakeBody[0][0], snakeBody[0][1]-1];
    currentDir = "left";
    console.log("moving left");
  }
}
function moveRight() {
  if (currentDir !== "left"){
    let nextPos = [snakeBody[0][0], snakeBody[0][1+1]];
    currentDir = "right";
    console.log("moving right");
  }
}
//deals with moving the snake only. this is the cb for setInterval
function moveSnake() {
  let end = snakeBody.length - 1; //remove snake-body class from tail
  document.getElementById(snakeBody[end].join("-")).classList.remove("snake-body");
  for (let i = end; i > 0; i--) { //incrementally equate current element to prev element
    snakeBody[i] = snakeBody[i - 1];
  }
  //modify head coordinate to direction snake is currently moving
  snakeBody[0] = [direction[currentDir][0] + snakeBody[0][0],direction[currentDir][1] + snakeBody[0][1]];
  
  //stop game when snake head coords surpasses borders
  if (snakeBody[0][0]<0 || snakeBody[0][0]>boardSize-1 || snakeBody[0][1]<0 || snakeBody[0][1]>boardSize-1 ){
    gameOver()
  //check if snake head has hit its own body
  } else if (document.getElementById(snakeBody[0].join("-")).classList.contains("snake-body")){
    gameOver()
    //check if snake head has hit food item
  } else {
    document.getElementById(snakeBody[0].join("-")).classList.add("snake-body")
    
    if (document.getElementById(snakeBody[0].join("-")).classList.contains("food")) {
      let tail = snakeBody[end]
      snakeBody.push(tail)
      document.getElementById(snakeBody[0].join("-")).classList.remove("food")
      genFood()
      snakeSpeed > minInterval ? snakeSpeed = Math.floor(snakeSpeed*speedChange) :  snakeSpeed = minInterval
      //stop current setInterval and start new
      console.log(snakeSpeed)
      clearInterval(gameStart)
      gameStart = setInterval(moveSnake, snakeSpeed)
    }
  }
}

function gameOver(){
  console.log("lol u suck")
  clearInterval(gameStart)
  gameOn = false;

}
//delay registering keys to matcxh setInterval? throttle...
//food count num %5 or something to increase speed.
