const all = document.querySelector('#all');
const web_design = document.querySelector('#web_design');
const graphic_design = document.querySelector('#graphic_design');
const artwork = document.querySelector('#artwork');
const shuffle_container = document.querySelector('#shuffle');

function shuffle(container) {
    for (var i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
}

all.addEventListener('click', () => {
    web_design.classList.remove('active_item');
    graphic_design.classList.remove('active_item');
    artwork.classList.remove('active_item');
    all.classList.add('active_item');
    shuffle(shuffle_container);
});

web_design.addEventListener('click', () => {
    all.classList.remove('active_item');
    graphic_design.classList.remove('active_item');
    artwork.classList.remove('active_item');
    web_design.classList.add('active_item');
    shuffle(shuffle_container);
});

graphic_design.addEventListener('click', () => {
    web_design.classList.remove('active_item');
    all.classList.remove('active_item');
    artwork.classList.remove('active_item');
    graphic_design.classList.add('active_item');
    shuffle(shuffle_container);
});

artwork.addEventListener('click', () => {
    web_design.classList.remove('active_item');
    graphic_design.classList.remove('active_item');
    all.classList.remove('active_item');
    artwork.classList.add('active_item');
    shuffle(shuffle_container);
});
