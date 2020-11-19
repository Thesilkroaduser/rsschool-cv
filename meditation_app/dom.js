const app = () => {
    const music = document.querySelector('.music');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.getElementById('video');

    // Timer
    const minutesArea = document.querySelector('.minutes');
    const secondsArea = document.querySelector('.seconds')

    // Moving-outline length
    const outlineLength = outline.getTotalLength();

    // Time duration
    let defaultDuration = 600;

    // Music repetition counter
    let counter = 0;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    function changeMusicType(id) {
        let typeButton = document.getElementById(id).parentElement;
        music.src = typeButton.getAttribute("data-sound");
        video.src = typeButton.getAttribute("data-video");
        checkPlaying(music);
        console.log(typeButton);
    };

    // Replay
    function replaySound() {
        counter = 0;
        music.currentTime = 0;
        video.currentTime = 0;
        music.play();
        video.play();
        play.src = './assets/img/pause.svg';

    };

    function setDuration(id) {
        let mins = +minutesArea.textContent;
        if (id === 'plus') {
            defaultDuration += 60;
            if (defaultDuration > 3600) {
                defaultDuration = 3600;
            }
            if (music.paused) {
                minutesArea.textContent = `${(mins + 1) < 10 ? '0' + (mins + 1) : (mins + 1)}`;
            } 
        }
        else if (id === 'minus') {
            defaultDuration -= 60; 
            if (defaultDuration < 60) {
                defaultDuration = 60;
            }
            if (music.paused && defaultDuration > 60) {
                minutesArea.textContent = `${(mins - 1) < 10 ? '0' + (mins - 1) : (mins - 1)}`;
            } 
            else if (music.paused) {
                minutesArea.textContent = '01';   
            }
        }
    };

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
        let time = music.currentTime + counter;
        let elapsed = defaultDuration - time;
        let secs = Math.floor(elapsed % 60);
        let mins = Math.floor(elapsed / 60);
        console.log(time);
        if (music.currentTime == music.duration) {
            counter += music.duration;
            music.currentTime = 0;
            music.play();
        };  
        // Cirlce animation
        let progress = outlineLength - (time / defaultDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Timer animation
        minutesArea.textContent = `${(mins / 10) >= 1 ? mins : '0' + mins}`;
        secondsArea.textContent = `${(secs / 10) >= 1 ? secs : '0' + secs}`;

        if (elapsed <= 0) {
            music.pause();
            outline.style.strokeDashoffset = 0;
            secs = 0;
            music.currentTime = 0;
            play.src = './assets/img/play.svg';
            video.pause();
        };
    };

    function handleMouse(e) {
        if (e.target.id === 'replay') {
            replaySound();
        }
        else if (e.target.id === 'play') {
            checkPlaying(music);
        }
        else if (e.target.id === 'typeRain' || e.target.id === 'typeSun') {
            changeMusicType(e.target.id);
        }
        else if (e.target.id === 'plus' || e.target.id === 'minus') {
            setDuration(e.target.id);
        }
    };

    window.addEventListener('click', handleMouse);
};

app();