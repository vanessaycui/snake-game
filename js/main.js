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
const winningMsgs = ["NEW TOP SCORE!", "TOP 10!"];
const controller = {
  ArrowUp: {
    name: "up",
    opp: "down"
  },
  ArrowDown: {
    name: "down",
    opp: "up",
  },
  ArrowLeft: {
    name: "left",
    opp: "right",
  },
  ArrowRight: {
    name: "right",
    opp: "left",
  },
};
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
let snakeSpeed = initSpeed;
let gameStart = null; //used to store id from setInterval so we can stop it in reset btn or when player loses
let highScore = 0;
let currentDir = controller.ArrowRight; 
let keyQueue = [currentDir];
let userData = { username: "player", playerScore: 0 };
let poisonList=[];

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
const highScoreList = document.querySelector("#high-score-list");
const scoreTracker = document.querySelector('#score-tracker')

/*----- Initialization -----*/


retrieveHighScores();

/*----- event listeners -----*/
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
  gameSqs.forEach((sq) => sq.classList.remove("snake-body", "food", "poison"));
  heading.style.backgroundImage =
    "linear-gradient(90deg,var(--maintitle1) 0%,var(--maintitle2) 40%,var(--maintitle1) 50%,var(--maintitle2) 75%,var(--maintitle1)100%)";
  gameBoard.style.borderImage="none";
  gameBoard.style.animation= "none";
  });

//only listen for arrow keys if the game is on
document.addEventListener("keydown", (event) => {
  //if arrow keys are pressed more than once within setInterval time, it will be added to the key Queue.
  if (controller[event.key] && gameOn) {
    event.preventDefault();
    if (currentDir.opp !== controller[event.key].name) {
      keyQueue.push(controller[event.key]);
    }
  }
});

/*----- functions -----*/
//retrieve score data from localStorage
function retrieveHighScores() {
  const gameData = JSON.parse(localStorage.getItem("highScoreData")); //browser local storage
  if (gameData === null) {
    console.log("no local data");
    for (let n = 0; n < 10; n++) {
      const list = document.createElement("li");
      let fontSize = 20 - n;
      list.innerHTML = `${formatData(2, n + 1, "0")}. ______ 000`;
      list.style.fontSize = `${fontSize}px`;
      highScoreList.appendChild(list);
    }
    highScore = 0;
  } else {
    //sort game Data
    for (let n = 0; n < gameData.length; n++) {
      const list = document.createElement("li");
      let fontSize = 20 - n;
      list.innerHTML = `${formatData(2, n + 1, "0")}. ${formatData(
        6,
        gameData[n].username,
        "_"
      )} ${formatData(3, gameData[n].playerScore, "0")}`;
      list.style.fontSize = `${fontSize}px`;
      highScoreList.appendChild(list);
      if (n == 0){
        list.classList.add('gold-place')
      }
      if (n == 1){
        list.classList.add('silver-place')
      }
      if (n===2){
        list.classList.add('bronze-place')
      }
    }
    highScore = gameData[0].playerScore;
    highScoreTxt.innerHTML = formatData(3, highScore.toString(), "0");

    return gameData
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
  let foodid = randomPos[0].toString() + "-" + randomPos[1].toString();
  let foodSq = document.getElementById(foodid);
  foodSq.classList.add("food");
}

//randomly generates poison on the board.
function genPoison() {
  if (userData.playerScore > 10){
    let randomPos = [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize),
    ];
    poisonList.push(randomPos)
    let poisonid = randomPos[0].toString() + "-" + randomPos[1].toString();
    let poisonSq = document.getElementById(poisonid);
    poisonSq.classList.add("poison");
  }
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

  checkPoison()
  
  //stop game when snake head coords surpasses borders or hits its own body
  if (
    snakeBody[0][0] < 0 ||
    snakeBody[0][0] > boardSize - 1 ||
    snakeBody[0][1] < 0 ||
    snakeBody[0][1] > boardSize - 1 ||
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
      genPoison();
      addPoint();
      increaseSpeed();
    }
    if (
      document.getElementById(snakeBody[0].join("-")).classList.contains("poison")
    ) {
      document.getElementById(snakeBody[0].join("-")).classList.remove("poison");
      genPoison();
      subtractPoint();
    }
  }
}

function checkPoison(){
  if (poisonList.length > 2){
    let poisonCoord = poisonList.shift()
    let poisonid = poisonCoord[0].toString() + "-" + poisonCoord[1].toString();
    let poisonSq = document.getElementById(poisonid);
    poisonSq.classList.remove("poison");

  }
}

function increaseSpeed() {
  if (userData.playerScore % speedChangeFreq === 0 ){
    snakeSpeed > minInterval
      ? (snakeSpeed = Math.floor(snakeSpeed * speedChange))
      : (snakeSpeed = minInterval);
    //stop current setInterval and start new
    clearInterval(gameStart);
    gameStart = setInterval(executeMove, snakeSpeed);
  }
}

//instructions on what to do when the game is over.
function gameOver() {
  clearInterval(gameStart);
  let topScores = retrieveHighScores();
  if (highScore < userData.playerScore) {
    //let randomMsgIdx = Math.floor(Math.random() * newHighScoreMsgs.length);
    newTopScoreUI()
  } else if (userData.playerScore > topScores.pop().playerScore ){
    topTenUI()
  } else {
    noRankUI()
  }
  gameOn = false;
  gameOverMsg.style.display = "block";
  const highScoreListItems = document.querySelectorAll("ol>li");
  highScoreListItems.forEach((list) => highScoreList.removeChild(list));
  addToStorage();
  retrieveHighScores();
}

function newTopScoreUI(){
  lastMsg.innerHTML = winningMsgs[0];
  lastMsg.style.fontSize = "3rem";
  lastMsg.style.color = "var(--winningmsg)";
  gameBoard.style.borderImage="conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1";
  gameBoard.style.animation=" 1s rotate linear infinite";
  heading.style.backgroundImage = "linear-gradient(90deg, red 0%, yellow 10%, lime 20%, aqua 50%, blue 70%, magenta 80%, red 100%)";

}

function topTenUI(){
  lastMsg.innerHTML = winningMsgs[1];
  lastMsg.style.fontSize = "3rem";
  lastMsg.style.color = "var(--winningmsg)";
  gameBoard.style.borderImage="conic-gradient(from var(--angle), #0D7377,#00D1CD, #FFFFFF,#00D1CD, #0D7377 ) 1";
  gameBoard.style.animation=" 1s rotate linear infinite";
  heading.style.backgroundImage = "linear-gradient(90deg, #0D7377 0%,#00D1CD 20% , #FFFFFF 50%,#00D1CD 70%, #0D7377 100%)";

}

function noRankUI(){
  let randomMsgIdx = Math.floor(Math.random() * gameOverMsgs.length);
  lastMsg.innerHTML = gameOverMsgs[randomMsgIdx];
  lastMsg.style.fontSize = "4rem";
  lastMsg.style.color = "var(--gameover)";
  gameBoard.style.borderImage="conic-gradient(from var(--angle), #F30067,#FAEEE7, #F30067 ) 1";
  gameBoard.style.animation=" 1s rotate linear infinite";
  heading.style.backgroundImage = "linear-gradient(90deg, #F30067 0%,#FAEEE7 50%, #F30067 100%)";
}

function addToStorage() {
  const gameData = JSON.parse(localStorage.getItem("highScoreData")); //browser local storage
  if (gameData === null) {
    const newData = [
      userData,
      { username: "------", playerScore: 0 },
      { username: "------", playerScore: 0 },
      { username: "------", playerScore: 0 },
      { username: "------", playerScore: 0 },
      { username: "------", playerScore: 0 },
      { username: "------", playerScore: 0 },
      { username: "------", playerScore: 0 },
      { username: "------", playerScore: 0 },
      { username: "------", playerScore: 0 },
    ];
    localStorage.setItem("highScoreData", JSON.stringify(newData));
  } else {
    //only show top 10
    gameData.push(userData);
    gameData.sort((a, b) => {
      const playerA = a.playerScore;
      const playerB = b.playerScore;
      return playerB - playerA;
    });
    if (gameData.length > 10) {
      gameData.splice(10, gameData.length - 10);
    }
    localStorage.setItem("highScoreData", JSON.stringify(gameData));
  }
}

//instructions on what to do when snake eats food.
function addPoint() {
  userData.playerScore++;
  playerScoreTxt.innerHTML = formatData(3, userData.playerScore, "0");
  gameBoard.classList.add("board-emphasis")

  setTimeout(()=>{
    gameBoard.classList.remove("board-emphasis")
  },1000)
}

//instructions on what to do when snake eats poison.
function subtractPoint() {
  userData.playerScore = Math.floor(userData.playerScore*0.9);
  playerScoreTxt.innerHTML = formatData(3, userData.playerScore, "0");
  gameBoard.classList.add("board-emphasis-poison")

  setTimeout(()=>{
    gameBoard.classList.remove("board-emphasis-poison")
  },1000)
}

//extract username from input box
function addUsername() {
  userData.username = usernameInput.value.toUpperCase();
  if (userData.username.length === 0) {
    userData.username = "noname";
  } else {
    displayName.innerHTML =
      formatData(6, userData.username.toUpperCase(), "_") + ":";
  }
}

function formatData(maxLen, value, pad) {
  let padding = maxLen - value.toString().length;
  let string = "";
  for (let i = 0; i < padding; i++) {
    string = string + pad.toString();
  }
  string = string + value.toString();
  return string;
}

//score to be more simulating: pulsate ONCE, diff colour when snaske eats food.
//frantic music as you get higher level
//poisonous food
