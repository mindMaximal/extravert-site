document.addEventListener("DOMContentLoaded", ready());

function ready() {

    var popup = (function () {
        return function (selector) {
            var _trigers = document.querySelectorAll(selector);
    
            function popupOpen(elem) {
                var _modal = document.querySelector(elem);
    
                if (_modal.querySelector('.popup__close')) {
                    _modal.querySelector('.popup__close').addEventListener('click', function () {
                        popupClose(elem);
                    });
                }
    
                _modal.addEventListener('click', function (e) {
                    if (e.target.classList.contains('popup')) {
                        popupClose(elem);                 
                    }                
                });
    
                _modal.classList.add('popup--open');
    
                return true;
            }
    
            function popupClose (elem) {
                var _modal = document.querySelector(elem);
    
                _modal.classList.remove('popup--open');   
    
                return true;
            }
    
            for (var i = 0; i < _trigers.length; i++) {
               _trigers[i].addEventListener('click', function (e) {
                   e.preventDefault();
                   var id = this.getAttribute('href');             
                   
                   popupOpen(id);                
               });
            }
    
            return {
                open(id) {
                    popupOpen(id);
                },
                close(id) {
                    popupClose(id);
                }
            }
        }
    }());

    var accordion = (function () {
        return function (selector) {
            var _accordionConteiner = document.querySelector(selector);
            var _trigers = _accordionConteiner.querySelectorAll('.accordion__item');
    
            _trigers.forEach(function (item) {             
                item.addEventListener('click', function () {  
                    var activeClass = 'accordion__item--active';
                    
                    if (this.classList.contains(activeClass)) {
                        this.classList.remove(activeClass);
                    } else {
                        _accordionConteiner.querySelectorAll('.' + activeClass).forEach(function (item) {
                            item.classList.remove(activeClass);
                        });
                        this.classList.add(activeClass);                        
                    }

                });
            });
        }
    }());
    
    //Forms
    function submitHandler(e){    
        e.preventDefault();
        var self = this;
        fetch("mail.php", {
            method: "POST",
            body: new FormData(self)
        }).then(function() {
            if (document.querySelector('.popup-open') != null) {
                var id ='#' + document.querySelector('.popup-open').getAttribute('id');       
                popupContacts.close(id);
            }   
            //popupContacts.open("#popup-success-massage");
            alert('Спасибо, скоро наши специалисты свяжутся с вами');
            self.reset();
        })
        .catch(function(error) { console.log(error); });
    } 

    document.querySelectorAll('.form').forEach(function(element) {
        element.addEventListener('submit', submitHandler);
    });

    //Popups
    if (document.querySelector('.popup-trigger') != null) {
        popupContacts = popup('.popup-trigger');        
    }

    if (document.querySelector('.faq__accordion') != null) {
        faqTab = accordion('.faq__accordion');
    }

    //Scroll to anchor
    try {
        var linkNav = document.querySelectorAll('[href^="#"]'),
        speed = 0.2; 
    
        for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            var w = window.pageYOffset,
                hash = this.href.replace(/[^#]*(.*)/, '$1');

            if (hash == '#') {
                return false;
            }
                
            t = document.querySelector(hash).getBoundingClientRect().top,
                start = null;
            requestAnimationFrame(step);

            function step(time) {
                if (start === null) start = time;
                var progress = time - start,
                    r = (t < 0 ? Math.max(w - progress/speed, w + t) : Math.min(w + progress/speed, w + t));
                window.scrollTo(0,r);
                if (r != w + t) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        }, false);
    }
    } catch (error) {
        console.log(error);
    }

    //Menu cleaveth
    window.addEventListener('scroll', function(e) {
        var footer = document.querySelector('.footer');
        
        if (footer.classList.contains('footer--main')) {
            var menu = document.querySelector('.menu'),
                offsetMap = 35,
                menuClass = 'menu--cleaveth',
                offset = document.querySelector('body').offsetHeight - footer.offsetHeight - document.documentElement.clientHeight - offsetMap;
            
            if (pageYOffset >= offset) {
                menu.classList.add(menuClass);   
                
            } else if (pageYOffset < offset && menu.classList.contains(menuClass)) {
                menu.classList.remove(menuClass);  
            }
        } 
        
    });

    //Sliders 
    if (document.querySelector('.stocks__slider')) {
        var stocksSlider = new Glide('.stocks__slider', {
            type: 'carousel',
            focusAt: 'center',
            animationDuration: 1000,
            perView: 1
        });
        stocksSlider.mount();
    }
    
    if (document.querySelector('.about__slider')) {
        var aboutSlider = new Glide('.about__slider', {
            type: 'carousel',
            animationDuration: 1000,
            perView: 1
        });
        document.querySelector('.about__arrow--prev').addEventListener('click', function () {
            aboutSlider.go('<');
        });
    
        document.querySelector('.about__arrow--next').addEventListener('click', function () {
            aboutSlider.go('>');
        });
        aboutSlider.mount();
    }
    
    if (document.querySelector('.news__slider')) {
        var newsSlider = new Glide('.news__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 3,
            touchRatio: 1,
            perTouch: 1,
            breakpoints: {
                992: {
                  perView: 2
                },
                600: {
                  perView: 1
                }
              }
        });
        newsSlider.mount();
    }

    if (document.querySelector('.events__slider')) {
        var eventsSlider = new Glide('.events__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 3,
            touchRatio: 1,
            perTouch: 1,
            breakpoints: {
                992: {
                  perView: 3
                },
                600: {
                  perView: 1
                }
              }
        });
        eventsSlider.mount();
    }

    if (document.querySelector('.feedback__slider')) {
        var feedbackSlider = new Glide('.feedback__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 1,
            touchRatio: 1,
            perTouch: 1,
        });
        feedbackSlider.mount();
    }

    if (document.querySelector('.new-format__slider')) {
        var newFormatSlider = new Glide('.new-format__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 1
        });
        newFormatSlider.mount();
    }

    if (document.querySelector('.gallery__slider')) {
        var gallerySlider = new Glide('.gallery__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 1,
            peek: { before: 0, after: 50 },
            touchRatio: 1,
            perTouch: 1,
            breakpoints: {
                768: {
                    peek: 0
                }
            }
        });
        gallerySlider.mount();
    }

    if (document.querySelector('.school__slider')) {
        var schoolSlider = new Glide('.school__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 1
        });
        schoolSlider.mount();
    }

    if (document.querySelector('.wave__slider')) {
        var waveSlider = new Glide('.wave__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 3,
            breakpoints: {
                992: {
                    perView: 2
                },
                768: {
                    perView: 1
                }
            }
        });
        waveSlider.mount();
    }

    if(document.querySelector('.perleches__slider') && document.documentElement.clientWidth < 768) {
        var perlechesSlider = document.querySelector('.perleches__slider');
        perlechesSlider.classList.add('glide');
        perlechesSlider.querySelector('.perleches__track').classList.add('glide__track');
        perlechesSlider.querySelector('.perleches__slides').classList.add('glide__slides');
        perlechesSlider.querySelector('.perleches__slides').classList.remove('flex');
        perlechesSlider.querySelector('.perleches__slides').classList.remove('flex--center');
        perlechesSlider.querySelector('.perleches__slides').classList.remove('flex--wrap');

        var perlechesSlider = new Glide('.perleches__slider', {
            type: 'slider',
            focusAt: 0,
            animationDuration: 1000,
            perView: 1
        });
        perlechesSlider.mount();
    }


    if(document.querySelector('.booking-card__link ')) {

        document.querySelectorAll('.booking-card__link ').forEach(elem => {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
                if (this.closest('.booking-card').classList.contains('booking-card--active')) {
                    this.closest('.booking-card').classList.remove('booking-card--active');
                } else {
                    this.closest('.booking-card').classList.add('booking-card--active')
                }
            });
        });

    }

    if(document.querySelector('.price-mobile')) {

        document.querySelectorAll('.price-mobile__subtitle').forEach(elem => {
            elem.addEventListener('click', function (e) {
                e.preventDefault();

                if (this.closest('.price-mobile__block').classList.contains('price-mobile__block--active')) {
                    this.closest('.price-mobile__block').classList.remove('price-mobile__block--active');
                } else {
                    this.closest('.price-mobile__block').classList.add('price-mobile__block--active')
                }
            });
        });

    }

    if(document.querySelector('.button-trigger')) {

        document.querySelectorAll('.button-trigger').forEach(elem => {
            elem.addEventListener('click', function (e) {
                e.preventDefault();
              
                popupContacts.open('#popup-contacts-form');
            });
        });
    }

    //Mobile menu
    var menu = document.querySelector('.menu');
    var menuActiveClass = 'menu--active';
    var buttonActiveClass = 'menu__button--active';

    document.querySelector('.menu__button').addEventListener('click', function() {

        if (menu.classList.contains(menuActiveClass)) {
            menu.classList.remove(menuActiveClass);
            this.classList.remove(buttonActiveClass);
        } else {
            menu.classList.add(menuActiveClass);
            this.classList.add(buttonActiveClass);
        }
    });

    document.querySelector('.menu__list').addEventListener('click', function(e) {   
        if (menu.classList.contains(menuActiveClass)) {
            menu.classList.remove(menuActiveClass);
            document.querySelector('.menu__button').classList.remove(buttonActiveClass);
        }
    });

}

var popupContacts;

var faqTab;