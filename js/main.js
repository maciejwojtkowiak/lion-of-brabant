'use strict'

class Champagne {
    #modalButtons = document.querySelectorAll('.card__modal-button')
    #modalWindows = document.querySelector('#modal--3')
    constructor() {
        this.showModal();
    }

    showModal() {
        this.#modalButtons.forEach(but => but.addEventListener('click', (e) => {
            console.log('hello')
            this.#modalWindows.classList.toggle('hidden')
        }));
    };
};

const champagne = new Champagne;