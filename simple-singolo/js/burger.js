const main_content = document.querySelector('.main');
const footer = document.querySelector('.footer');
const burger_opening = document.querySelector('.burger-opening');
const hidden_menu = document.querySelector('.burger-menu__hidden');
const burger_list = document.querySelector('.menu__list')
const hidden_button = document.querySelector('.vertical__hidden');
const home = document.querySelector('#home');
const services = document.querySelector('#serv');
const portfolio = document.querySelector('#port');
const about = document.querySelector('#about');
const contacts = document.querySelector('#contact');
const buttons = document.querySelectorAll('.burger__link')

const header = document.querySelector('.header');

burger_opening.addEventListener('click', () => {
    hidden_menu.classList.remove('menu');
    burger_list.classList.remove('menu__list');
    hidden_menu.classList.remove('burger-menu__hidden');
    hidden_button.classList.remove('vertical__hidden');
    hidden_button.classList.add('vertical__active');
    hidden_menu.classList.add('burger-menu__active');
    document.body.classList.add('no-scroll');
})

home.addEventListener('click', () => {
    hidden_menu.classList.add('menu');
    burger_list.classList.add('menu__list');
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
    document.body.classList.remove('no-scroll');
})

services.addEventListener('click', () => {
    hidden_menu.classList.add('menu');
    burger_list.classList.add('menu__list');
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
    document.body.classList.remove('no-scroll');
})

portfolio.addEventListener('click', () => {
    hidden_menu.classList.add('menu');
    burger_list.classList.add('menu__list');
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
    document.body.classList.remove('no-scroll');
})

about.addEventListener('click', () => {
    hidden_menu.classList.add('menu');
    burger_list.classList.add('menu__list');
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
    document.body.classList.remove('no-scroll');
})

contacts.addEventListener('click', () => {
    hidden_menu.classList.add('menu');
    burger_list.classList.add('menu__list');
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
    document.body.classList.remove('no-scroll');
})

hidden_button.addEventListener('click', () => {
    hidden_menu.classList.add('menu');
    burger_list.classList.add('menu__list');
    hidden_menu.classList.add('burger-menu__hidden');
    hidden_button.classList.add('vertical__hidden');
    document.body.classList.remove('no-scroll');
})