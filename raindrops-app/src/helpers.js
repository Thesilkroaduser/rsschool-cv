import Meteor from './meteor';

const keysNumbers = [8, 13, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

export const createElement = (tagName, options = {}) => {
  const element = document.createElement(tagName);
  Object.keys(options).forEach((key) => {
    element[key] = options[key];
  });
  return element;
};

export const createSpaceship = (path) => {
  const gameField = document.querySelector('.game__field');
  const img = createElement('img', {
    className: 'spaceship',
    src: path,
  });

  gameField.append(img);
};

export const createMusic = (path, mucisId) => {
  const music = createElement('audio', {
    id: mucisId,
    src: path,
  });

  document.body.append(music);
};

export const createHealthPoints = (hp, path) => {
  const healthArea = document.querySelector('.health');
  for (let i = 1; i <= hp; i += 1) {
    const img = createElement('img', {
      className: 'health__point',
      src: path,
    });

    healthArea.append(img);
  }
};

export const getRandomNumber = (minValue, maxValue) => {
  const random = minValue + Math.random() * (maxValue + 1 - minValue);
  return Math.floor(random);
};

export const createContent = (gameSettings) => {
  let firstOperand;
  let secondOperand;
  let result;
  switch (gameSettings.operation) {
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
  const content = `${firstOperand}${gameSettings.operation}${secondOperand}`;
  return [content, result];
};

export const highlightInputArea = () => {
  const inputArea = document.querySelector('.input');
  inputArea.classList.add('highlight');
  setTimeout(() => { inputArea.classList.remove('highlight'); }, 100);
};

export const highlightButton = (e) => {
  if (e.type === 'click') {
    if (e.target.className.includes('button')) {
      e.target.classList.add('active_button');
      setTimeout(() => { e.target.classList.remove('active_button'); }, 100);
    }
  } else if (e.type === 'keydown' && keysNumbers.includes(e.which)) {
    const activeButton = document.getElementById(`${e.which}`);
    activeButton.classList.add('active_button');
    setTimeout(() => { activeButton.classList.remove('active_button'); }, 100);
  }
};

export const demo1Creator = (timerId, mouseHandler) => {
  const bubblegSound = document.getElementById('bubbleSound');
  const field = document.getElementById('field3');
  const button5 = document.getElementById('53');
  const buttonEnter = document.getElementById('13');
  const buttonNext = document.getElementById('toSecondSlide');
  const event = new Event('click', { bubbles: true });
  const demoMeteorContent = ['2+3', 5];
  const demoMeteor = new Meteor(demoMeteorContent);
  field.append(demoMeteor.structure);
  setInterval(() => {
    demoMeteor.startPosition += 1;
    demoMeteor.structure.style.top = `${demoMeteor.startPosition}px`;
  }, 10);
  const timer1 = setTimeout(() => {
    button5.dispatchEvent(event);
    setTimeout(() => {
      buttonEnter.dispatchEvent(event);
      setTimeout(() => { demoMeteor.blowUpMeteor([5], bubblegSound); }, 150);
    }, 500);
  }, 2000);
  function stopDemo() {
    clearInterval(timerId);
    clearTimeout(timer1);
    window.removeEventListener('click', mouseHandler);
    demoMeteor.hideMeteor();
  }
  buttonNext.addEventListener('click', stopDemo);
};

export const demo2Creator = (timerId, mouseHandler) => {
  const bubblegSound = document.getElementById('bubbleSound');
  const button5 = document.getElementById('53');
  const buttonEnter = document.getElementById('13');
  const buttonNext = document.getElementById('toMenu');
  const event = new Event('click', { bubbles: true });
  const demoMeteorContent1 = ['16+5', 21];
  const demoMeteorContent2 = ['8+12', 20];
  const demoMeteorContent3 = ['2+3', 5];
  const demoMeteor1 = new Meteor(demoMeteorContent1);
  const demoMeteor2 = new Meteor(demoMeteorContent2);
  const demoMeteor3 = new Meteor(demoMeteorContent3);
  const meteors = [demoMeteor1, demoMeteor2, demoMeteor3];
  demoMeteor3.structure.classList.add('golden-meteor');
  for (let i = 0; i < 3; i += 1) {
    const field = document.getElementById(`field${i + 1}`);
    field.append(meteors[i].structure);
    setInterval(() => {
      meteors[i].startPosition += 1;
      meteors[i].structure.style.top = `${meteors[i].startPosition}px`;
    }, 10);
  }
  const timer1 = setTimeout(() => {
    button5.dispatchEvent(event);
    setTimeout(() => {
      buttonEnter.dispatchEvent(event);
      setTimeout(() => {
        meteors.forEach((meteor) => meteor.blowUpMeteor([5], bubblegSound));
      }, 150);
    }, 500);
  }, 2000);
  function stopDemo() {
    clearInterval(timerId);
    clearTimeout(timer1);
    window.removeEventListener('click', mouseHandler);
    meteors.forEach((meteor) => meteor.hideMeteor());
  }
  buttonNext.addEventListener('click', stopDemo);
};
