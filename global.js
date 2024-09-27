import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Splitting from "splitting";
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class Global {
    constructor(container) {
        this.container = container
        this.footer = this.container.querySelector('.footer')
        this.workNames = [...this.container.querySelectorAll('.work-name-item')]
        this.init()
    }

    init(){
        this.splitText()
        this.setUpFooterAnimations()
        this.initLinkHovers()
    }

    splitText() {
        this.elementsToSplit = this.container.querySelectorAll('[split-text]');

        this.elementsToSplit.forEach((element) => {
            const originalText = element.textContent.trim();
           // element.setAttribute('aria-label', originalText);

            const result = Splitting({
                target: element,
                by: 'chars'
            });

            const words = result[0].words;
            const chars = result[0].chars;

            words.forEach((word) => {
               // word.setAttribute('aria-hidden', 'true');
            });

            chars.forEach((char, charIndex) => {
                //char.setAttribute('aria-hidden', 'true');
            });
            gsap.set(chars, { yPercent: 110, opacity: 0 });
        });
        this.setupTextAnimations()
    }

    setupTextAnimations() {
        this.elementsToSplit.forEach(element => {
            const chars = element.querySelectorAll('.char');
            const animationType = element.getAttribute('split-text');
            const noScroll = element.hasAttribute('no-scroll');

            if(!noScroll){
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: element,
                        start: "top 95%",
                        end: "bottom bottom",
                    }
                });

                if (animationType === 'chars') {
                    tl.to(chars, {
                        yPercent: 0,
                        stagger: {
                            each: 0.05
                        },
                        opacity: 1,
                        ease: 'power4.inOut',
                        duration: 1,
                    });
                } else {
                    tl.to(chars, {
                        yPercent: 0,
                        opacity: 1,
                        ease: 'expo.out',
                        duration: 2
                    });
                }
            }
        });
    }

    setUpFooterAnimations(){
        if(this.footer){
            this.footerIcons = this.footer.querySelectorAll('.footer-icon')
            this.footerIconsElements = this.footer.querySelectorAll('.footer-icon > *')
            gsap.set(this.footerIconsElements, {yPercent: 110})

            this.footerIcons.forEach((icon, index)=>{
                gsap.to(icon.children, {
                    yPercent: 0,
                    ease: 'expo.out',
                    duration: 1,
                    scrollTrigger: {
                        trigger: icon,
                        start: 'top 95%'
                    }
                })
            })
        }

    }

    initLinkHovers(){
        const links = this.container.querySelectorAll('[s-link]');
        links.forEach(link => {
            const linkText = link.querySelectorAll('.char')
            const tllink = gsap.timeline({paused: true});
            tllink.fromTo(linkText, {yPercent: 0},{yPercent: -100, duration: 0.8, ease: 'power4.out', stagger: {amount: 0.1}});
            link.addEventListener('mouseover', () => {
                tllink.timeScale(1)
                tllink.play()
            });

            link.addEventListener('mouseout', () => {
                tllink.timeScale(1.5)
                tllink.reverse()
            });
        });
    }
}

export class CursorFollower {
    constructor(container) {
        this.container = container;
        this.cursor = this.container.querySelector('.cursor');
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.mouse = { x: this.pos.x, y: this.pos.y };
        this.speed = 0.1;
        this.isHovering = false;

        this.init();
    }

    init() {
        gsap.set(this.cursor, { xPercent: -50, yPercent: -50, scale: 0 });

        this.container.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        gsap.ticker.add(this.update.bind(this));

        this.setupHoverEffect();
    }

    update() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        gsap.to(this.cursor, { x: this.pos.x, y: this.pos.y, ease: 'expo.out', duration: 1 });
    }

    setupHoverEffect() {
        const workVisuals = this.container.querySelectorAll('.work-next-visual');

        workVisuals.forEach(visual => {
            visual.addEventListener('mouseenter', () => {
                this.isHovering = true;
                gsap.to(this.cursor, { scale: 1, duration: 0.5, ease: 'power2.out' });
            });

            visual.addEventListener('mouseleave', () => {
                this.isHovering = false;
                gsap.to(this.cursor, { scale: 0, duration: 0.5, ease: 'power2.out' });
            });
        });
    }
}


export class CursorFollower2 {
    constructor(container) {
        this.container = container;
        this.cursor = this.container.querySelector('.cursor');
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.mouse = { x: this.pos.x, y: this.pos.y };
        this.speed = 0.1;
        this.isHovering = false;

        this.init();
    }

    init() {
        gsap.set(this.cursor, { xPercent: -50, yPercent: -50, scale: 0 });

        this.container.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        gsap.ticker.add(this.update.bind(this));

        this.setupHoverEffect();
    }

    update() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        gsap.to(this.cursor, { x: this.pos.x, y: this.pos.y, ease: 'expo.out', duration: 1 });
    }

    setupHoverEffect() {
        const workVisuals = this.container.querySelectorAll('.work-link');

        workVisuals.forEach(visual => {
            visual.addEventListener('mouseenter', () => {
                this.isHovering = true;
                gsap.to(this.cursor, { scale: 1, duration: 0.5, ease: 'power2.out' });
            });

            visual.addEventListener('mouseleave', () => {
                this.isHovering = false;
                gsap.to(this.cursor, { scale: 0, duration: 0.5, ease: 'power2.out' });
            });
        });
    }
}

export class CursorFollower3 {
    constructor(container) {
        this.container = container;
        this.cursor = this.container.querySelector('.cursor');
        this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.mouse = { x: this.pos.x, y: this.pos.y };
        this.speed = 0.1;
        this.isHovering = false;

        this.init();
    }

    init() {
        gsap.set(this.cursor, { xPercent: -50, yPercent: -50, scale: 0 });

        this.container.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        gsap.ticker.add(this.update.bind(this));

        this.setupHoverEffect();
    }

    update() {
        this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

        gsap.to(this.cursor, { x: this.pos.x, y: this.pos.y, ease: 'expo.out', duration: 1 });
    }

}




export class ImageRevealAnimation {
    constructor(options = {}) {
        this.options = {
            selector: 'img',
            duration: 1,
            ease: 'power2.out',
            parallaxAmount: 20, // Percentage of image height
            ...options
        };
        this.init();
    }

    init() {
        this.images = document.querySelectorAll(this.options.selector);
        this.setupImages();
        this.setupAnimations();
    }

    setupImages() {
        this.images.forEach(img => {
            // Wrap image in a container
            const container = document.createElement('div');
            container.classList.add('img-reveal-container');
            img.parentNode.insertBefore(container, img);
            container.appendChild(img);

            // Create overlay
            const overlay = document.createElement('div');
            overlay.classList.add('img-reveal-overlay');
            container.appendChild(overlay);

            // Set styles
            gsap.set(container, {
                overflow: 'hidden',
                position: 'relative',
                width: img.width,
                height: img.height
            });

            gsap.set(img, {
                scale: 1.2,
                opacity: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
            });

            gsap.set(overlay, {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                //background: '#fff' // You can change this color
            });
        });
    }

    setupAnimations() {
        this.images.forEach(img => {
            const container = img.closest('.img-reveal-container');
            const overlay = container.querySelector('.img-reveal-overlay');

            // One-time reveal animation
            gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom-=10%',
                    toggleActions: 'play none none none'
                }
            })
                .to(overlay, {
                    scaleX: 0,
                    transformOrigin: 'right center',
                    ease: this.options.ease,
                    duration: this.options.duration
                })
                .to(img, {
                    scale: 1,
                    opacity: 1,
                    duration: this.options.duration,
                    ease: this.options.ease
                }, '-=' + this.options.duration / 2);

            // Continuous parallax effect
            gsap.to(img, {
                yPercent: -this.options.parallaxAmount, // Negative value for upward movement
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }
}