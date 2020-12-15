/* eslint-disable no-param-reassign */
import './styles/style.css';
import Meteor from './meteor';
import Game from './game';
import { getRandomNumber, createContent } from './helpers';

const game = new Game();

game.prepareGameField();

const inputArea = document.querySelector('.input');
const score = document.querySelector('.score__points');
const bgSound = document.getElementById('bgSound');
const options = game.gameConfig;
let goldenBoom = false;

function updateHealthPoints() {
  const healthArray = document.querySelectorAll('.health__point');
  healthArray[options.hp - 1].hidden = true;
  options.hp -= 1;
  if (options.hp === 0) {
    game.endGame(bgSound);
  }
}

function increaseLevel() {
  const timerId = setInterval(() => {
    if (options.hp === 0) {
      clearInterval(timerId);
    }
    options.speed += 0.25;
    options.max += 5;
  }, 10000);
}

function runGoldenBoom() {
  goldenBoom = !goldenBoom;
  setTimeout(() => { goldenBoom = !goldenBoom; }, 200);
}

function controlMeteor(object) {
  if (object instanceof Meteor) {
    const timerId = setInterval(() => {
      // eslint-disable-next-line no-param-reassign
      object.startPosition += options.speed;
      // eslint-disable-next-line no-param-reassign
      object.structure.style.top = `${object.startPosition}px`;
      if (object.startPosition > 475) {
        object.blowUpMeteor();
        clearInterval(timerId);
        updateHealthPoints();
      } else if (object.distructionKey === options.solution && object.isGolden) {
        object.blowUpMeteor();
        options.solution = -10;
        clearInterval(timerId);
        runGoldenBoom();
        score.textContent = +score.textContent + 100;
      } else if (object.distructionKey === options.solution) {
        object.blowUpMeteor();
        options.solution = -10;
        clearInterval(timerId);
        score.textContent = +score.textContent + 10;
      } else if (options.hp === 0) {
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
  const meteor = new Meteor(createContent(options));
  const field = document.getElementById(`field${getRandomNumber(1, 5)}`);
  meteor.isGolden = getRandomNumber(1, 60) > 55;
  if (meteor.isGolden) {
    meteor.structure.classList.add('golden-meteor');
  }
  field.append(meteor.structure);
  controlMeteor(meteor);
}

function handleMouse(e) {
  switch (e.target.className) {
    case 'button':
      inputArea.value += e.target.textContent;
      break;
    case 'button zero':
      inputArea.value += e.target.textContent;
      break;
    case 'button parse':
      options.solution = parseInt(inputArea.value, 10);
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
    options.solution = parseInt(inputArea.value, 10);
    inputArea.value = '';
  }
}

function startGame() {
  const menu = document.getElementById('mainMenu');
  game.resetPreviousGame(options);
  menu.classList.add('hidden');
  if (options.keyboard) {
    window.addEventListener('keydown', handleKeyBoard);
  } else { window.addEventListener('click', handleMouse); }
  bgSound.play();
  increaseLevel();
  createMeteor();
  const timerId = setInterval(() => {
    if (options.hp === 0) {
      clearInterval(timerId);
      return;
    }
    createMeteor();
  }, 2000);
}

function guideUser(e) {
  const operation = document.getElementById('operation');
  const speed = document.getElementById('speed');
  const max = document.getElementById('maxNum');
  const settings = document.getElementById('settings');
  const mouse = document.getElementById('mouse');
  switch (e.target.id) {
    case 'start':
      startGame();
      break;
    case 'section-settings':
      settings.classList.remove('hidden');
      break;
    case 'submit':
      settings.classList.add('hidden');
      options.operation = operation.value;
      options.speed = +speed.value / 100;
      options.max = +max.value;
      if (mouse.checked) {
        options.keyboard = false;
      } else {
        options.keyboard = true;
      }
      break;
    default:
      break;
  }
}

window.addEventListener('click', guideUser);
