'use strict'

class Champagne {
    #modalButtons = document.querySelectorAll('.card__modal-button');
    #modalOverlay = document.querySelector('.overlay');
    #slides = document.querySelectorAll('.slide');
    #activeModal;
    constructor() {
        this._showModal();
        this._hideModal();
        this._slider();
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

    _slider() {
        const buttonBack = document.querySelector('.slider__previous');
        const buttonForward = document.querySelector('.slider__next')
        let currSlide = 0;
        const slideLength = this.#slides.length - 1
        this.#slides.forEach((slide, i) => slide.style.transform = `translateX(${(i - currSlide) * 100}%)`)

        buttonBack.addEventListener('click', (e) => {
            currSlide--
            currSlide = currSlide < 0 ? currSlide = 0 : currSlide
            this._moveToSlide(currSlide)
            
        });

        buttonForward.addEventListener('click', (e) => {
            currSlide++
            currSlide = currSlide > slideLength ? slideLength : currSlide
            this._moveToSlide(currSlide)
        });
    };

    _moveToSlide(slide) {
        this.#slides.forEach((sli, i) => sli.style.transform = `translateX(${(i - slide) * 100}%)`) 
    }
};

const champagne = new Champagne;

