function runPannels() {
    const panels = document.querySelectorAll('.panels__item');

    function switchToOpen() {
        if (this.classList.contains('open')) {
            this.classList.remove('open');
        }    
        else {
            panels.forEach(panel => panel.classList.remove('open'));
            this.classList.add('open');
        }
    };

    function switchToOpenActive(e) {
        if (e.propertyName.includes('flex')) {
            this.classList.toggle('open-active');
        };
    };

    panels.forEach(panel => panel.addEventListener('click', switchToOpen));
    panels.forEach(panel => panel.addEventListener('transitionend', switchToOpenActive));
};

runPannels();