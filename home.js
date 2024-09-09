import gsap from 'gsap'
import Splitting from 'splitting'

let mmHome = gsap.matchMedia();

export class Home2 {
    constructor(container, lenis) {

        this.container = container
        this.lenis = lenis

        lenis.scrollTo(0, { immediate: true })
        lenis.stop()

        this.init()
        this.footer = this.container.querySelector('.footer')
        this.nav = this.container.querySelector('.nav')


        this.heroSection()
        this.about()
        this.clientsMarquee()
        this.wwd()
        this.initLinkHovers()
    }

    init() {
        gsap.to('.main', {opacity:1})
        UnicornStudio.addScene({
            elementId: "homeGl", // id of the HTML element to render your scene in (the scene will use its dimensions)
            fps: 60, // frames per second (0-120) [optional]
            scale: 1, // rendering scale, use smaller values for performance boost (0.25-1) [optional]
            dpi: 1, // pixel ratio [optional]
            projectId: "3EJV0eCCE5mFcRITvNdm", // the id string for your embed (get this from "embed" export)
            lazyLoad: true, // will not initialize the scene until it scrolls into view
            filePath: "https://cdn.shopify.com/s/files/1/0650/2826/0015/files/3EJV0eCCE5mFcRITvNdm.json?v=1725876581", // if youre hosting your own exported json code, point to it here (do not use both filePath and projectId, only one is required)
            altText: "Art Project Agency", // optional text for SEO, going inside the <canvas> tag
            ariaLabel: "This is a canvas scene", // optional text for the aria-label attribute on the <canvas> element
            production: false, // when true, will hit the global edge CDN, learn more in the help docs
            interactivity: {
                // [optional]

                mouse: {
                    disableMobile: true, // disable touch movement on mobile
                },
            },
        })
            .then((scene) => {
                console.log(scene)
                // scene is ready
                // To remove a scene, you can use:
                // scene.destroy()
            })
            .catch((err) => {
                console.error(err);
            });
    }



    heroSection() {
        const centerX = -1.5
        const centerY = -2.5

        const heroText = this.container.querySelectorAll('.home-hero-text')
        const result = Splitting({
            target: heroText,
            by: 'chars',
        })

        const result2= Splitting({
            target: '.w1',
            by: 'chars',
        })

        const result3= Splitting({
            target: '[s-link]',
            by: 'chars',
        })

        gsap.set(result[0].chars, {
            autoAlpha: 0,
        })

        gsap
            .timeline({
                onComplete: () => {
                    this.lenis.start()
                },
            })
            .to('.home-hero-svg', {
                scale: 150,
                xPercent: -centerX * 150,
                yPercent: -centerY * 150,
                ease: 'expo.inOut',
                delay: 1.5,
                duration: 1.75,
            })
            .to(
                '.home-hero-svg',
                {
                    autoAlpha: 0,
                },
                '-=.3'
            )
            .to(
                '.home-hero-btn',
                {
                    autoAlpha: 1,
                },
                '-=.5'
            )
            .to(result[0].chars, {
                autoAlpha: 1,
                stagger: 0.05,
                duration: 0.5,
            })

        const videoBtn = document.querySelector('.home-hero-btn')
        const video = document.querySelector('.hh-embed video')

        this.isPlaying = false
        videoBtn.addEventListener('click', () => {
            if (!this.isPlaying) {
                gsap
                    .timeline({
                        onStart: () => {
                            video.currentTime = 0
                            video.muted = false
                            this.isPlaying = true
                        },
                    })
                    .to(result[0].chars, {
                        autoAlpha: 0,
                        stagger: { each: 0.05, from: 'end' },
                        duration: 0.5,
                    })
                    .to('.home-hero-btn', {
                        autoAlpha: 0,
                        duration: 0.5,
                    })
                gsap.to(this.container.querySelector('.cursor'), { scale: 1, duration: 0.5, ease: 'power2.out' });
            }
        })
        video.addEventListener('click', () => {
            if (this.isPlaying) {
                gsap
                    .timeline({
                        onStart: () => {
                            video.currentTime = 0
                            video.muted = true
                            this.isPlaying = false
                        },
                    })
                    .to('.home-hero-btn', {
                        autoAlpha: 1,
                        duration: 0.5,
                    })
                    .to(result[0].chars, {
                        autoAlpha: 1,
                        stagger: { each: 0.05, from: 'start' },
                        duration: 0.5,
                    })
                gsap.to(this.container.querySelector('.cursor'), { scale: 0, duration: 0.5, ease: 'power2.out' });
            }
        })

        gsap.set('.w1 .char', {yPercent: 110})

        const w1 = this.container.querySelectorAll('.w1')

        const riskFirst = this.container.querySelectorAll('.risk .char:not(:last-child)');
        const storyChars = this.container.querySelectorAll('.story .char');

        w1.forEach((element, index) => {
            gsap.fromTo(element.querySelectorAll('.char'), {yPercent: 110}, {yPercent: 0, duration: 1, stagger: 0.1, scrollTrigger:{
                    trigger: '.wa-text-wrapper',
                    start: 'center 80%',
                    end: 'center 50%',
                    scrub: true,
                    //markers: true
                }})
        })

        gsap.set(storyChars, {opacity: 0})
        gsap.set('.story', {opacity: 1})

        let tlA = gsap.timeline({scrollTrigger: {
                trigger: '.secondary-mask-wrapper',
                start: 'bottom 90%',
                end: 'bottom 70%',
                scrub: 1,
            }})


        tlA.to('.risk', {xPercent: -97}, "<")
            .to(riskFirst, {yPercent: 110, stagger: {from: 'end'}},"<")
            .to('.story', {xPercent: -87}, "<")
            .to(storyChars, {opacity: 1, stagger: {from: 'start'}},"<")

        gsap.to('.secondary-mask-wrapper', {opacity: 1, pointerEvents: 'auto', scrollTrigger:{
            trigger: '.secondary-mask-wrapper',
                start: 'top 80%',
                end: 'top top',
                scrub: true,
               // markers: true
            }})

        gsap.to('.gl-section', {opacity: 0.1, scrollTrigger:{
                trigger: '.gl-section',
                start: 'bottom bottom',
                end: 'bottom 50%',
                scrub: 2,
                //markers: true
            }})




    }

    about() {
        const aboutText = this.container.querySelectorAll('.ha-p')
        const result = Splitting({
            target: aboutText,
            by: 'words',
        })

        gsap.set(result[0].words, {
            opacity: 0.4,
        })

        gsap.to(result[0].words, {
            opacity: 1,
            ease: 'none',
            stagger: 0.5,
            scrollTrigger: {
                trigger: aboutText,
                scrub: 1,
                start: 'top 80%',
                end: 'top 10%',
            },
        })
    }

    wwd() {
        const wwI = gsap.utils.toArray(this.container.querySelectorAll('.home-wwd-i-c'))
        const wwT = this.container.querySelectorAll('.home-wwd-r-item')

        /*
        gsap.to(wwI, {
            opacity: 0,
        })
        gsap.to(wwI[0], {
            opacity: 1,
        })

         */

        mmHome.add("(min-width: 767px)", () => {
            wwT.forEach((element, index) => {
                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: element,
                            scrub: true,
                            start: 'top 40%',
                            end: 'top 25%',
                        },
                    })
                    .fromTo(wwI[index],{clipPath: 'inset(0% 0% 100% 0%)',}, {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 3,
                        ease: 'power3.out',
                    })
                    .to(wwT[index], {opacity:1, duration:1})
            })
        })

    }

    clientsMarquee() {
        gsap.utils.toArray('.cl-marquee').forEach((item, i) => {
            const parent = document.querySelector('.hm-clientelle')
            const child = item

            const scrollDistance = -(child.scrollHeight - parent.clientHeight)

            gsap.set(child, {
                y: i % 2 === 0 ? 0 : scrollDistance,
            })

            gsap.to(child, {
                y: i % 2 === 0 ? scrollDistance : 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: parent,
                    start: 'top 80%',
                    end: 'bottom 70%',
                    scrub: 2,
                },
            })
        })
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