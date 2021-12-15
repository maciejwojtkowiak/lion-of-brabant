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
        this._fixedNavbar();
        this._smoothScroll();
       
    }

    _showModal() {
        this.#modalButtons.forEach(but => but.addEventListener('click', (e) => {
            const clicked = e.target.closest('.card__modal-button');
            if (!clicked) return;
            this.#activeModal = document.querySelector(`.modal--${clicked.dataset.but}`);
            this._modalToggleClasses();
            document.body.style.overflow = "hidden"
            
        }));
    };

    _hideModal() {
        this.#modalOverlay.addEventListener('click', (e) => {
           if(e.target.closest('.overlay')) {
            this._modalToggleClasses();
            document.body.style.overflow = "visible"
            
           };
        });
    };

    _modalToggleClasses() {
        this.#modalOverlay.classList.toggle('hidden');
        this.#activeModal.classList.toggle('hidden');
    };

    _slider() {
        const buttonBack = document.querySelector('.slider__previous');
        const buttonForward = document.querySelector('.slider__next');
        let currSlide = 0;
        const slideLength = this.#slides.length - 1
        this.#slides.forEach((slide, i) => slide.style.transform = `translateX(${(i - currSlide) * 100}%)`);

        buttonBack.addEventListener('click', (e) => {
            currSlide--
            currSlide = currSlide < 0 ? currSlide = slideLength : currSlide;
            this._moveToSlide(currSlide);
            
        });

        buttonForward.addEventListener('click', (e) => {
            currSlide++
            currSlide = currSlide > slideLength ? 0 : currSlide;
            this._moveToSlide(currSlide);
        });
    };

    _moveToSlide(slide) {
        this.#slides.forEach((sli, i) => sli.style.transform = `translateX(${(i - slide) * 100}%)`) ;
    }

    _fixedNavbar() {
        const navbar =  document.querySelector('.navbar');
        const main = document.querySelector('.header');
        const navHeight = navbar.getBoundingClientRect().height;
    
        const callback = function(entries, observer) {
            const [entry] = entries;
            console.log(entry)
            if (!entry.isIntersecting) {
                console.log('ser');
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky') ;
            };
        };
        let observer = new IntersectionObserver(callback,{
            root: null,
            threshold: 0,
            rootMargin: `-${navHeight}px`,
          });
          ;
    
        observer.observe(main);
    
    };

    _smoothScroll() {
        const buttons = document.querySelectorAll('.navbar__link');
        buttons.forEach(but => {
            but.addEventListener('click', (e) => {
                e.preventDefault()
                const anchorLink = but.getAttribute('href');
                const sectionToScroll = document.querySelector(anchorLink);
                const sectionCord = sectionToScroll.getBoundingClientRect()
                const navbar =  document.querySelector('.navbar');
                const navHeight = navbar.getBoundingClientRect().height
                sectionToScroll.scrollIntoView({behavior: 'smooth'})
                // smooth scrolling, ignoring navbar which prevents from overlapping section.
                window.scrollTo({
                    top: sectionCord.top + window.pageYOffset - navHeight,
                    left: sectionCord.left + window.pageXOffset,
                    behavior: 'smooth',
                  });
            })
        });
    };
    
};

const champagne = new Champagne;






   

   
        

