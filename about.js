import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export class About {
    constructor(container) {
        this.container = container
        this.heroSpans = this.container.querySelectorAll('.h-span.cl')
        this.trailerItem = this.container.querySelectorAll('.trailer-item')
        this.teamItems = this.container.querySelectorAll('.team-item')
        this.sceneList = document.querySelector('.scene-list');
        this.sceneItems = document.querySelectorAll('.scene-visual');
        this.contentElement = this.container.querySelector('.content');
        this.svgElement = this.contentElement.querySelector('svg');
        this.clipPathElement = this.svgElement.querySelector('clipPath');
        this.textElements = this.clipPathElement.querySelectorAll('text');
        this.init()
    }

    init() {
        gsap.to('.main', {opacity:1})
        gsap.set(this.trailerItem, {opacity:1})
        gsap.from(this.trailerItem, {scale: 4, duration:3, ease: 'expo.out'})
        this.heroSpans.forEach(span => {
            gsap.to(span.querySelectorAll('.char'), {clipPath: 'inset(0% 0% 0% 100%)', duration: 0.75, delay: 1})
        })
        this.initScroller()
        this.revealTeam()
        this.convertUnits()
        window.addEventListener('resize', this.handleResize.bind(this))
    }

    convertUnits() {
        const vwToPx = (vw) => {
            return (vw * window.innerWidth) / 100;
        }

        this.textElements.forEach(textElement => {
            const xInVw = parseFloat(textElement.getAttribute('x'));
            const xInPx = vwToPx(xInVw);
            textElement.setAttribute('x', `${xInPx}px`);
        });
    }

    handleResize() {
        //this.convertUnits();
    }

    initScroller() {
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
                        start: 'top 90%',
                        end: 'bottom -10%',
                        invalidateOnRefresh: true,
                        scrub: true
                    }
                })
                    .fromTo(clipPathEl, {
                        xPercent: pos === 0 ? 0 : -200
                    }, {
                        ease: 'none',
                        xPercent: pos === 0 ? -200 : 0
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

    revealTeam() {
        this.teamItems.forEach(item => {
            const tl = gsap.timeline({paused: true})
            tl.to(item.querySelector('img'), {filter: 'grayscale(90%)', scale: 1, ease: 'expo', duration: 0.7, })
                .fromTo(item.querySelector('.card__box'), { opacity: 0, scale: 0, rotation: -10}, {opacity: 1, scale: 1, rotation: 0, stagger: 0.08}, "<")

            item.addEventListener('mouseenter', () => {
                tl.play()
            })
            item.addEventListener('mouseleave', () => {
                tl.reverse()
            })

            gsap.from(item, {clipPath: 'inset(0% 100% 100% 0%)', duration: 2, ease: 'expo.out', transformOrigin: 'top left',
                scrollTrigger: {
                    trigger: item.parentElement,
                    start: 'top 75%',
                    end: 'top 50%',
                }
            })
        })
    }
}