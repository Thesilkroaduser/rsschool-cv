import './styles/style.css';
import Meteor from './meteor';
import gameSettings from './game-config';
import soundFile from './assets/sound/bg_music.mp3';
import spaceshipImage from './assets/img/spaceship.png';
import healthIcon from './assets/img/heart.svg';

let hp = 4;
const menu = document.querySelector('.main-menu');

function prepareGameField() {
  // Add Music
  const bgSound = new Audio();
  bgSound.src = soundFile;
  bgSound.id = 'bgSound';
  document.body.append(bgSound);
  bgSound.play();
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
  // Hide Main Menu
  menu.classList.add('hidden');
}

function getRandomNumber(minValue, maxValue) {
  const random = minValue + Math.random() * (maxValue - minValue + 1);
  return Math.round(random);
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
        secondOperand = getRandomNumber(1, 10);
      }
      result = firstOperand / secondOperand;
      break;
    default:
      firstOperand = getRandomNumber(gameSettings.min, gameSettings.max);
      secondOperand = getRandomNumber(gameSettings.min, gameSettings.max);
      result = firstOperand + secondOperand;
      break;
  }
  return [`${firstOperand}${operationSign}${secondOperand}`, result];
}

function updateHealthPoints() {
  const healthArray = document.querySelectorAll('.health__point');
  healthArray[hp - 1].hidden = true;
  hp -= 1;
}

const score = document.querySelector('.score__points');

function controlMeteor(object) {
  if (object instanceof Meteor) {
    const timerId = setInterval(() => {
      // eslint-disable-next-line no-param-reassign
      object.startPosition += 1;
      // eslint-disable-next-line no-param-reassign
      object.structure.style.top = `${object.startPosition}px`;
      if (object.startPosition > 475) {
        object.blowUpMeteor();
        clearInterval(timerId);
        updateHealthPoints();
      } else if (object.distructionKey === gameSettings.solution) {
        object.blowUpMeteor();
        clearInterval(timerId);
        score.textContent = +score.textContent + 50;
      }
    }, 10);
  }
}

function createMeteor() {
  const meteor = new Meteor(createContent(gameSettings.operation));
  const field = document.getElementById(`field${getRandomNumber(1, 5)}`);
  field.prepend(meteor.structure);
  controlMeteor(meteor);
}

const inputArea = document.querySelector('.input');

function handleUser(e) {
  if (e.type === 'click') {
    switch (e.target.className) {
      case 'button':
        inputArea.value += e.target.textContent;
        break;
      case 'button zero':
        inputArea.value += e.target.textContent;
        break;
      case 'button enter':
        gameSettings.solution = parseFloat(inputArea.value);
        inputArea.value = '';
        break;
      case 'button clear':
        inputArea.value = '';
        break;
      default:
        break;
    }
  } else if (e.type === 'keydown') {
    // console.log(e.keycode);
  }
}

function startGame() {
  prepareGameField();
  window.addEventListener('click', handleUser);
  const bgSound = document.getElementById('bgSound');
  bgSound.play();
  createMeteor();
  const timerId = setInterval(() => {
    if (hp === 0) {
      clearInterval(timerId);
      menu.classList.remove('hidden');
      bgSound.pause();
      return;
    }
    createMeteor();
  }, 2000);
}

function guideUser(e) {
  switch (e.target.id) {
    case 'start':
      startGame();
      break;
    default:
      break;
  }
}

window.addEventListener('click', guideUser);
