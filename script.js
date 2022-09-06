'use strict';
// roll dice function

const player0 = document.querySelector('.player.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
// 2 ways: get element by ID
const currentscore0 = document.querySelector('#current--0');
const currentscore1 = document.getElementById('current--1');

const btn_roll_dice = document.querySelector('.btn--roll');
const dice_img = document.querySelector('.dice');
const hold = document.querySelector('.btn--hold');
const new_game = document.querySelector('.btn--new');

//  check if all the Elements are selected
console.log(player0);
console.log(player1);
console.log(currentscore0);
console.log(currentscore1);
console.log(score0);
console.log(score1);

// in order to use the declare parameters, declare globally first
let currentscore, playing, score, activeplayer;

// 1.Init: everyscore to 0, put the init into a function
const init = function () {
  score = [0, 0];
  currentscore = 0;
  // active player either be 1 or 0
  activeplayer = 0;
  // status of game
  playing = true;

  // set all the score to 0
  currentscore1.textContent = currentscore0.textContent = currentscore;
  score1.textContent = score0.textContent = 0;

  // hidden the dice
  dice_img.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
};

// 1. status of first load the window
init();

// 2. function: start the game, player0 to roll the dice
const roll_dice = function () {
  if (playing) {
    // get a random dice_num from 1 to 6
    let dice_num = Math.trunc(Math.random() * 6) + 1;

    // show the dice
    dice_img.classList.remove('hidden');
    dice_img.src = `dice-${dice_num}.png`;
    console.log(dice_num);

    if (dice_num !== 1) {
      // check whether dice_num is 1
      currentscore += dice_num;
      console.log(currentscore);
      // get the active player's currentscore
      document.getElementById(
        `current--${activeplayer}`
      ).textContent = currentscore;
    } else {
      // switch player
      switch_player();
    }
  }
};

// 3. function: switch player
const switch_player = function () {
  // set currentscore to zero
  currentscore = 0;
  document.getElementById(
    `current--${activeplayer}`
  ).textContent = currentscore;
  // switch player
  activeplayer = activeplayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// roll dice btn
btn_roll_dice.addEventListener('click', roll_dice);

// hold button
hold.addEventListener('click', function () {
  if (playing) {
    // 1. add currentscore to score
    //    show score.textContent = score
    document.getElementById(`score--${activeplayer}`).textContent = score[
      `${activeplayer}`
    ] += currentscore;

    // 2. check if the whole score is >=100
    if (score[`${activeplayer}`] <= 100) {
      // 3. switch player
      switch_player();
    } else {
      // 3. winner player
      // 1. remove the active--player, add the winner player
      player0.classList.remove('player--active');
      player1.classList.remove('player--active');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      // hide the dice
      dice_img.classList.add('hidden');
      // 2. set all the button to disable
      // 2 ways: disable all the btns or use a start for playing or not
      playing = false;
    }
  }
});

// new game btn = init the game
new_game.addEventListener('click', init);
