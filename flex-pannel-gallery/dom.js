function runGallery() {
    function switchToOpen(e) {
        const panel = e.target.hasAttribute('class') ? e.target : e.target.parentElement;
        if (panel.classList.contains('open')) {
            panel.classList.remove('open');
        }    
        else {
            const openedPanel = document.querySelector('.open');
            if (openedPanel) {
                openedPanel.classList.remove('open');
            }
            panel.classList.add('open');
        }
    };

    function switchToOpenActive(e) {
        if (e.propertyName.includes('flex')) {
            e.target.classList.toggle('open-active');
        };
    };

    window.addEventListener('click', switchToOpen);
    window.addEventListener('transitionend', switchToOpenActive );
};

runGallery();
