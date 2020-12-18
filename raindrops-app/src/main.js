/* eslint-disable no-param-reassign */
import './styles/style.css';
import Meteor from './meteor';
import Game from './game';
import { getRandomNumber, createContent, highlightButton } from './helpers';

const game = new Game();

game.prepareGameField();

const inputArea = document.querySelector('.input');
const score = document.querySelector('.score__points');
const bgSound = document.getElementById('bgSound');
const wrongSound = document.getElementById('wrongSound');
const bubblegSound = document.getElementById('bubbleSound');
const steelSound = document.getElementById('steelSound');
let goldenBoom = false;

function updateHealthPoints() {
  const healthArray = document.querySelectorAll('.health__point');
  healthArray[game.gameConfig.hp - 1].hidden = true;
  game.gameConfig.hp -= 1;
  if (game.gameConfig.hp === 0) {
    game.endGame(bgSound);
    game.showStat();
  }
}

function runGoldenBoom() {
  goldenBoom = !goldenBoom;
  setTimeout(() => { goldenBoom = !goldenBoom; }, 200);
}

function controlMeteor(object) {
  if (object instanceof Meteor) {
    const timerId = setInterval(() => {
      // eslint-disable-next-line no-param-reassign
      object.startPosition += game.gameConfig.speed;
      // eslint-disable-next-line no-param-reassign
      object.structure.style.top = `${object.startPosition}px`;
      if (object.startPosition > 475) {
        object.blowUpMeteor(game.gameConfig.keys, steelSound);
        clearInterval(timerId);
        updateHealthPoints();
      } else if (object.distructionKey === game.gameConfig.solution && object.isGolden) {
        object.blowUpMeteor(game.gameConfig.keys, bubblegSound);
        game.stat.rightAnswers += 1;
        game.gameConfig.solution = -10;
        clearInterval(timerId);
        runGoldenBoom();
        score.textContent = +score.textContent + 100;
      } else if (object.distructionKey === game.gameConfig.solution) {
        object.blowUpMeteor(game.gameConfig.keys, bubblegSound);
        game.stat.rightAnswers += 1;
        game.gameConfig.solution = -10;
        clearInterval(timerId);
        score.textContent = +score.textContent + 10;
      } else if (game.gameConfig.hp === 0) {
        clearInterval(timerId);
        object.blowUpMeteor(game.gameConfig.keys);
      } else if (goldenBoom) {
        clearInterval(timerId);
        object.blowUpMeteor(game.gameConfig.keys);
      }
    }, 10);
  }
}

function createMeteor() {
  const meteor = new Meteor(createContent(game.gameConfig));
  game.gameConfig.keys.push(meteor.distructionKey);
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
      game.gameConfig.solution = parseInt(inputArea.value, 10);
      game.checkAnswer(wrongSound);
      inputArea.value = '';
      break;
    case 'button clear':
      inputArea.value = '';
      break;
    default:
      break;
  }
  highlightButton(e);
}

function handleKeyBoard(e) {
  if (e.which >= 48 && e.which <= 57) {
    inputArea.value += e.key;
  } else if (e.which === 8) {
    inputArea.value = inputArea.value.substring(0, inputArea.value.length - 1);
  } else if (e.which === 13) {
    game.gameConfig.solution = parseInt(inputArea.value, 10);
    game.checkAnswer(wrongSound);
    inputArea.value = '';
  }
  highlightButton(e);
}

function guideUser(e) {
  const firstSlide = document.querySelector('.first-slide');
  const secondSlide = document.querySelector('.second-slide');
  const gameField = document.querySelector('.game-field-wrapper');
  const menu = document.getElementById('mainMenu');
  const operation = document.getElementById('operation');
  const speed = document.getElementById('speed');
  const max = document.getElementById('maxNum');
  const settings = document.getElementById('settings');
  const mouse = document.getElementById('mouse');
  const stat = document.getElementById('stat');
  switch (e.target.id) {
    case 'start':
      game.startGame(bgSound, handleMouse, handleKeyBoard, createMeteor);
      break;
    case 'section-settings':
      settings.classList.remove('hidden');
      break;
    case 'submit':
      settings.classList.add('hidden');
      game.gameConfig.operation = operation.value;
      game.gameConfig.speed = +speed.value / 100;
      game.gameConfig.max = +max.value;
      if (mouse.checked) {
        game.gameConfig.keyboard = false;
      } else {
        game.gameConfig.keyboard = true;
      }
      break;
    case 'ok':
      stat.classList.add('hidden');
      menu.classList.remove('hidden');
      break;
    case 'how-to-play':
      menu.classList.add('hidden');
      gameField.classList.add('demo');
      firstSlide.classList.toggle('hidden');
      game.gameConfig.keys.push(5);
      game.startDemo1(handleMouse);
      break;
    case 'toSecondSlide':
      firstSlide.classList.toggle('hidden');
      secondSlide.classList.toggle('hidden');
      game.gameConfig.keys.push(5);
      game.startDemo2(handleMouse);
      break;
    case 'toMenu':
      secondSlide.classList.toggle('hidden');
      gameField.classList.remove('demo');
      menu.classList.remove('hidden');
      break;
    default:
      break;
  }
}

window.addEventListener('click', guideUser);
