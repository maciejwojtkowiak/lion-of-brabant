'use strict'

class Champagne {
    #modalButtons = document.querySelectorAll('.card__modal-button')
    #modalWindows = document.querySelector('.modal')
    #modalOverlay = document.querySelector('.overlay')
    #activeModal;
    constructor() {
        this._showModal();
        this._hideModal();
    }

    _showModal() {
        this.#modalButtons.forEach(but => but.addEventListener('click', (e) => {
            const clicked = e.target.closest('.card__modal-button');
            if (!clicked) return;
            this.#activeModal = document.querySelector(`.modal--${clicked.dataset.but}`);
            this._modalToggleClasses();
        }));
    };

    _hideModal() {
        this.#modalOverlay.addEventListener('click', (e) => {
           if(e.target.closest('.overlay')) {
            this._modalToggleClasses();
           };
        });
    };

    _modalToggleClasses() {
        this.#modalOverlay.classList.toggle('hidden')
        this.#activeModal.classList.toggle('hidden')
    };
};

const champagne = new Champagne;