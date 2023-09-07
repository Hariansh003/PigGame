'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const dicEl = document.querySelector('.dice');
const btnroll = document.querySelector('.btn--roll');
const btnhold = document.querySelector('.btn--hold');
const btnnew = document.querySelector('.btn--new');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// setting scores and hidding the dice initially
score0El.textContent = 0;
score1El.textContent = 0;
dicEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activeplayer = 0;
let playing = true;

//function for switching in between players
function switching() {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//Rolling dice functionallity
btnroll.addEventListener('click', function () {
  if (playing) {
    // 1) Generating the random number b/w 1 to 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2) Display Dice
    dicEl.classList.remove('hidden');
    dicEl.src = `dice-${dice}.png`; //something new
    //3) Check if no ===1 if not then add the total sum to current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      //4) if 1 then switch to other player
      switching();
    }
  }
});

// Hold Functionallity
btnhold.addEventListener('click', function () {
  if (playing) {
    //1) Add current score to score of active player
    scores[activeplayer] += currentScore;
    //2) Check if score>=100 then finish the game
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    if (scores[activeplayer] >= 10) {
      dicEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      // switch to the Next player
      switching();
    }
  }
});

//New game functionallity
btnnew.addEventListener('click', function () {
  currentScore = 0;
  document.getElementById(`current--${activeplayer}`).textContent =
    currentScore;
  dicEl.classList.add('hidden');
  playing = true;
  document
    .querySelector(`.player--${activeplayer}`)
    .classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  activeplayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
});
