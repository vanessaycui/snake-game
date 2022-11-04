//rendering game board, adding id number to square for reference purposes
/*----- constants -----*/
let boardSize = 30;
let initSnakeLen = 3;
let snakeStartPos = [14,14];

//creating board matrix AND creating divs
let boardMatrix = [];
for (let x = 0; x< boardSize; x++){
  let rowArr = [];
  for (let y = 0; y< boardSize; y ++){
    rowArr.push(0);
    let square = document.createElement("div");
    square.classList.add("cell");
    square.setAttribute("id", x+'-'+y);
    document.querySelector(".game-board").appendChild(square);
  }
  boardMatrix.push(rowArr)
} 

/*----- app's state (variables) -----*/
let gameOn = true;
let snakeBody = [];
let snakeHead = snakeBody[0]

/*----- cached element references -----*/
let startBtn = document.querySelector("#start-btn");
let resetBtn = document.querySelector("#reset-btn");
let gameBoard = document.querySelector(".game-board");
let gameSqs = document.querySelectorAll("div");

/*----- event listeners -----*/

startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  event.target.style.display = "none";
  snakeInit();
  genFood();
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startBtn.style.display = "inline";

  //reset board.
  gameSqs.forEach(sq=> sq.classList.remove("snake-body", "food") )

});


// //check div populated properly
// gameBoard.addEventListener("click", function (event) {
//   if (event.target.nodeName === 'DIV'){
//     console.dir(event.target)
//   }
// });


/*----- functions -----*/

function snakeInit() {
  for (let i = 0; i< initSnakeLen; i++){
    let identifier = (snakeStartPos[0]).toString() + '-' + (snakeStartPos[1]-i).toString()
    snakeBody.push([snakeStartPos[0],snakeStartPos[1]-i ])
    document.getElementById(identifier).classList.add("snake-body");
  }
}


function genFood(){
  //make sure food doesnt spawn on snake body. 
  let randomPos = [Math.floor(Math.random()*30), Math.floor(Math.random()*30)]
  while (snakeBody.includes(randomPos)){
    randomPos = [Math.floor(Math.random()*30), Math.floor(Math.random()*30)]
  }
  let foodid = (randomPos[0]).toString() + '-' + (randomPos[1]).toString()
  document.getElementById(foodid).classList.add("food");
}


