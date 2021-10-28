/*
GAME FUNCTION:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-Notify the player of the correct answer if loose
-Let player choose to play again
*/

// Gmae values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI elements

const UIgame = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  UImessage = document.querySelector('.message');

// Assing UI min max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
UIgame.addEventListener('mousedown', function (e) {
  //mousedown rather than click, cuz on click it reloads automatically on last try of submit
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Listen for guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  // validate input
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    window.location.reload();
  }

  // Check if won
  if (guess === winningNum) {
    // gameover - WON
    gameOver(true, `${winningNum} is correct, YOU WIN!`);
  } else {
    // wrong number
    guessesLeft -= 1; //same as guessesLeft= guessesLeft - 1;

    if (guessesLeft === 0) {
      // game over - lost
      gameOver(
        false,
        `Game Over, you lost. The correct number was ${winningNum}`
      );
    } else if (guessesLeft === 1) {
      // setMessage(`${guess} is not correct, ${guessesLeft} guess left`, "red");
      // // Clear input
      // guessInput.value = "";
      // // border color for wrong number
      // guessInput.style.borderColor = "red";
      guessLeftNumber(true);
    } else {
      // Game continues - answer wrong
      // setMessage(
      //   `${guess} is not correct, ${guessesLeft} guessess left`,
      //   "red"
      // );
      // // Clear input
      // guessInput.value = "";
      // // border color for wrong number
      // guessInput.style.borderColor = "red";
      guessLeftNumber(false);
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  won === true ? (color = 'green') : (color = 'red');

  // guess button disabled
  // guessBtn.disabled = true;
  // Disable input
  guessInput.disabled = true;
  // border color
  guessInput.style.borderColor = color;
  // set message color
  UImessage.style.color = color;
  // set msg
  setMessage(msg);

  // play again
  guessBtn.value = 'Play again';
  guessBtn.className += 'play-again';
}

// else or else if

function guessLeftNumber(guessWon, msg2) {
  let color;
  let guess = parseInt(guessInput.value);
  guessWon === true
    ? (msg2 = `${guess} is not correct, ${guessesLeft} guess left`) &&
      (color = 'red')
    : (msg2 = `${guess} is not correct, ${guessesLeft} guessess left`) &&
      (color = 'red');
  // Clear input
  guessInput.value = '';
  // border color for wrong number
  guessInput.style.borderColor = color;
  // set message color
  UImessage.style.color = color;
  setGuessMsg(msg2);
}

// Get random number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); //return= putting number back into winningNum
}

// Set message

function setMessage(msg, color) {
  UImessage.style.color = color;
  UImessage.textContent = msg;
}

function setGuessMsg(msg2) {
  UImessage.textContent = msg2;
}
