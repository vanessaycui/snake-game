# **SNAKE**

Snake is a nostalgic game for me. It's a game where the player moves a growing snake that will eventually become its own obstacle. I used to play on my cousin's Nokia back in the 90's during family dinners. I decided to create my own version of Snake so I can tinker with the game rules and UI. Eventually, I'd like to make this available on mobile. 

This version of snake includes the following features:
* Moving boosters (increases score by 10 points)
* Static poisonous food (decreases score by 5 points)
* Static food (increases score by 1 point and increases length by 1 unit)
* Player will lose if it collides with itself or the borders
* Top scores will be stored in the user's localStorage in their browser

## **SPECIAL CONDITIONS** 
* SNAKE is optimized for playing in a Chrome browser window with a minimum width of 600px and minimum height of 810px
* Player will need access to a keyboard with arrow keys

***Look out for a mobile-friendly version of this game in the near future!***

<hr>

## **SCREENSHOTS & INSTRUCTIONS**

<div style="display:flex; flex-wrap: wrap; width: 800px;">
<img style="flex: 0 0 50%; width: 350px; height: 300px;" src="https://media.giphy.com/media/00DephsKWdKTWQJFDK/giphy.gif">
<img style="flex: 0 0 50%; width: 350px; height: 300px;" src="https://media.giphy.com/media/ZyzunZN5Xt8h1glO7V/giphy.gif">
<p>1. Enter a username & click START! If no username is provided, you'll be recorded as "noname" on the TOP SCORES board.</p>
<p> 2. Use your arrow keys to move. Gain points by eating food in blue. You will gain 1 point and you'll grow longer.</p>

<img style="flex: 0 0 50%; width: 350px; height: 300px;" src="https://media.giphy.com/media/D3NrE5G94LZzDL3wLK/giphy.gif">

<img style="flex: 0 0 50%; width: 350px; height: 300px;" src="https://media.giphy.com/media/bEwRHZcHvzB6Nj3t2D/giphy.gif">

<p>3. Avoid poisonous food in red/pink. You will lose 5 points if you eat one.</p>
<p> 4. If you're ambitious, try to catch the booster in light-blue. You will gain 10 points.</p>
<p> 5. You'll instantly lose if your points are less than 0, you collide into yourself, or you collide into the borders! 
<img style="flex: 0 0 50%; width: 350px; height: 300px;" src="https://media.giphy.com/media/yLq8eZAy82QzYI9HCV/giphy.gif">

<img style="flex: 0 0 50%; width: 350px; height: 300px;" src="https://media.giphy.com/media/tqRQ2tQqkoTtc7CebU/giphy.gif">

<p>6. Your score gets recorded if you've managed to gain enough points to be in the top 10.  </p>
<p>7. If you've managed to gain enough points to surpass the highest score, your score will be recorded above the top left corner of the board. Your name will also be in gold under TOP SCORES. </p>
<p>8. Click RESET to play again. Refer to Step 1.</p>

</div>

<strong>Like the GIFs? Create your own at <a href="https://giphy.com/">giphy.com</a></strong>

<hr>

## **TECHNOLOGIES**

* HTML
* CSSS
* JavaScript

<hr>
<h2><strong>GETTING STARTED</strong></h2>

HOW TO START:
1. Enter your username (max length is 6 characters) & click **START**
2. After you lose, click **RESET** to play again.

HOW TO PLAY:
1. The snake will move instantly. **Use your arrow keys to move.**
2. Avoid the pink/red food -- you'll lose 5 points.
3. Try to catch the blue and light blue food -- you'll gain 1 and 10 points, respectively.
4. Avoid the borders, you'll lose instantly.
5. Avoid colliding with yourself, you'll lose instantly.
6. If your points go below 0, you'll lose.
7. Gain enough points for your name to be shown on the TOP SCORES list. 
8. Compete with family & friends.  

HOW TO STOP:
1. Click RESET. ***If RESET was clicked mid-play, your score will not be recorded.***

TWO WAYS TO CLEAR SCORE RECORDS:
1. Hard way: Clear your brower's cookies and site data. Close & reopen your browser.
2. Easy way: Type localStorage.clear("highScoreData") in your console, enter, and refresh your page.


This game is hosted on GitHub Pages! 
Click on the link below to play.

<button style="padding: 20px; font-size: 30px; border-radius: 10px; background-color: #8EC3B0; border: none;" ><strong><a style="color: white; text-decoration: none;" href="https://vanessaycui.github.io/snake-game/">PLAY SNAKE</a></strong></button>


<hr>

## **NEXT STEPS**

The following enhancements are some exiting features I will be implementing in the near future:
* Adding sound effects
* Option to include or exclude boosters/poisonous food in the game
* Option for Player vs Player
* Creating a backend to store top scores so players can compete against each other online
* Creating a mobile-friendly version (web or app)

Please feel free to leave a comment or provide some feedback. Open to all suggestions :)

<hr>
