import {
  createSpaceship, createMusic, createHealthPoints, highlightInputArea,
  demo1Creator, demo2Creator,
} from './helpers';
import spaceshipImage from './assets/img/spaceship.png';
import bgSoundFile from './assets/sound/bg_music.mp3';
import wrongSoundFile from './assets/sound/wrong.mp3';
import bubbleSoundFile from './assets/sound/bubble.mp3';
import steelSoundFile from './assets/sound/steel.mp3';
import healthIcon from './assets/img/heart.svg';
import gameSettings from './gameSettings';
import gameStat from './stat';

export default class Game {
  constructor() {
    this.gameConfig = Object.assign(gameSettings);
    this.stat = Object.assign(gameStat);
  }

  // eslint-disable-next-line class-methods-use-this
  prepareGameField() {
    createSpaceship(spaceshipImage);
    createMusic(bgSoundFile, 'bgSound');
    createMusic(wrongSoundFile, 'wrongSound');
    createMusic(bubbleSoundFile, 'bubbleSound');
    createMusic(steelSoundFile, 'steelSound');
    createHealthPoints(this.gameConfig.hp, healthIcon);
  }

  runTimer() {
    const timerID = setInterval(() => {
      this.stat.time += 1;
      if (this.gameConfig.hp === 0) {
        clearInterval(timerID);
      }
    }, 1000);
  }

  showStat() {
    this.stat.answersPerMin = this.stat.rightAnswers / (this.stat.time / 60);
    const total = this.stat.rightAnswers + this.stat.wrongAnswers;
    if (total) {
      this.stat.accuracy = (this.stat.rightAnswers * 100) / total;
    } else {
      this.stat.accuracy = 0;
    }
    const perMinute = document.getElementById('perMin');
    const totalRight = document.getElementById('total');
    const overall = document.getElementById('overall');
    perMinute.textContent = ` ${this.stat.answersPerMin.toFixed(2)}`;
    totalRight.textContent = ` ${this.stat.rightAnswers}`;
    overall.textContent = ` ${this.stat.accuracy.toFixed(1)}%`;
    const stat = document.getElementById('stat');
    stat.classList.remove('hidden');
  }

  checkAnswer(music) {
    const score = document.querySelector('.score__points');
    if (!this.gameConfig.keys.includes(this.gameConfig.solution, 0)) {
      highlightInputArea();
      music.currentTime = 0;
      music.play();
      this.stat.wrongAnswers += 1;
      if (parseFloat(score.textContent) !== 0) {
        score.textContent = parseFloat(score.textContent) - 10;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  endGame(bgMusic) {
    bgMusic.currentTime = 0;
    bgMusic.pause();
  }

  // eslint-disable-next-line class-methods-use-this
  resetPreviousGame() {
    const score = document.querySelector('.score__points');
    const speed = document.getElementById('speed');
    const max = document.getElementById('maxNum');
    this.gameConfig.keys.length = 0;
    this.gameConfig.hp = 4;
    this.gameConfig.solution = -10;
    this.gameConfig.speed = +speed.value / 100;
    this.gameConfig.max = +max.value;
    score.textContent = 0;
    const healthArray = document.querySelectorAll('.health__point');
    healthArray.forEach((point) => point.hidden = false);
  }

  increaseLevel() {
    const timerId = setInterval(() => {
      if (this.gameConfig.hp === 0) {
        clearInterval(timerId);
      }
      this.gameConfig.speed += 0.25;
      this.gameConfig.max += 5;
    }, 10000);
  }

  startGame(sound, mouseHandler, keyHandler, creator) {
    const menu = document.getElementById('mainMenu');
    this.resetPreviousGame();
    menu.classList.add('hidden');
    if (this.gameConfig.keyboard) {
      window.addEventListener('keydown', keyHandler);
    } else { window.addEventListener('click', mouseHandler); }
    sound.play();
    this.increaseLevel();
    this.runTimer();
    creator();
    const timerId = setInterval(() => {
      if (this.gameConfig.hp === 0) {
        clearInterval(timerId);
        return;
      }
      creator();
    }, 2000);
  }

  // eslint-disable-next-line class-methods-use-this
  startDemo1(mouseHandler) {
    window.addEventListener('click', mouseHandler);
    const timerId = setInterval(() => {
      demo1Creator(timerId, mouseHandler);
    }, 2000);
  }

  // eslint-disable-next-line class-methods-use-this
  startDemo2(mouseHandler) {
    window.addEventListener('click', mouseHandler);
    const timerId = setInterval(() => {
      demo2Creator(timerId, mouseHandler);
    }, 3500);
  }
}
