'use strict';

const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceEle = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player_0 = document.getElementById('current--0');
const player_1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let playing, scores, activePlayer, currentScore;

//reset the value of the scores to zero
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0.textContent = score1.textContent = 0;
  
  diceEle.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
const generateDice = () => {
  if (playing) {
    let diceNum = Math.trunc(Math.random() * 6 + 1);
    diceEle.classList.remove('hidden');
    diceEle.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      //add dice the current score
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //swtich to the next player
      switchPlayer();
    }
  }
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', generateDice);
btnHold.addEventListener('click', () => {
  if (playing) {
    //1. add current socre to the active player's score
    scores[activePlayer] += currentScore;
    activePlayer === 0
      ? (score0.textContent = scores[activePlayer])
      : (score1.textContent = scores[activePlayer]);
    //2. check the player's score >= 100
    // finish the game
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEle.classList.add('hidden');
    }
    // swithc to the next player
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
