/*----- constants -----*/
const boardSize = 30;
const initSnakeLen = 3;
const snakeStartPos = [14, 14]; //center of board
const direction = {
  up: [-1, 0],
  down: [1, 0],
  left: [0, -1],
  right: [0, 1],
};
const initSpeed = 90;
const speedChange = 0.90;
const speedChangeFreq = 10;
const minInterval = 5;
const gameOverMsgs = ["TRY AGAIN", "GAME OVER"]
const newHighScoreMsgs= ["NEW HIGH SCORE"]
//dynamically creating grid of divs for the gameboard.
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
let controller = { //track key presses; might expand this later. //might be in const...
  ArrowUp: {name: "up", opp: "down", doThis: function () {changeDir(this.opp,this.name)}},
  ArrowDown: {name: "down", opp:"up",doThis: function () {changeDir(this.opp,this.name)}},
  ArrowLeft:{name: "left", opp: "right", doThis: function () {changeDir(this.opp,this.name)}},
  ArrowRight:{name: "right", opp: "left", doThis: function (){changeDir(this.opp, this.name)}}
}
let snakeSpeed = initSpeed;
let gameStart = null; //used to store id from setInterval so we can stop it in reset btn or when player loses
let highScore = 0;
let playerScore = 0;
let currentDir = controller.ArrowRight; //a way to check that player can only go orthogonal dir from current dir.
let keyQueue = [currentDir];

/*----- cached element references -----*/
const startBtn = document.querySelector("#start-btn");
const resetBtn = document.querySelector("#reset-btn");
const gameBoard = document.querySelector(".game-board");
const gameSqs = document.querySelectorAll("div");
const gameInstruc = document.querySelector(".game-board >p");
const gameOverMsg = document.querySelector("#game-over-msg");
const lastMsg = document.querySelector("#game-over-msg >p");
const heading = document.querySelector("h1");
const playerScoreTxt = document.querySelector("#player-score");
const highScoreTxt = document.querySelector("#high-score");

/*----- event listeners -----*/
startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.target.style.display = "none";
  gameInstruc.style.display = "none";
  gameOn = true;
  snakeInit();
  genFood();
  gameStart = setInterval(executeMove, snakeSpeed);
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startBtn.style.display = "inline";
  gameInstruc.style.display = "block";
  gameOn = false;
  snakeBody = [];
  currentDir = controller.ArrowRight;
  keyQueue= [currentDir]
  snakeSpeed = initSpeed;
  playerScore = 0;
  playerScoreTxt.innerHTML = '000';
  clearInterval(gameStart);
  gameSqs.forEach((sq) => sq.classList.remove("snake-body", "food"));
  gameOverMsg.style.display = "none";
  heading.style.backgroundImage = "linear-gradient(90deg,var(--snakebody) 0%,var(--itembg) 40%,var(--snakebody) 50%,var(--itembg) 75%,var(--snakebody)100%)"
});

//only listen for arrow keys if the game is on
document.addEventListener("keydown", (event) => {
//changes direction of snake based on key presses. 
//if arrow keys are pressed more than once within setInterval time, 
//it will be added to the key Queue. keys to be executed in sequential order.
  if (controller[event.key] && gameOn) {
    if (currentDir.opp !== controller[event.key].name){
      keyQueue.push(controller[event.key])
    }
  } 
});

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
  let randomPos = [Math.floor(Math.random() * boardSize),Math.floor(Math.random() * boardSize)];
  
  while (snakeBody.some(arr => arr === randomPos)) { //make sure food doesnt spawn on snake body
    randomPos = [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize),
    ];
  }
  let foodid = randomPos[0].toString() + "-" + randomPos[1].toString();
  let foodSq = document.getElementById(foodid)
  foodSq.classList.add("food");
}

function executeMove(){
  //Only listen to the last key pressed, delete everything else. 
  while (keyQueue.length !== 1){
    keyQueue.shift()
  }
  if (currentDir.opp !== keyQueue[0].name){
    currentDir=keyQueue[0]
    snakeMechanics()
  }
}

//instructions on how to move
function snakeMechanics() {
  let end = snakeBody.length - 1; //remove snake-body class from tail
  document.getElementById(snakeBody[end].join("-")).classList.remove("snake-body");
  for (let i = end; i > 0; i--) { //incrementally equate current element to prev element
    snakeBody[i] = snakeBody[i - 1];
  }
  //modify head coordinate to direction snake is currently moving
  snakeBody[0] = [direction[currentDir.name][0] + snakeBody[0][0],direction[currentDir.name][1] + snakeBody[0][1]];
  
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
      addPoint()
      //change speed every 10 points;
      if (playerScore%10 === 0) {
        increaseSpeed()
      }
    }
  }
}

function increaseSpeed() {
  snakeSpeed > minInterval ? snakeSpeed = Math.floor(snakeSpeed*speedChange) :  snakeSpeed = minInterval
  //stop current setInterval and start new
  console.log(snakeSpeed)
  clearInterval(gameStart)
  gameStart = setInterval(executeMove, snakeSpeed)
}

//instructions on what to do when the game is over.
function gameOver(){
  console.log("lol u suck")
  clearInterval(gameStart)
  if (highScore === playerScore && highScore !== 0){
    let randomMsgIdx = Math.floor(Math.random()*newHighScoreMsgs.length);
    lastMsg.innerHTML = newHighScoreMsgs[0]
    lastMsg.style.fontSize = "3rem";
    lastMsg.style.color="var(--instructions)";
  } else {
    let randomMsgIdx = Math.floor(Math.random()*gameOverMsgs.length);
    lastMsg.innerHTML = gameOverMsgs[randomMsgIdx];
    lastMsg.style.fontSize = "4rem";
    lastMsg.style.color="var(--gameover)";
  }
  gameOn = false;
  gameOverMsg.style.display = "block";
  heading.style.backgroundImage = "linear-gradient(90deg, var(--snakebody) 0%,var(--snakebody) 100%)";
}
//instructions on what to do when snake eats food.
function addPoint(){
  playerScore++
  if (playerScore> highScore){
    highScore= playerScore;
    let padding = 3-highScore.toString().length;
    let scoreTxt = ''
    for (let i=0; i<padding; i++){
      scoreTxt = scoreTxt + '0'    
    }
    scoreTxt = scoreTxt+highScore.toString()
    highScoreTxt.innerHTML = scoreTxt;
  }
  let padding = 3-playerScore.toString().length;
  let scoreTxt = ''
  for (let i=0; i<padding; i++){
    scoreTxt = scoreTxt + '0'    
  }
  scoreTxt = scoreTxt+playerScore.toString()
  playerScoreTxt.innerHTML = scoreTxt;
}

//random gen food colors!
//add celebratory css when hitting high score.
//high score panel to disappear in small screens.

