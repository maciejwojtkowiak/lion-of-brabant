'use strict'

class Champagne {
    #modalButtons = document.querySelectorAll('.modal-button');
    #modalOverlay = document.querySelector('.overlay');
    #slides = document.querySelectorAll('.slide');
    #navbar = document.querySelector('.navbar')
    #specialOfferCloseButton = document.querySelector('.special__offer__close-button')
    #specialOfferContactLink = document.querySelector('.special__offer__link')
    #activeModal;
    constructor() {
        this.#navbar.addEventListener('mouseover', (e) => this._fadeLink(e, 0.5))
        this.#navbar.addEventListener('mouseout', (e) => this._fadeLink(e, 1))
        this.#specialOfferCloseButton.addEventListener('click', this._hideOffer)
        this.#specialOfferContactLink.addEventListener('click', this._hideOffer)
        this._showModal();
        this._hideModal();
        this._slider();
        this._fixedNavbar();
        this._smoothScroll();
        this._revealSection();
        this._specialOfferTimer();
        this._createDots();
        this._dotOnClick();
        this._activateDots(0);
        this._specialOfferCloseObserver();
        this._hamburgerMenu();
        
       
    }

    _fadeLink(e, opacity) {
            if (e.target.classList.contains('link')) {
                const link = e.target;
                if (!link) return;
                const siblings = link.closest('.navbar').querySelectorAll('.navbar__link')
                siblings.forEach(sib => (!sib.classList.contains('navbar__logo')) ? sib.style.opacity = opacity : sib.style.opacity = "1")
                link.style.opacity = "1"
                
            };
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
        this._activateDots(currSlide)

        setInterval(() => {
            currSlide = this._goToNextSlide(currSlide, slideLength);
            this._moveToSlide(currSlide);
            this._activateDots(currSlide)
        }, 15000)

        
        buttonBack.addEventListener('click', (e) => {
            currSlide = this._goToPreviousSlide(currSlide, slideLength);
            this._moveToSlide(currSlide); 
            this._activateDots(currSlide)
        });

        buttonForward.addEventListener('click', (e) => {
            currSlide = this._goToNextSlide(currSlide, slideLength);
            this._moveToSlide(currSlide);
            this._activateDots(currSlide)
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
        const navLinks = document.querySelector('.navbar__links')
        const main = document.querySelector('.header');
        const navHeight = navbar.getBoundingClientRect().height;
    
        const stickNavbar = function(entries, observer) {
            const [entry] = entries;
            if (!entry.isIntersecting) {
                navbar.classList.add('sticky');
            } 
            // if there is no hamburger menu then remove sticky
            if (entry.isIntersecting && !navLinks.classList.contains('navbar__links--active')) {
                navbar.classList.remove('sticky');
            }
        };
        let observer = new IntersectionObserver(stickNavbar,{
            root: null,
            threshold: 0,
            rootMargin: `-${navHeight}px`,
          });
          ;
    
        observer.observe(main);
    
    };

    _smoothScroll() {
        const buttons = document.querySelectorAll('.link');
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

    _revealSection() {
        const sections = document.querySelectorAll('.section');
        const options = {
            root: null,
            threshold: 0.15,
            rootMargin: "0px",
        }

        const showSection = ((entries, observer) => {
            const [entry] = entries;
            if (!entry.isIntersecting) return 
            entry.target.classList.toggle('hidden-section')
            observer.unobserve(entry.target)
            
        })

        const sectionFadeIn = new IntersectionObserver(showSection, options);

        sections.forEach(sec => {
            sec.classList.add('hidden-section')
            sectionFadeIn.observe(sec)
        } )
    }

    _specialOfferTimer() {
        const timer = document.querySelector('.special__offer__timer')
        let time = 300
        let minutes = String(Math.trunc(time / 60)).padStart(2, 0);
        let seconds = String((time % 60)).padStart(2, 0);
        timer.textContent =  `${minutes}: ${seconds}`

        setInterval(() => {
            // time in seconds
            if (time >= 0) {
                --time 
                let minutes = String(Math.trunc(time / 60)).padStart(2, 0);
                let seconds = String((time % 60)).padStart(2, 0);
                timer.textContent = `${minutes}: ${seconds}`
            }
            time = time <= 0 ? 130 : time
            
            
        }, 1000)
    }

    _hideOffer() {
        const specialOfferContainer = document.querySelector('.special__offer')
        specialOfferContainer.classList.add('hidden')
    }

    _createDots() {
        const dotContainer = document.querySelector('.slider__dots')
        this.#slides.forEach((_, i) => {
            dotContainer.insertAdjacentHTML('beforeend', `<button class="slider__dot" data-dot="${i}"></button>`)
        })
    }

    _dotOnClick() {
        const dotsContainer = document.querySelector('.slider__dots')
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('slider__dot')) {
               const activeDot = e.target;
               this._moveToSlide(activeDot.dataset.dot)
               const siblings = activeDot.closest('.slider__dots').querySelectorAll('.slider__dot');
               siblings.forEach(sib => sib = sib !== activeDot ?  sib.classList.remove('slider__dot--active') : activeDot.classList.add('slider__dot--active'))
            }
        })
    }
    
    _activateDots(curSlide) {
        const dots = document.querySelectorAll('.slider__dot')
        dots.forEach(dot => dot = Number(dot.dataset.dot) === Number(curSlide) ? dot.classList.add('slider__dot--active') :  dot.classList.remove('slider__dot--active'))
    }


    _specialOfferCloseObserver() {
        const specialOffer = document.querySelector('.special__offer')
        const contact = document.querySelector('.contact')

        const options = {
            root: null,
            threshold: 0.5
        }

        const hideOffer = function(entries, observer) {
            const [entry] = entries;
            if (!entry.isIntersecting) return;
            console.log(entry.target)
            specialOffer.classList.add('hidden')
            observer.unobserve(entry.target)

        }
        const observer = new IntersectionObserver(hideOffer, options)
        observer.observe(contact)
    }

    _hamburgerMenu() {
        const hamburger = document.querySelector('.navbar__hamburger');
        const links = document.querySelector('.navbar__links')
        hamburger.addEventListener('click', () => {
            links.classList.toggle('navbar__links--active');
            this.#navbar.classList.add('sticky')
        })

        links.addEventListener('click', (e) => e.target.classList.contains('navbar__link') ? links.classList.remove('navbar__links--active') : null )
        
    }

    
};

const champagne = new Champagne;






   

   
        

