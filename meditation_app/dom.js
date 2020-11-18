const app = () => {
    const music = document.querySelector('.music');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.getElementById('video');
    const replay = document.querySelector('.replay');

    // Types of sounds
    const musicTypes = document.querySelectorAll('.misic-type');
    // Timer
    const timer = document.querySelector('.timer');
    // Moving-outline length
    const outlineLength = outline.getTotalLength();
    // Time selector
    const timeSelectors = document.querySelectorAll('.time-selector__item');
    // Time duration
    let maxDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // Change music
    musicTypes.forEach(musicType => {
        musicType.addEventListener('click', () => {
            music.src = musicType.getAttribute("data-sound");
            video.src = musicType.getAttribute("data-video");
            checkPlaying(music);
        });
    });

    // Play music
    play.addEventListener('click', () => {
        checkPlaying(music);
    });

    // Replay music
    replay.addEventListener('click', () => {
        music.currentTime = 0;
        video.currentTime = 0;
    });

    // Change duration 
    timeSelectors.forEach(selector => {
        selector.addEventListener('click', () => {
            maxDuration = selector.getAttribute("data-time");  
            music.currentTime = 0;
            video.currentTime = 0;
            timer.textContent = `${Math.floor(maxDuration / 60)}:${Math.floor(maxDuration % 60)}`;
        });
    });

    // Function to stop & play music
    const checkPlaying = music => {
        if (music.paused) {
            music.play();
            video.play();
            play.src = './assets/img/pause.svg';
        }
        else {
            music.pause();
            video.pause();
            play.src = './assets/img/play.svg';
        }
    }

    // Animation
    music.ontimeupdate = () => {
        let time = music.currentTime;
        let elapsed = maxDuration - time;
        let secs = Math.floor(elapsed % 60);
        let mins = Math.floor(elapsed / 60);
        
        // Cirlce animation
        let progress = outlineLength - (time / maxDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // Timer animation
        timer.textContent = `${mins}:${(secs / 10) >= 1 ? secs : '0' + secs}`;
        if (time >= maxDuration) {
            music.pause();
            music.currentTime = 0;
            play.src = './assets/img/play.svg';
            video.pause();
        }
    };
};

app();