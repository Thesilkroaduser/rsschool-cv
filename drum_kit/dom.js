const runDrumkit = () => {
    function playSound(e) {
        const buttons = document.querySelectorAll('.buttons__item');

        // Set an audio file depending on the event
        const sound = document.querySelector(`audio[data-key="${e.type === 'keydown' ? e.keyCode : e.target.hasAttribute('id') ? e.target.getAttribute("id") : e.target.parentNode.getAttribute("id")}"]`); 

        // Set an active button depending on the event
        const activeButton = document.querySelector(`.buttons__item[id="${e.type === 'keydown' ? e.keyCode : e.target.hasAttribute('id') ? e.target.getAttribute("id") : e.target.parentNode.getAttribute("id")}"]`);
        if(!sound) {
            return;
        };
        buttons.forEach(button => {
            button.classList.remove('active__item');
        });
        activeButton.classList.add('active__item');
        sound.currentTime = 0;
        sound.play();
    }

    window.addEventListener('keydown', playSound);
    window.addEventListener('click', playSound);
};

runDrumkit();