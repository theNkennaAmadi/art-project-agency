import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export class About{
    constructor(container) {
        this.container = container
        this.heroSpans = this.container.querySelectorAll('.h-span.cl')
        this.trailerItem = this.container.querySelectorAll('.trailer-item')
        this.init()
    }
    init(){
        gsap.from(this.trailerItem, {scale: 4, duration:3, ease: 'expo.out'})
        this.heroSpans.forEach(span => {
            gsap.to(span.querySelectorAll('.char'), {clipPath: 'inset(0% 0% 0% 100%)', duration: 0.75, delay: 1})
        })
        this.initScroller()
    }

    initScroller(){
        const contentWithSVG = Array.from(document.querySelectorAll('.content')).filter(element => {
            return element.querySelector(':scope svg') !== null;
        });

        const scrollEffect = (contentElement) => {

            const clipPath = contentElement.querySelectorAll('svg clipPath');
            const poster = contentElement.querySelectorAll('.poster');
            const posterInner = contentElement.querySelectorAll('.poster__inner');

            [...clipPath].forEach((clipPathEl, pos) => {

                const texts = clipPathEl.querySelectorAll('text');

                gsap.timeline({
                    scrollTrigger: {
                        trigger: poster[pos],
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                })
                    .fromTo(clipPathEl, {
                        xPercent: pos === 0 ? 0 : -100
                    }, {
                        ease: 'none',
                        xPercent: pos === 0 ? -100 : 0
                    }, 0)
                    .fromTo(poster[pos], {
                        filter: 'brightness(200%)',
                        skewX: pos === 0 ? -5 : 5
                    }, {
                        ease: 'sine',
                        filter: 'brightness(15%)',
                        skewX: pos === 0 ? 5 : -5
                    }, 0)
                    .fromTo(posterInner[pos], {
                        scale: 2.7
                    }, {
                        scale: 1
                    }, 0)
                    .fromTo(texts, {
                        transformOrigin: pos ? '50% 100%' : '50% 0%',
                        scaleX: 0.8,
                        scaleY: 0
                    }, {
                        duration: 0.2,
                        stagger: pos ? -0.01 : 0.01,
                        scaleX: 1,
                        scaleY: 1
                    }, 0);

            });
        };

        scrollEffect(contentWithSVG[0]);
    }

}