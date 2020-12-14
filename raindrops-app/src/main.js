/* eslint-disable no-param-reassign */
import './styles/style.css';
import Meteor from './meteor';
import gameSettings from './game-config';
import soundFile from './assets/sound/bg_music.mp3';
import spaceshipImage from './assets/img/spaceship.png';
import healthIcon from './assets/img/heart.svg';

function prepareGameField() {
  // Add Music
  const bgSound = new Audio();
  bgSound.src = soundFile;
  bgSound.id = 'bgSound';
  document.body.append(bgSound);
  // Add Spaceship
  const spaceship = new Image();
  const gameField = document.querySelector('.game__field');
  spaceship.src = spaceshipImage;
  spaceship.classList.add('spaceship');
  gameField.append(spaceship);
  // Add HealthPoints
  const healthArea = document.querySelector('.health');
  for (let i = 0; i < 4; i += 1) {
    const health = new Image();
    health.src = healthIcon;
    health.classList.add('health__point');
    healthArea.append(health);
  }
}

prepareGameField();

function getRandomNumber(minValue, maxValue) {
  const random = minValue + Math.random() * (maxValue + 1 - minValue);
  return Math.floor(random);
}

function createContent(operationSign) {
  let firstOperand;
  let secondOperand;
  let result;
  switch (operationSign) {
    case '-':
      firstOperand = getRandomNumber(gameSettings.min, gameSettings.max);
      secondOperand = getRandomNumber(gameSettings.min, firstOperand);
      result = firstOperand - secondOperand;
      break;
    case '*':
      firstOperand = getRandomNumber(gameSettings.min, gameSettings.max);
      secondOperand = getRandomNumber(gameSettings.min, 10);
      result = firstOperand * secondOperand;
      break;
    case '/':
      firstOperand = getRandomNumber(gameSettings.min, gameSettings.max);
      while (firstOperand % secondOperand !== 0) {
        secondOperand = getRandomNumber(gameSettings.min, gameSettings.max - 1);
      }
      result = firstOperand / secondOperand;
      break;
    default:
      firstOperand = getRandomNumber(gameSettings.min, gameSettings.max);
      secondOperand = getRandomNumber(gameSettings.min, gameSettings.max);
      result = firstOperand + secondOperand;
      break;
  }
  const content = `${firstOperand}${operationSign}${secondOperand}`;
  return [content, result];
}

const menu = document.getElementById('mainMenu');
const bgSound = document.getElementById('bgSound');

function endGame() {
  menu.classList.remove('hidden');
  bgSound.currentTime = 0;
  bgSound.pause();
}

function updateHealthPoints() {
  const healthArray = document.querySelectorAll('.health__point');
  healthArray[gameSettings.hp - 1].hidden = true;
  gameSettings.hp -= 1;
  if (gameSettings.hp === 0) {
    endGame();
  }
}

const score = document.querySelector('.score__points');

function increaseLevel() {
  const timerId = setInterval(() => {
    if (gameSettings.hp === 0) {
      clearInterval(timerId);
    }
    gameSettings.speed += 0.25;
    gameSettings.max += 5;
  }, 10000);
}

let goldenBoom = false;

function runGoldenBoom() {
  goldenBoom = !goldenBoom;
  setTimeout(() => { goldenBoom = !goldenBoom; }, 200);
}

function controlMeteor(object) {
  if (object instanceof Meteor) {
    const timerId = setInterval(() => {
      // eslint-disable-next-line no-param-reassign
      object.startPosition += gameSettings.speed;
      // eslint-disable-next-line no-param-reassign
      object.structure.style.top = `${object.startPosition}px`;
      if (object.startPosition > 475) {
        object.blowUpMeteor();
        clearInterval(timerId);
        updateHealthPoints();
      } else if (object.distructionKey === gameSettings.solution && object.isGolden) {
        object.blowUpMeteor();
        gameSettings.solution = -10;
        clearInterval(timerId);
        runGoldenBoom();
        score.textContent = +score.textContent + 100;
      } else if (object.distructionKey === gameSettings.solution) {
        object.blowUpMeteor();
        gameSettings.solution = -10;
        clearInterval(timerId);
        score.textContent = +score.textContent + 10;
      } else if (gameSettings.hp === 0) {
        clearInterval(timerId);
        object.blowUpMeteor();
      } else if (goldenBoom) {
        clearInterval(timerId);
        object.blowUpMeteor();
      }
    }, 10);
  }
}

function createMeteor() {
  const meteor = new Meteor(createContent(gameSettings.operation));
  const field = document.getElementById(`field${getRandomNumber(1, 5)}`);
  meteor.isGolden = getRandomNumber(1, 60) > 55;
  if (meteor.isGolden) {
    meteor.structure.classList.add('golden-meteor');
  }
  field.append(meteor.structure);
  controlMeteor(meteor);
}

const inputArea = document.querySelector('.input');

function handleMouse(e) {
  switch (e.target.className) {
    case 'button':
      inputArea.value += e.target.textContent;
      break;
    case 'button zero':
      inputArea.value += e.target.textContent;
      break;
    case 'button parse':
      gameSettings.solution = parseInt(inputArea.value, 10);
      inputArea.value = '';
      break;
    case 'button clear':
      inputArea.value = '';
      break;
    default:
      break;
  }
}

function handleKeyBoard(e) {
  if ((e.which >= 96 && e.which <= 105) || (e.which >= 48 && e.which <= 57)) {
    inputArea.value += e.key;
  } else if (e.which === 8) {
    inputArea.value = inputArea.value.substring(0, inputArea.value.length - 1);
  } else if (e.which === 13) {
    gameSettings.solution = parseInt(inputArea.value, 10);
    inputArea.value = '';
  }
}

const settings = document.getElementById('settings');
const operation = document.getElementById('operation');
const speed = document.getElementById('speed');
const max = document.getElementById('maxNum');

function resetPreviousGame() {
  gameSettings.hp = 4;
  gameSettings.solution = -10;
  gameSettings.speed = +speed.value / 100;
  gameSettings.max = +max.value;
  score.textContent = 0;
  const healthArray = document.querySelectorAll('.health__point');
  // eslint-disable-next-line no-return-assign
  healthArray.forEach((point) => point.hidden = false);
}

function startGame() {
  resetPreviousGame();
  menu.classList.add('hidden');
  if (gameSettings.keboard) {
    window.addEventListener('keydown', handleKeyBoard);
  } else { window.addEventListener('click', handleMouse); }
  bgSound.play();
  increaseLevel();
  createMeteor();
  const timerId = setInterval(() => {
    if (gameSettings.hp === 0) {
      clearInterval(timerId);
      return;
    }
    createMeteor();
  }, 1500);
}

function guideUser(e) {
  switch (e.target.id) {
    case 'start':
      startGame();
      break;
    case 'section-settings':
      settings.classList.remove('hidden');
      break;
    case 'submit':
      settings.classList.add('hidden');
      gameSettings.operation = operation.value;
      gameSettings.speed = +speed.value / 100;
      gameSettings.max = +max.value;
      break;
    default:
      break;
  }
}

window.addEventListener('click', guideUser);
