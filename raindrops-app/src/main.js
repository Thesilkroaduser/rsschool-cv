import './styles/style.css';
import Soundfile from './assets/sound/bg_music.mp3';
import SpaceShipImage from './assets/img/spaceship.png';
import Meteor from './meteor';

const bgSound = new Audio();
bgSound.src = Soundfile;
document.body.prepend(bgSound);

let hp = 4;
const operation = '*';
const min = 1;
const max = 99;

const gameField = document.querySelector('.game__field');
const spaceShip = new Image();
spaceShip.src = SpaceShipImage;
spaceShip.classList.add('spaceship');
gameField.appendChild(spaceShip);

const inputArea = document.querySelector('.input');

function getRandomNumber(minValue, maxValue) {
  const random = minValue - 0.5 + Math.random() * (maxValue - minValue + 1);
  return Math.round(random);
}

function createContent(operationSign) {
  let firstOperand;
  let secondOperand;
  switch (operation) {
    case '-':
      firstOperand = getRandomNumber(min, max);
      secondOperand = getRandomNumber(min, firstOperand);
      break;
    case '*':
      firstOperand = getRandomNumber(min, max);
      secondOperand = getRandomNumber(min, 10);
      break;
    case '/':
      firstOperand = getRandomNumber(min, max);
      while (firstOperand % secondOperand !== 0) {
        secondOperand = getRandomNumber(1, 10);
      }
      break;
    default:
      firstOperand = getRandomNumber(min, max);
      secondOperand = getRandomNumber(min, max);
      break;
  }
  return `${firstOperand}${operationSign}${secondOperand}`;
}

function updateHealthPoints() {
  const point = document.getElementById(`point${hp}`);
  point.hidden = true;
  hp -= 1;
}

function controlMeteor(object) {
  if (object instanceof Meteor) {
    const timerId = setInterval(() => {
      // eslint-disable-next-line no-param-reassign
      object.startPosition += 5;
      // eslint-disable-next-line no-param-reassign
      object.structure.style.top = `${object.startPosition}px`;
      if (object.startPosition > 440) {
        object.blowUpMeteor();
        clearInterval(timerId);
        updateHealthPoints();
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
  if (e.target.className === 'button') {
    inputArea.textContent = e.target.textContent;
  }
}

window.addEventListener('click', handleUser);

startGame();
