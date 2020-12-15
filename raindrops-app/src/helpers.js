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

export const createBackgroundMusic = (path) => {
  const music = createElement('audio', {
    id: 'bgSound',
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
