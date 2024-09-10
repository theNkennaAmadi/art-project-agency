import gsap from "gsap";
import Swiper from 'swiper';
import { EffectCube, Navigation } from 'swiper/modules';

export class WorkListing {
    constructor(container) {
        this.container = container;
        this.workNames = [...this.container.querySelectorAll('.work-name-item')];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        console.log(Swiper)
        this.initSwiper();
        gsap.set('.work-name-list', { opacity: 1 });
        this.initTextAnimation();
    }

    initSwiper() {
        gsap.to('.main', {opacity:1})
        this.swiper = new Swiper(".swiper", {
            effect: "cube",
            grabCursor: true,
            loop: true,
            modules: [EffectCube, Navigation],
            navigation: {
                nextEl: "#sliderNext",
                prevEl: "#sliderPrev",
            },
            on: {
                slideNextTransitionStart: () => {
                    this.animateText('next');
                    this.handleVideoAutoplay('next');
                },
                slidePrevTransitionStart: () => {
                    this.animateText('prev');
                    this.handleVideoAutoplay('prev');
                },
                slideChangeTransitionEnd: () => {
                    this.removeOutgoingVideoAutoplay();
                }
            }
        });
    }

    initTextAnimation() {
        gsap.set(this.workNames[0], { yPercent: 0, opacity: 1 });
        this.animateText('next', true); // Animate the initial text
        this.handleVideoAutoplay('next', true); // Set autoplay for the initial video
    }

    animateText(direction, isInitial = false) {
        const prevIndex = this.currentIndex;
        this.currentIndex = this.swiper.realIndex;

        const outgoingName = this.workNames[prevIndex];
        const incomingName = this.workNames[this.currentIndex];
        const outgoingChars = outgoingName.querySelectorAll('.char');
        const incomingChars = incomingName.querySelectorAll('.char');

        const tl = gsap.timeline();

        if (!isInitial) {
            // Animate out the current text
            tl.to(outgoingChars, {
                yPercent: direction === 'next' ? -100 : 100,
                opacity: 0,
                duration: 0.4,
                stagger: {
                    each: 0.02,
                    from: direction === 'next' ? 'start' : 'end'
                }
            });
            tl.to(outgoingName, {display: 'none'}, 1);
            tl.set(incomingName, {display: 'block', }, 0);
        }else{
            tl.set(incomingName, {display: 'block', }, 0);
        }

        // Animate in the new text
        tl.fromTo(incomingChars,
            {
                yPercent: direction === 'next' ? 100 : -100,
                opacity: 0
            },
            {
                yPercent: 0,
                opacity: 1,
                duration: 0.4,
                display: 'block',
                stagger: {
                    each: 0.02,
                    from: direction === 'next' ? 'start' : 'end'
                }
            },
            isInitial ? 0 : 0 // Slight overlap for smoother transition
        );
    }

    handleVideoAutoplay(direction, isInitial = false) {
        const incomingSlide = this.swiper.slides[this.swiper.activeIndex];
        const incomingVideo = incomingSlide.querySelector('video');

        if (incomingVideo) {
            incomingVideo.setAttribute('autoplay', '');
            incomingVideo.play();
        }
    }

    removeOutgoingVideoAutoplay() {
        const outgoingSlide = this.swiper.slides[this.swiper.previousIndex];
        const outgoingVideo = outgoingSlide.querySelector('video');

        if (outgoingVideo) {
            outgoingVideo.removeAttribute('autoplay');
            outgoingVideo.pause();
        }
    }
}