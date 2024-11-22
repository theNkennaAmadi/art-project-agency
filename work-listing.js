import gsap from "gsap";
import Swiper from 'swiper';
import { EffectCube, Navigation } from 'swiper/modules';

export class WorkListing {
    constructor(container) {
        this.container = container;
        this.workNames = [...this.container.querySelectorAll('.work-name-item')];
        this.currentIndex = 0;
        this.swiper = null;
        this.init();
    }

    init() {
        this.resetState();
        this.initSwiper();

        // Delay animations to ensure DOM is fully rendered
        gsap.delayedCall(0.1, () => {
            gsap.set('.work-name-list', { opacity: 1 });
            this.initTextAnimation();
        });
    }

    resetState() {
        this.currentIndex = 0; // Reset index
        if (this.swiper) {
            this.swiper.destroy(true, true); // Destroy previous Swiper instance if it exists
            this.swiper = null;
        }
    }

    initSwiper() {
        const swiperContainer = document.querySelector(".swiper");
        if (!swiperContainer || !swiperContainer.querySelectorAll('.swiper-slide').length) {
            console.error("Swiper container or slides not found. Delaying initialization...");
            return;
        }

        gsap.to('.main', { opacity: 1 });

        try {
            this.swiper = new Swiper(".swiper", {
                effect: "cube",
                grabCursor: true,
                loop: true,
                speed: 1000,
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
        } catch (error) {
            console.error("Error initializing Swiper:", error);
        }
    }

    initTextAnimation() {
        const firstWorkName = this.workNames[0];
        if (!firstWorkName) {
            console.error("No work-name items found.");
            return;
        }

        gsap.set(firstWorkName, { yPercent: 0, opacity: 1 });
        this.animateText('next', true); // Initial animation
        this.handleVideoAutoplay('next', true); // Autoplay initial video
    }

    animateText(direction, isInitial = false) {
        const prevIndex = this.currentIndex;
        this.currentIndex = this.swiper?.realIndex || 0;

        const outgoingName = this.workNames[prevIndex];
        const incomingName = this.workNames[this.currentIndex];
        const outgoingChars = outgoingName?.querySelectorAll('.char') || [];
        const incomingChars = incomingName?.querySelectorAll('.char') || [];

        const tl = gsap.timeline();

        if (!isInitial && outgoingName) {
            tl.to(outgoingChars, {
                yPercent: direction === 'next' ? -100 : 100,
                opacity: 0,
                duration: 0.4,
                stagger: {
                    each: 0.02,
                    from: direction === 'next' ? 'start' : 'end',
                }
            });
            tl.to(outgoingName, { display: 'none' }, "<");
        }

        if (incomingName) {
            tl.set(incomingName, { display: 'block' }, "<");
            tl.fromTo(incomingChars,
                { yPercent: direction === 'next' ? 100 : -100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.4, stagger: { each: 0.02, from: direction === 'next' ? 'start' : 'end' } },
                isInitial ? 0 : "<"
            );
        }
    }

    handleVideoAutoplay(direction, isInitial = false) {
        if (!this.swiper || !this.swiper.slides || this.swiper.slides.length === 0) {
            //console.error("Swiper is not initialized or has no slides.");
            this.initSwiper();
        }

        const incomingSlide = this.swiper.slides[this.swiper.activeIndex];
        if (!incomingSlide) {
            console.error("Incoming slide not found.");
            return;
        }

        const incomingVideo = incomingSlide.querySelector('video');
        if (incomingVideo) {
            incomingVideo.addEventListener("canplay", () => {
                incomingVideo.play().catch((err) => {
                    console.error("Video play error:", err);
                });
            }, { once: true });

            incomingVideo.setAttribute("autoplay", "true");
            incomingVideo.play();
        }
    }

    removeOutgoingVideoAutoplay() {
        if (!this.swiper || !this.swiper.slides || this.swiper.slides.length === 0) {
            console.error("Swiper is not initialized or has no slides.");
            return;
        }

        const outgoingSlide = this.swiper.slides[this.swiper.previousIndex];
        if (!outgoingSlide) {
            console.error("Outgoing slide not found.");
            return;
        }

        const outgoingVideo = outgoingSlide.querySelector('video');
        if (outgoingVideo) {
            outgoingVideo.pause();
        }
    }
}