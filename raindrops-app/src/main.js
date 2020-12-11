import './styles/style.css';
import Soundfile from './assets/sound/bg_music.mp3';
import SpaceShipImage from './assets/img/spaceship.png';
import Meteor from './meteor';

const bgSound = new Audio();
bgSound.src = Soundfile;
document.body.prepend(bgSound);

let solution = 0;
let hp = 4;
const operation = '/';
const min = 1;
const max = 99;

const gameField = document.querySelector('.game__field');
const spaceShip = new Image();
spaceShip.src = SpaceShipImage;
spaceShip.classList.add('spaceship');
gameField.appendChild(spaceShip);

const inputArea = document.querySelector('.input');
const score = document.querySelector('.score__points');

function getRandomNumber(minValue, maxValue) {
  const random = minValue - 0.5 + Math.random() * (maxValue - minValue + 1);
  return Math.round(random);
}

function createContent(operationSign) {
  let firstOperand;
  let secondOperand;
  let result;
  switch (operation) {
    case '-':
      firstOperand = getRandomNumber(min, max);
      secondOperand = getRandomNumber(min, firstOperand);
      result = firstOperand - secondOperand;
      break;
    case '*':
      firstOperand = getRandomNumber(min, max);
      secondOperand = getRandomNumber(min, 10);
      result = firstOperand * secondOperand;
      break;
    case '/':
      firstOperand = getRandomNumber(min, max);
      while (firstOperand % secondOperand !== 0) {
        secondOperand = getRandomNumber(1, 10);
      }
      result = firstOperand / secondOperand;
      break;
    default:
      firstOperand = getRandomNumber(min, max);
      secondOperand = getRandomNumber(min, max);
      result = firstOperand + secondOperand;
      break;
  }
  return [`${firstOperand}${operationSign}${secondOperand}`, result];
}

console.log(createContent(operation));

function updateHealthPoints() {
  const point = document.getElementById(`point${hp}`);
  point.hidden = true;
  hp -= 1;
}

function controlMeteor(object) {
  if (object instanceof Meteor) {
    const timerId = setInterval(() => {
      // eslint-disable-next-line no-param-reassign
      object.startPosition += 1;
      // eslint-disable-next-line no-param-reassign
      object.structure.style.top = `${object.startPosition}px`;
      if (object.startPosition > 500) {
        object.blowUpMeteor();
        clearInterval(timerId);
        updateHealthPoints();
      } else if (object.distructionKey === solution) {
        object.blowUpMeteor();
        clearInterval(timerId);
        score.textContent = +score.textContent + 50;
      }
    }, 10);
  }
}

function startGame() {
  let meteor = new Meteor(createContent(operation));
  let field = document.getElementById(`field${getRandomNumber(1, 5)}`);
  field.prepend(meteor.structure);
  controlMeteor(meteor);
  const timerId = setInterval(() => {
    if (hp === 0) {
      clearInterval(timerId);
      console.log('GAME OVER');
      return;
    }
    meteor = new Meteor(createContent(operation));
    field = document.getElementById(`field${getRandomNumber(1, 5)}`);
    field.prepend(meteor.structure);
    controlMeteor(meteor);
  }, 2000);
}

function handleUser(e) {
  if (e.type === 'click') {
    switch (e.target.className) {
      case 'button' || 'button zero':
        inputArea.value += e.target.textContent;
        break;
      case 'button enter':
        solution = parseFloat(inputArea.value);
        inputArea.value = '';
        break;
      case 'button clear':
        inputArea.value = '';
        break;
      default:
        break;
    }
  } else if (e.type === 'keydown') {
    console.log(e.keycode);
  }
}

window.addEventListener('click', handleUser);

startGame();
