'use strict';

// selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); // another great way to get elements fast
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const init = function () {
  // initializing recurring values for better modularity

  scores = [0, 0]; // for storing scores when player clicks hold (player0 for position 0, player 1 for position 1)

  currentScore = 0;
  activePlayer = 0;
  playing = true; // meaning we are currently playing the game

  // change the player 1 and player 2 held scores to 0
  score0Element.textContent = 0;
  score1Element.textContent = 0;

  // change the current score of whoever is playing to 0
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  // Removing the winner background if it exists (simple and direct)
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  // active player removal
  player0Element.classList.add('player--active'); // should start with player 0, so this is 'add' just in case
  player1Element.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `images/dice-${dice}.png`;

    // 3. check whether the rolled is 1 -> if true, switch to the other player
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      // Switch to next player
      // toggle method adds the class if it is NOT there and removes the class if it is there. Pretty nice. In this case, toggle basically adds or removes the 'player--active' class thereby switching the background colours.
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the score of the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if player's score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceElement.classList.add('hidden');
    } else {
      //3. switch the player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
