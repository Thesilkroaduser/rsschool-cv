const drum = () => {

    // Play sound with keyboard
    function playSoundWithKeyboar(e)  {
        const sound = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const buttons = document.querySelectorAll('.buttons__item');
        const activeButton = document.querySelector(`.buttons__item[id="${e.keyCode}"]`);
        if(!sound) {
            return;
        };
        buttons.forEach(button => {
            button.classList.remove('actve__item');
        });
        activeButton.classList.add('actve__item');
        sound.currentTime = 0;
        sound.play();
    }

    // Play sound with mouse
    const buttons = document.querySelectorAll('.buttons__item');
    buttons.forEach(button => button.addEventListener('click', () =>{
        const sound = document.querySelector(`audio[data-key="${button.getAttribute("id")}"]`);
        sound.currentTime = 0;
        sound.play();
        buttons.forEach(button => {
            button.classList.remove('actve__item');
        });
        button.classList.add('actve__item');
    }));

    window.addEventListener('keydown', playSoundWithKeyboar);
};

drum();