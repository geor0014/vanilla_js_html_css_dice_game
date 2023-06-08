'use strict';
//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); //when GBID, no need for #

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//selecting buttons
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

//variables
let scores, gameState, activePlayer, currentScore; //here we just define and use in reset()

//functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //if currplayer rolls a 1 it resets his score
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //if current player is 0, it sets it to 1
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active'); //for the background change
};

const reset = () => {
  scores = [0, 0]; //holds both player's scores and is accessed by the active player's index 0/1
  gameState = true;
  activePlayer = 0; //keeps track of who's playing at the moment
  currentScore = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //hides the dice
  diceEl.classList.remove('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
reset(); //we call it here so that when we reload the page it resets

//rolling the dice logic
btnRoll.addEventListener('click', () => {
  if (gameState) {
    //1:generating random dice num
    const diceRoll = Math.floor(Math.random() * 6 + 1);

    //2:display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    //3:check for a 1 roll
    if (diceRoll !== 1) {
      //add dice to current player's result
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (gameState) {
    //1.add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if current player score >= 100
    if (scores[activePlayer] >= 10) {
      //finish game
      gameState = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //we don't want active and winner at the same time
    } else {
      //3.switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', reset);
