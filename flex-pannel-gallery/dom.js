function runGallery() {
    function switchToOpen(e) {
        let panel = e.target.hasAttribute('class') ? e.target : e.target.parentElement;
        if (panel.classList.contains('open')) {
            panel.classList.remove('open');
        }    
        else {
            let opendPanel = document.querySelector('.open');
            if (opendPanel != null) {
                opendPanel.classList.remove('open');
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