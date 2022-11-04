// Pseudocode - MVP - snake game
//1. define required variables used to track the state of the game
//gameOn, speed of the game, spawn location of food (generated using rand nums between a range)
//2. store elements on the page that will be accessed in code more than once into variables
//overall grid, reset button, start button, etc.

//Upon loading the webpage:
//1. start button to show up in the middle of the grid.
//2. start button to hide when user clicks on it & trigger the game to start.
//3. render the square grid on the page, including the snake (coloured divs, 3 units long, middle of board)
//4. Handle listening to keyboard arrow presses.
//3. snake head moves in direction of arrow key pressed;
//snake push/unshift snake array (array full of values that map to the board) to simulate movement
//divs occupied by the snake will contain different class attributes.
//(when snake is occupying a div, a class attribute will be added. when snake leaves, a class attribute will be deleted)
//rate at which the classes to the div are added and subtracted is handled setInterval
//4. when snake head touches a div containing a food class:
// an element will be added to the beginning of the snake array
//setInterval time will decrease (snake will move faster)
//5. when snake head touches a div w/ a snake-body class:
// game is over
//6. when snake touches the border:
//game is over
//6. when game is over, board will not respond to keyboard presses anymore. (achieved using a gameOn state variable holding a boolean )
//7. overlay w/ 'game over' message will cover screen. player will have to click on screen to dismiss. --> return back to step 1.
//8. handle player clicking replay button --> an option for a player to reset the game --> return back to step 1.

// Pseudocode - Additional Features to Consider:
//1. highscore board:
//before the game starts, input text box allows user to to enter their name before hitting start.
//when the game is over, obtain length of snake array. Write to a text file witin the same project folder recording player name & high score.
//when user loads the page, the highscore board will read the text file, sort from highest score to lowest score, extract the three highest score and display it
//2. game difficulty:
// user to select easy, medium or hard. once user starts the game, the buttons will deactivate, effectively locking in the selection;  default mode is easy.
// difficulty will dictate the speed in which the snake moves. Hard will include barriers the player will have to avoid on the board.
//3. light/dark mode
//changes the color scheme of the game to light or dark.
//4. player vs player:
// adding additional keys to listen for in the game. two snakes will populate; one on each side of the board.
// a function to check whether the head of a player's snake has hit itself or another person's snake.
//5. turn sound on and off.

//rendering game board, adding id number to square for reference purposes

/*----- constants -----*/
let boardSize = 30;
let initSnakeLen = 3;
let snakeStartPos = 435;

for (let i = 0; i < boardSize * boardSize; i++) {
  let square = document.createElement("div");
  square.classList.add("cell");
  square.setAttribute("id", "div" + i);
  document.querySelector(".game-board").appendChild(square);
}
/*----- app's state (variables) -----*/
let gameOn = true;

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
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  startBtn.style.display = "inline";

  //reset board.
  gameSqs.forEach(sq=> sq.classList.remove("snake-body") )

});


/*----- functions -----*/

function snakeInit() {
  for (let i = 0; i< initSnakeLen; i++){
     let identifier = "#div" + (snakeStartPos-i)
     document.querySelector(identifier).classList.add("snake-body");
  }
}

function genFood(){
        
}
