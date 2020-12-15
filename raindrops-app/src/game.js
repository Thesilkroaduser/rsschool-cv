import { createSpaceship, createBackgroundMusic, createHealthPoints } from './helpers';
import spaceshipImage from './assets/img/spaceship.png';
import soundFile from './assets/sound/bg_music.mp3';
import healthIcon from './assets/img/heart.svg';
import gameSettings from './gameSettings';

export default class Game {
  constructor() {
    this.gameConfig = Object.assign(gameSettings);
    this.playerHealth = this.gameConfig.hp;
  }

  // eslint-disable-next-line class-methods-use-this
  prepareGameField() {
    createSpaceship(spaceshipImage);
    createBackgroundMusic(soundFile);
    createHealthPoints(this.playerHealth, healthIcon);
  }

  // eslint-disable-next-line class-methods-use-this
  endGame(bgMusic) {
    const menu = document.getElementById('mainMenu');
    menu.classList.remove('hidden');
    bgMusic.currentTime = 0;
    bgMusic.pause();
  }

  // eslint-disable-next-line class-methods-use-this
  resetPreviousGame(options) {
    const score = document.querySelector('.score__points');
    const speed = document.getElementById('speed');
    const max = document.getElementById('maxNum');
    options.hp = 4;
    options.solution = -10;
    options.speed = +speed.value / 100;
    options.max = +max.value;
    score.textContent = 0;
    const healthArray = document.querySelectorAll('.health__point');
    healthArray.forEach((point) => point.hidden = false);
  }
}
