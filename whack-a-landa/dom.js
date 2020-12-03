const trenches = document.querySelectorAll('.battlefield__item');
const currentScore = document.querySelector('.score');
const landa = document.querySelectorAll('.landa');
const notification = document.querySelector('.notice');
const levels = document.getElementById('level');
const scoreBoard = document.querySelector('.score-board');
const scoreBoardCells = document.querySelectorAll('.board__item');

// Create array of elements (to fill score board)
let scoreBoardArray = Array(10).fill(null);
let level = levels.options[levels.selectedIndex].value;
let levelName;

switch (level) {
  case '1': levelName = '(AMATEUR)';
  break;
  case '2': levelName = '(BEAR JEW)'
  break;
  case '3': levelName = '(ALDO RAIN)';
}

let lastTrench;
let timeUp = false;
let started = false;
let minTime = 500;
let maxTime = 1100;

// Get random interval
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Get random trench
function randomTrench(trenches) {
  const idx = Math.floor(Math.random() * trenches.length);
  const trench = trenches[idx];
  if (trench === lastTrench) {
    return randomTrench(trenches);
  }
  lastTrench = trench;
  return trench;
}

// Show Colonel Landa
function peep() {
  started = true;
  const time = randomTime(minTime, maxTime);
  const trench = randomTrench(trenches);
  trench.classList.add('up');
  setTimeout(() => {
    trench.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

// Start game function
function startGame() { 
  if (started) {
    return;
  }
  currentScore.textContent = 0;
  timeUp = false;
  peep();
  setTimeout(() => {
    timeUp = true; 
    started = false;
    // Show nofication by the end of the game
    notification.classList.remove('hidden');
    setTimeout(() => {
      notification.style.opacity = 0;
      // Update array and score board by the end of the game
      setScoreBoardArray();
      fillScoreBoard();
    }, 1000);
  }, 10000);
  // Hide nofication by the end of the game
  notification.classList.add('hidden');
  setTimeout(() => notification.style.opacity = 1, 400);
}

// Choose difficulty level (1 - AMATEUR - easy, 2 - BEAR JEW - noraml, 3 - ALDO RAIN - hard)
function setLevel() {
  level = levels.options[levels.selectedIndex].value;
  switch(level) {
    case '1': minTime = 500;
              maxTime = 1100;
              levelName = '(AMATEUR)';
    break;
    case '2': minTime = 200;
              maxTime = 750;
              levelName = '(BEAR JEW)';
    break;
    case '3': minTime = 100;
              maxTime = 500;
              levelName = '(ALDO RAIN)';
  };
}

// Open score board 
function showScoreBoard() {
  scoreBoard.style.zIndex = 10;
  setTimeout(() => {
    scoreBoard.style.opacity = 1;    
  }, 100);
}

// Close score board
function closeScoreBoard() {
  setTimeout(() => {
    scoreBoard.style.opacity = 0;
    scoreBoard.style.zIndex = -10;    
  }, 100);
}

function handleMouse(e) {
  if (e.target.id == 'start') {
    startGame();
  };
  if (e.target.className == 'landa') {
    currentScore.textContent = parseInt(currentScore.textContent) + 1;
  };
  if (e.target.id == 'scoreBoard') {
    showScoreBoard();
  };
  if (e.target.id == 'close') {
    closeScoreBoard();
  };
}

// Update array of Latest Results and save it to the Local Storage
function setScoreBoardArray() {
  if (scoreBoardArray.indexOf(null, 0) == -1) {
    scoreBoardArray.shift();
    scoreBoardArray.push(currentScore.textContent + levelName);
  }
  else {
    let index = scoreBoardArray.indexOf(null, 0);
    scoreBoardArray[index] = currentScore.textContent + levelName;
  };
  localStorage.setItem('scoreBoardArray', JSON.stringify(scoreBoardArray));
}

// Get array of latest results from Local Storage 
function getScoreBoardArray() {
  if (localStorage.getItem('scoreBoardArray') !== null) {
    scoreBoardArray = JSON.parse(localStorage.getItem('scoreBoardArray'));
  };
}

// Output data from array of Latest Results to the Score Board Cells and highlight it depending on level
function fillScoreBoard() {
  scoreBoardCells.forEach((cell, index) => {
    cell.textContent = scoreBoardArray[index];
    let text = cell.textContent;
    if (text.includes('AMATEUR')) {
      cell.style.background = 'green';
    }
    else if (text.includes('BEAR')) {
      cell.style.background = 'orange';
    }
    else if (text.includes('ALDO')) {
      cell.style.background = 'red';
    };
  });
}

getScoreBoardArray();
fillScoreBoard();
window.addEventListener('click', handleMouse);
window.addEventListener('change', setLevel);
