import './styles/style.css';
import soundfile from './assets/sound/bg_music.mp3';
// import Meteor from './meteor';

const sound = new Audio(soundfile);
sound.play();
const meteor = document.getElementById('meteor');

function hideMeteor() {
  meteor.style.display = 'none';
}

function blowUpMeteor() {
  meteor.textContent = '';
  meteor.classList.add('boom');
  setTimeout(hideMeteor, 900);
}

blowUpMeteor();
