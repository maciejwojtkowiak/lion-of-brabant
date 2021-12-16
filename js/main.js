'use strict'

class Champagne {
    #modalButtons = document.querySelectorAll('.modal-button');
    #modalOverlay = document.querySelector('.overlay');
    #slides = document.querySelectorAll('.slide');
    #activeModal;
    constructor() {
        this._fadeLink();
        this._showModal();
        this._hideModal();
        this._slider();
        this._fixedNavbar();
        this._smoothScroll();
       
    }

    _fadeLink() {
        const navbar = document.querySelector('.navbar');
        navbar.addEventListener('mouseover', (e) => {
            console.log('click')
            if (e.target.classList.contains('navbar__link')) {
                const link = e.target;
                console.log(link)
                if (!link) return;
                const siblings = link.closest('.navbar').querySelectorAll('.navbar__link');
                siblings.forEach(sib => sib.style.opacity = "0.5")
                link.style.opacity = "1"
                console.log(siblings)
            };
        });
    };

    _showModal() {
        this.#modalButtons.forEach(but => but.addEventListener('click', (e) => {
            const clicked = e.target.closest('.modal-button');
            if (!clicked) return;
            this.#activeModal = document.querySelector(`.modal--${clicked.dataset.but}`);
            this._modalToggleClasses();
            document.body.style.overflow = "hidden";
            
        }));
    };

    _hideModal() {
        const overlay = document.querySelector('.overlay')
        this.#modalOverlay.addEventListener('click', (e) => {
           if(e.target.closest('.overlay')) {
            this._modalToggleClasses();
            document.body.style.overflow = "visible";
            
           };
        });

        document.addEventListener('keydown', (e) => {
            if (!overlay.classList.contains('hidden') && e.key === "Escape")
                this._modalToggleClasses();
                document.body.style.overflow = "visible";
        });
    };

    _modalToggleClasses() {
        this.#modalOverlay.classList.toggle('hidden');
        this.#activeModal.classList.toggle('hidden');
    };

    _slider() {
        const buttonBack = document.querySelector('.slider__previous');
        const buttonForward = document.querySelector('.slider__next');
        const slideLength = this.#slides.length - 1

        let currSlide = 0;
        this._moveToSlide(currSlide)

        setInterval(() => {
            currSlide = this._goToNextSlide(currSlide, slideLength);
            this._moveToSlide(currSlide);
        }, 15000)

        
        buttonBack.addEventListener('click', (e) => {
            currSlide = this._goToPreviousSlide(currSlide, slideLength);
            this._moveToSlide(currSlide);  
        });

        buttonForward.addEventListener('click', (e) => {
            currSlide = this._goToNextSlide(currSlide, slideLength);
            this._moveToSlide(currSlide);
        });
    };

    _moveToSlide(slide) {
        this.#slides.forEach((sli, i) => sli.style.transform = `translateX(${(i - slide) * 100}%)`) ;
    }

    _goToNextSlide(slide, length) {
        slide++;
        return slide = slide > length ? 0 : slide;
    }

    _goToPreviousSlide(slide, length) {
        slide--;
        return slide = slide < 0 ? slide = length : slide;
    }

    _fixedNavbar() {
        const navbar =  document.querySelector('.navbar');
        const main = document.querySelector('.header');
        const navHeight = navbar.getBoundingClientRect().height;
    
        const callback = function(entries, observer) {
            const [entry] = entries;
            if (!entry.isIntersecting) {
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
                const sectionCord = sectionToScroll.getBoundingClientRect();
                const navbar =  document.querySelector('.navbar');
                const navHeight = navbar.getBoundingClientRect().height;
                sectionToScroll.scrollIntoView({behavior: 'smooth'});
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






   

   
        

