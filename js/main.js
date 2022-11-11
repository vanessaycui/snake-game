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
const winningMsgs = ["NEW HIGH SCORE!", "AWESOME!! TOP 10!"];
const controller = {
  ArrowUp: {
    name: "up",
    opp: "down",
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

/*----- Initialization -----*/
initGameBoard();

/*----- app's state (variables) -----*/
let gameOn = false;
let snakeBody = []; //store snake length
let snakeSpeed = initSpeed;
let moveFrames = null; //used to store id from setInterval so we can stop it in reset btn or when player loses
let highScore = 0;
let currentDir = controller.ArrowRight;
let keyQueue = [currentDir];
let userData = { username: "player", playerScore: 0 };
let poisonList = [];
let foodCoord = null;
let boosterCoord = null;
let movements = ["up", "down", "right", "left"];
let randomDir = movements[0];
let intervalCount = 0; //tracks speed of booster

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
const scoreTracker = document.querySelector("#score-tracker");
const pointDisplay = document.querySelector("#num-points");

/*----- Initialization -----*/
randGenDir();
renderHighScores();

/*----- event listeners -----*/
startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  renderGameBoard(event);
  gameOn = true;
  addUsername();
  snakeInit();
  genFood();
  moveFrames = setInterval(executeMove, snakeSpeed);
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  restartGameState();
  restartGameBoard();
  clearInterval(moveFrames);
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

function randGenDir(){//generating random direction for booster, every 6 seconds
  setInterval(() => {
    randomDir = movements[Math.floor(Math.random() * movements.length)];
  }, 1000); 
}

function initGameBoard(){//dynamically creating grid of divs for the gameboard.
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      let square = document.createElement("div");
      square.classList.add("cell");
      square.setAttribute("id", i + "-" + j);
      document.querySelector(".game-board").appendChild(square);
    }
  }
}

function renderGameBoard(event){
  event.target.style.display = "none";
  gameInstruc.style.display = "none";
  usernameInput.style.display = "none";
}

function restartGameBoard(){
  startBtn.style.display = "block";
  usernameInput.style.display = "block";
  usernameInput.value = "";
  gameInstruc.style.display = "block";
  gameOverMsg.style.display = "none";
  playerScoreTxt.innerHTML = "000";
  displayName.innerHTML = userData.username.toUpperCase() + ":";
  gameSqs.forEach((sq) => sq.classList.remove("snake-body", "food", "poison", "super-food"));
  heading.style.backgroundImage =
  "linear-gradient(90deg,var(--maintitle1) 0%,var(--maintitle2) 40%,var(--maintitle1) 50%,var(--maintitle2) 75%,var(--maintitle1)100%)";
  gameBoard.style.borderImage = "none";
  gameBoard.style.animation = "none";
}

function restartGameState(){
  gameOn = false;
  snakeBody = [];
  currentDir = controller.ArrowRight;
  keyQueue = [currentDir];
  snakeSpeed = initSpeed;
  userData.playerScore = 0;
  userData.username = "player";
}

function renderHighScores() {
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
      if (n == 0) {
        list.classList.add("gold-place");
      }
      if (n == 1) {
        list.classList.add("silver-place");
      }
      if (n === 2) {
        list.classList.add("bronze-place");
      }
    }
    highScore = gameData[0].playerScore;
    highScoreTxt.innerHTML = formatData(3, highScore.toString(), "0");
    return gameData;
  }
}

function snakeInit() {//initializing snake body
  for (let i = 0; i < initSnakeLen; i++) {
    let identifier =
      snakeStartPos[0].toString() + "-" + (snakeStartPos[1] - i).toString();
    snakeBody.push([snakeStartPos[0], snakeStartPos[1] - i]);
    document.getElementById(identifier).classList.add("snake-body");
  }
}

function genFood() {//randomly generates food on the board.
  foodCoord = [
    Math.floor(Math.random() * boardSize),
    Math.floor(Math.random() * boardSize),
  ];
  let foodid = foodCoord[0].toString() + "-" + foodCoord[1].toString();
  let foodSq = document.getElementById(foodid);
  foodSq.classList.add("food");
}

function genBooster() {//randomly generates booster on the board.
  let randomNum = Math.floor(Math.random() * 10);
  if (randomNum % 5 === 0 && boosterCoord === null) {
    boosterCoord = [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize),
    ];
    let boosterId =
      boosterCoord[0].toString() + "-" + boosterCoord[1].toString();
    let boosterSq = document.getElementById(boosterId);
    boosterSq.classList.add("super-food");
  }
}

function genPoison() {//randomly generates poison on the board.
  let randomNum = Math.floor(Math.random() * 10);
  if (userData.playerScore > 10 && randomNum % 3 === 0) {
    let randomPos = [
      Math.floor(Math.random() * boardSize),
      Math.floor(Math.random() * boardSize),
    ];
    //ensure it's not overlapping a food
    while (randomPos[0] === foodCoord[0] && randomPos[1]===foodCoord[1]){
      randomPos = [
        Math.floor(Math.random() * boardSize),
        Math.floor(Math.random() * boardSize),
      ];
    }
    poisonList.push(randomPos);
    let poisonid = randomPos[0].toString() + "-" + randomPos[1].toString();
    let poisonSq = document.getElementById(poisonid);
    poisonSq.classList.add("poison");
  }
}

function executeMove() {  //Only listen to the last key pressed, delete everything else.
  while (keyQueue.length !== 1) {
    keyQueue.shift();
  }
  if (currentDir.opp !== keyQueue[0].name) {
    currentDir = keyQueue[0];
    snakeMechanics();
  }
}

function snakeMechanics() {//instructions on how to move
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
  checkPoison(); //ensure there arent too many poison on the board
  //managing speed of booster.
  intervalCount++;
  if (intervalCount % 2 === 0) {
    boosterFoodMechanics();
  }
  if (
    snakeBody[0][0] < 0 ||
    snakeBody[0][0] > boardSize - 1 ||
    snakeBody[0][1] < 0 ||
    snakeBody[0][1] > boardSize - 1 ||
    document
      .getElementById(snakeBody[0].join("-"))
      .classList.contains("snake-body")
  ) {   //stop game when snake head coords surpasses borders or hits its own body
    gameOver();

  } else { //check if snake head has hit food, poison, booster
    document.getElementById(snakeBody[0].join("-")).classList.add("snake-body");
    if (
      document.getElementById(snakeBody[0].join("-")).classList.contains("food")
    ) {
      let tail = snakeBody[end];
      snakeBody.push(tail);
      document.getElementById(snakeBody[0].join("-")).classList.remove("food");
      genFood();
      genPoison();
      genBooster();
      addPoint();
      increaseSpeed();
    }
    if (
      document
        .getElementById(snakeBody[0].join("-"))
        .classList.contains("poison")
    ) {
      document
        .getElementById(snakeBody[0].join("-"))
        .classList.remove("poison");
      genPoison();
      subtractPoint();
    }
    if (
      document
        .getElementById(snakeBody[0].join("-"))
        .classList.contains("super-food")
    ) {
      document
        .getElementById(snakeBody[0].join("-"))
        .classList.remove("super-food");
      boosterCoord = null;
      genBooster();
      boostPoint();
      increaseSpeed();
    }
  }
}

function boosterFoodMechanics() {//mechanics on how booster will randomly move on the board after spawning.
  if (boosterCoord !== null) {
    document
      .getElementById(boosterCoord.join("-"))
      .classList.remove("super-food");
    boosterCoord = [
      direction[randomDir][0] + boosterCoord[0],
      direction[randomDir][1] + boosterCoord[1],
    ];
    if (
      boosterCoord[0] < 0 ||
      boosterCoord[0] > boardSize - 1 ||
      boosterCoord[1] < 0 ||
      boosterCoord[1] > boardSize - 1
    ) {
      boosterCoord = null;
    } else {
      document
        .getElementById(boosterCoord.join("-"))
        .classList.add("super-food");
    }
  }
}

function checkPoison() {//controls number of poison on board.
  if (poisonList.length > 3) {
    let poisonCoord = poisonList.shift();
    let poisonid = poisonCoord[0].toString() + "-" + poisonCoord[1].toString();
    let poisonSq = document.getElementById(poisonid);
    poisonSq.classList.remove("poison");
  }
}

function increaseSpeed() {//mechanics to increase speed.
  if (userData.playerScore % speedChangeFreq === 0) {
    snakeSpeed > minInterval
      ? (snakeSpeed = Math.floor(snakeSpeed * speedChange))
      : (snakeSpeed = minInterval);
    //stop current setInterval and start new
    clearInterval(moveFrames);
    moveFrames = setInterval(executeMove, snakeSpeed);
  }
}

function gameOver() {//instructions on what to do when the game is over.
  clearInterval(moveFrames);
  let topScores = renderHighScores();
  if (highScore < userData.playerScore) {
    newTopScoreUI();
  } else if (userData.playerScore > topScores.pop().playerScore) {
    topTenUI();
  } else {
    noRankUI();
  }
  gameOn = false;
  gameOverMsg.style.display = "block";
  const highScoreListItems = document.querySelectorAll("ol>li");
  highScoreListItems.forEach((list) => highScoreList.removeChild(list));
  updateStorage();
  renderHighScores();
}

function newTopScoreUI() {
  lastMsg.innerHTML = winningMsgs[0];
  lastMsg.style.fontSize = "3rem";
  lastMsg.style.color = "var(--winningmsg)";
  gameBoard.style.borderImage =
    "conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1";
  gameBoard.style.animation = " 1s rotate linear infinite";
  heading.style.backgroundImage =
    "linear-gradient(90deg, red 0%, yellow 10%, lime 20%, aqua 50%, blue 70%, magenta 80%, red 100%)";
}

function topTenUI() {
  lastMsg.innerHTML = winningMsgs[1];
  lastMsg.style.fontSize = "3rem";
  lastMsg.style.color = "var(--winningmsg)";
  gameBoard.style.borderImage =
    "conic-gradient(from var(--angle), var(--topscoretitle1),var(--topscoretitle2), var(--topscoretitle1) ) 1";
  gameBoard.style.animation = " 1s rotate linear infinite";
  heading.style.backgroundImage =
    "linear-gradient(90deg, var(--topscoretitle1) 0%, var(--topscoretitle2) 50%, var(--topscoretitle1) 100%)";
}

function noRankUI() {
  let randomMsgIdx = Math.floor(Math.random() * gameOverMsgs.length);
  lastMsg.innerHTML = gameOverMsgs[randomMsgIdx];
  lastMsg.style.fontSize = "4rem";
  lastMsg.style.color = "var(--gameover)";
  gameBoard.style.borderImage =
    "conic-gradient(from var(--angle), var(--gameover),var(--gameover2), var(--gameover) ) 1";
  gameBoard.style.animation = " 1s rotate linear infinite";
  heading.style.backgroundImage =
    "linear-gradient(90deg, var(--gameover) 0%,var(--gameover2) 50%, var(--gameover) 100%)";
}

function updateStorage() {
  const gameData = JSON.parse(localStorage.getItem("highScoreData"));
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
    //only show top 10 players on the screen
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

function addPoint() {//instructions on what to do when snake eats food.
  userData.playerScore++;
  playerScoreTxt.innerHTML = formatData(3, userData.playerScore, "0");
  gameBoard.classList.add("board-emphasis");
  pointDisplay.innerHTML = "+1";
  pointDisplay.style.left = "130px";
  pointDisplay.style.display = "block";
  setTimeout(() => {
    gameBoard.classList.remove("board-emphasis");
    pointDisplay.style.display = "none"
  }, 1000);
}

function subtractPoint() {//instructions on what to do when snake eats poison.
  userData.playerScore = userData.playerScore -5;
  if (userData.playerScore< 0){
    gameOver()
  } else {
    playerScoreTxt.innerHTML = formatData(3, userData.playerScore, "0");
    gameBoard.classList.add("board-emphasis-poison");
    pointDisplay.style.color = "var(--poisoncolor)"
    pointDisplay.innerHTML = "-5"
    pointDisplay.style.display = "block";
    setTimeout(() => {
      gameBoard.classList.remove("board-emphasis-poison");
      pointDisplay.style.display="none";
      pointDisplay.style.color = "var(--pointdisplay)"
    }, 1000);
  }
}

function boostPoint() {//instructions on what to show when snake eats booster.
  userData.playerScore = userData.playerScore + 10;
  playerScoreTxt.innerHTML = formatData(3, userData.playerScore, "0");
  gameBoard.style.borderImage =
    "conic-gradient(from var(--angle), red, yellow, lime, aqua, blue, magenta, red) 1";
  gameBoard.style.animation = " 1s rotate linear infinite";
  pointDisplay.innerHTML = "+10"
  pointDisplay.style.left = "90px"
  pointDisplay.style.display = "block";

  setTimeout(() => {
    gameBoard.style.borderImage = "none";
    gameBoard.style.animation = "none";
    pointDisplay.style.display = "none";
  }, 1000);
}

function addUsername() {//extract username from input.
  userData.username = usernameInput.value.toUpperCase();
  if (userData.username.length === 0) {
    userData.username = "noname";
  } else {
    displayName.innerHTML =
      formatData(6, userData.username.toUpperCase(), "_") + ":";
  }
}

function formatData(maxLen, value, pad) {//formats names and points on screen.
  let padding = maxLen - value.toString().length;
  let string = "";
  for (let i = 0; i < padding; i++) {
    string = string + pad.toString();
  }
  string = string + value.toString();
  return string;
}
