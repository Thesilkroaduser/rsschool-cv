const burger_opening = document.querySelector('.burger-opening');
const hidden_menu = document.querySelector('.burger-menu__hidden');
const hidden_button = document.querySelector('.vertical__hidden');
const home = document.querySelector('#burger-home');
const services = document.querySelector('#burger-serv');
const portfolio = document.querySelector('#burger-port');
const about = document.querySelector('#burger-about');
const contacts = document.querySelector('#burger-contact');

const buttons = document.querySelectorAll('.burger__link')

burger_opening.addEventListener('click', () => {
    hidden_menu.classList.remove('burger-menu__hidden');
    hidden_button.classList.remove('vertical__hidden');
    hidden_button.classList.add('vertical__active');
    hidden_menu.classList.add('burger-menu__active');
})

home.addEventListener('click', () => { 
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
})

services.addEventListener('click', () => {
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
})

portfolio.addEventListener('click', () => {
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
})

about.addEventListener('click', () => {
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
})

contacts.addEventListener('click', () => {
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
})

hidden_button.addEventListener('click', () => {
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
})