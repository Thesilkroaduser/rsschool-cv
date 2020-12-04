const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggleButton = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const volumeRange = player.querySelector(".player__slider");
const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed__bar');

progressBar.style.flexBasis = 0;

// Stop-play video & Update Icon
function checkPlaying() {
  if (!video.paused) {
    video.pause();
    toggleButton.textContent = "►";
  }
  else {
    video.play();
    toggleButton.textContent = "❚ ❚";
  }
}

function rebutVideo() {
  video.currentTime = 0;
  video.pause();
  toggleButton.textContent = "►";
}

// Skip 5 secs
function skip() {
  video.currentTime += parseInt(this.dataset.skip);
}

// Set Volume
function handleRangeUpdate() {
  video[this.name] = this.value;
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// Change current time
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Set playback rate
function handleSpeedBar(e) {
  const percent = e.offsetX / speed.offsetWidth;
  const min = 0.4;
  const max = 3;
  const playBackRate = percent * (max + min) + min;
  const width = Math.round(percent * 100) + '%';
  speedBar.style.flexBasis = width;
  speedBar.textContent = 'x' + playBackRate.toFixed(1);
  video.playbackRate = playBackRate;
}

let mousedown = false;

video.addEventListener("click", checkPlaying);
video.addEventListener("ended", rebutVideo);
video.addEventListener("timeupdate", handleProgress);

toggleButton.addEventListener("click", checkPlaying);
skipButtons.forEach(button => button.addEventListener("click", skip));
volumeRange.addEventListener("change", handleRangeUpdate);
volumeRange.addEventListener("mousemove", handleRangeUpdate);

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
window.addEventListener("mouseup", () => mousedown = false);
speed.addEventListener('mousemove', handleSpeedBar);
