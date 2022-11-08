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
const speedChange = 0.9;
const speedChangeFreq = 10;
const minInterval = 5;
const gameOverMsgs = ["TRY AGAIN", "GAME OVER"];
const newHighScoreMsgs = ["NEW HIGH SCORE"];
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
let snakeBody = []; //store snake length
let controller = {
  //track key presses; might expand this later. //might be in const...
  ArrowUp: {
    name: "up",
    opp: "down",
    doThis: function () {
      changeDir(this.opp, this.name);
    },
  },
  ArrowDown: {
    name: "down",
    opp: "up",
    doThis: function () {
      changeDir(this.opp, this.name);
    },
  },
  ArrowLeft: {
    name: "left",
    opp: "right",
    doThis: function () {
      changeDir(this.opp, this.name);
    },
  },
  ArrowRight: {
    name: "right",
    opp: "left",
    doThis: function () {
      changeDir(this.opp, this.name);
    },
  },
};
let snakeSpeed = initSpeed;
let gameStart = null; //used to store id from setInterval so we can stop it in reset btn or when player loses
let highScore = 0;
let currentDir = controller.ArrowRight; //a way to check that player can only go orthogonal dir from current dir.
let keyQueue = [currentDir];
let userData = { username: "player", playerScore: 0 };

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
const usernameInput = document.querySelector("#username");
const displayName = document.querySelector("#player-name");
const highScoreList = document.querySelector('#high-score-list');


/*----- event listeners -----*/
retrieveHighScores()

startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.target.style.display = "none";
  gameInstruc.style.display = "none";
  usernameInput.style.display = "none";
  gameOn = true;
  addUsername();
  snakeInit();
  genFood();
  gameStart = setInterval(executeMove, snakeSpeed);
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startBtn.style.display = "block";
  usernameInput.style.display = "block";
  usernameInput.value = "";
  gameInstruc.style.display = "block";
  gameOverMsg.style.display = "none";
  gameOn = false;
  snakeBody = [];
  currentDir = controller.ArrowRight;
  keyQueue = [currentDir];
  snakeSpeed = initSpeed;
  userData.playerScore = 0;
  userData.username = "player";
  playerScoreTxt.innerHTML = "000";
  displayName.innerHTML = userData.username.toUpperCase() + ":";
  clearInterval(gameStart);
  gameSqs.forEach((sq) => sq.classList.remove("snake-body", "food"));
  heading.style.backgroundImage =
    "linear-gradient(90deg,var(--snakebody) 0%,var(--itembg) 40%,var(--snakebody) 50%,var(--itembg) 75%,var(--snakebody)100%)";
});

//only listen for arrow keys if the game is on
document.addEventListener("keydown", (event) => {
  //if arrow keys are pressed more than once within setInterval time, it will be added to the key Queue. 
  if (controller[event.key] && gameOn) {
    if (currentDir.opp !== controller[event.key].name) {
      keyQueue.push(controller[event.key]);
    }
  }
});

/*----- functions -----*/
//retrieve score data from localStorage
function retrieveHighScores(){
  const gameData = JSON.parse(localStorage.getItem("highScoreData")) //browser local storage
  if (gameData === null){
    console.log('no local data')
    highScore = 0;
  } else {
    //sort game Data
    gameData.sort((a,b)=>{
      const playerA = a.playerScore;
      const playerB = b.playerScore;
      return playerB - playerA
    })
    //formatting player score for display.
    
    for (let n = 0; n<gameData.length; n++){

      let padding = 3 - gameData[n].playerScore.toString().length;
      let scorePadding = "";
      for (let i = 0; i < padding; i++) {
        scorePadding= scorePadding + "0";
      }
      const list = document.createElement('li');
      let listNum = "";
      if (n<9){
        listNum = "0"+(n+1).toString()
      } else {
        listNum = (n+1).toString()
      }
      let fontSize = 20-n;
      list.innerHTML = `${listNum}. ${gameData[n].username} -- ${scorePadding}${gameData[n].playerScore}` 
      list.style.fontSize = `${fontSize}px`
      highScoreList.appendChild(list)
    }
    highScore = gameData[0].playerScore;
    let padding = 3 - highScore.toString().length;
    let scoreTxt = "";
    for (let i = 0; i < padding; i++) {
      scoreTxt = scoreTxt + "0";
    }
    scoreTxt = scoreTxt + highScore.toString();
    highScoreTxt.innerHTML = scoreTxt;
  }
}
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

  while (snakeBody.some((arr) => arr === randomPos)) {
    //make sure food doesnt spawn on snake body
    randomPos = [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize),
    ];
  }
  let foodid = randomPos[0].toString() + "-" + randomPos[1].toString();
  let foodSq = document.getElementById(foodid);
  foodSq.classList.add("food");
}

function executeMove() {
  //Only listen to the last key pressed, delete everything else.
  while (keyQueue.length !== 1) {
    keyQueue.shift();
  }
  if (currentDir.opp !== keyQueue[0].name) {
    currentDir = keyQueue[0];
    snakeMechanics();
  }
}

//instructions on how to move
function snakeMechanics() {
  let end = snakeBody.length - 1; //remove snake-body class from tail
  document
    .getElementById(snakeBody[end].join("-"))
    .classList.remove("snake-body");
  for (let i = end; i > 0; i--) {
    //incrementally equate current element to prev element
    snakeBody[i] = snakeBody[i - 1];
  }
  //modify head coordinate to direction snake is currently moving
  snakeBody[0] = [
    direction[currentDir.name][0] + snakeBody[0][0],
    direction[currentDir.name][1] + snakeBody[0][1],
  ];

  //stop game when snake head coords surpasses borders
  if (
    snakeBody[0][0] < 0 ||
    snakeBody[0][0] > boardSize - 1 ||
    snakeBody[0][1] < 0 ||
    snakeBody[0][1] > boardSize - 1
  ) {
    gameOver();
    //check if snake head has hit its own body
  } else if (
    document
      .getElementById(snakeBody[0].join("-"))
      .classList.contains("snake-body")
  ) {
    gameOver();
    //check if snake head has hit food item
  } else {
    document.getElementById(snakeBody[0].join("-")).classList.add("snake-body");

    if (
      document.getElementById(snakeBody[0].join("-")).classList.contains("food")
    ) {
      let tail = snakeBody[end];
      snakeBody.push(tail);
      document.getElementById(snakeBody[0].join("-")).classList.remove("food");
      genFood();
      addPoint();
      //change speed every 10 points;
      if (userData.playerScore % 10 === 0) {
        increaseSpeed();
      }
    }
  }
}

function increaseSpeed() {
  snakeSpeed > minInterval
    ? (snakeSpeed = Math.floor(snakeSpeed * speedChange))
    : (snakeSpeed = minInterval);
  //stop current setInterval and start new
  console.log(snakeSpeed);
  clearInterval(gameStart);
  gameStart = setInterval(executeMove, snakeSpeed);
}

//instructions on what to do when the game is over.
function gameOver() {
  console.log("lol u suck");
  clearInterval(gameStart);
  if (highScore === userData.playerScore && highScore !== 0) {
    //let randomMsgIdx = Math.floor(Math.random() * newHighScoreMsgs.length);
    lastMsg.innerHTML = newHighScoreMsgs[0];
    lastMsg.style.fontSize = "3rem";
    lastMsg.style.color = "var(--instructions)";
  } else {
    let randomMsgIdx = Math.floor(Math.random() * gameOverMsgs.length);
    lastMsg.innerHTML = gameOverMsgs[randomMsgIdx];
    lastMsg.style.fontSize = "4rem";
    lastMsg.style.color = "var(--gameover)";
  }
  gameOn = false;
  gameOverMsg.style.display = "block";
  heading.style.backgroundImage =
    "linear-gradient(90deg, var(--snakebody) 0%,var(--snakebody) 100%)";
  addToStorage()
  const highScoreListItems = document.querySelectorAll('ol>li');
  console.log(highScoreListItems)
  highScoreListItems.forEach(list => highScoreList.removeChild(list))
  retrieveHighScores()
}

function addToStorage(){
  const gameData = JSON.parse(localStorage.getItem("highScoreData")) //browser local storage
  if (gameData === null){
    const newData = [userData, {username: "------", playerScore: 0}, {username: "------", playerScore: 0}]
    localStorage.setItem("highScoreData", JSON.stringify(newData));
  } else {
      //only show top 10
      gameData.push(userData)
      gameData.sort((a,b)=>{
        const playerA = a.playerScore;
        const playerB = b.playerScore;
        return playerB - playerA
      })
      if (gameData.length >10){
        gameData.splice(10, (gameData.length-10))
      }
      localStorage.setItem("highScoreData", JSON.stringify(gameData));
  }
}

//instructions on what to do when snake eats food.
function addPoint() {
  userData.playerScore++;
  let padding = 3 - userData.playerScore.toString().length;
  let scoreTxt = "";
  for (let i = 0; i < padding; i++) {
    scoreTxt = scoreTxt + "0";
  }
  scoreTxt = scoreTxt + userData.playerScore.toString();
  playerScoreTxt.innerHTML = scoreTxt;
}

function addUsername() {
  userData.username = usernameInput.value;
  if (userData.username.length === 0) {
    userData.username = "PLAYER";
  } else {
    let padding = 6 - userData.username.length;
    let userPadding = "";
    for (let i = 0; i < padding; i++) {
      userPadding = userPadding + "_";
    }
    userData.username = userPadding + usernameInput.value.toUpperCase();
    displayName.innerHTML = userData.username.toUpperCase() + ":";
  }
}

function formatNumbers(){

}
//add celebratory css when hitting high score.
//add firebase backend to store highscore data for this project.
//score to be more simulating: pulsate, vibrate, flash, etc.
//indicator for when snake eats food
//frantic music as you get higher level
//poisonous food
