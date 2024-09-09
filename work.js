import gsap from "gsap";
import Lenis from "@studio-freight/lenis";
import Splitting from "splitting";
import ScrollTrigger from 'gsap/ScrollTrigger';

export class Work{
    constructor(container) {
        this.container = container
        this.video = this.container.querySelector('.work-main-video video');
        this.videoControls = this.container.querySelector('.video-control');
        this.playText = this.container.querySelector('.playback-wrapper div:nth-child(1)');
        this.pauseText = this.container.querySelector('.playback-wrapper div:nth-child(2)');
        this.muteText = this.container.querySelector('.sound-wrapper div:nth-child(2)');
        this.unmuteText = this.container.querySelector('.sound-wrapper div:nth-child(1)');
        this.soundWrapper = this.container.querySelector('.sound-wrapper');
        this.playbackWrapper = this.container.querySelector('.playback-wrapper');
        this.playWrapper = this.container.querySelector('.work-play-wrapper');
        this.duration = this.container.querySelector('.duration');
        this.nextLinksContainer = this.container.querySelectorAll('.next-link');
        this.links = Array.from(this.nextLinksContainer).map(link => link.getAttribute('href'));
        this.nextLinkWrapper = this.container.querySelector('.work-next-wrapper');
        this.nextLink = this.container.querySelector('.work-next-visual')
        this.nextVideo = this.nextLink.querySelector('video')
        this.init()
    }

    init(){
        gsap.to('.main', {opacity:1})
        this.setupVideoControls();
        this.setupEventListeners();
        this.setUpNextPrev()
        this.revealNextUp()
    }

    setupVideoControls() {
        // Set initial states

        // Ensure video starts with autoplay and muted
        this.video.autoplay = true;
        this.video.muted = true;
    }

    setupEventListeners() {
        this.playWrapper.addEventListener('click', () => this.toggleStartPlayback());
        this.playbackWrapper.addEventListener('click', () => this.togglePlayPause());
        this.soundWrapper.addEventListener('click', () => this.toggleMute());
        this.video.addEventListener('play', () => this.onVideoPlay());
        this.video.addEventListener('pause', () => this.onVideoPause());
        this.video.addEventListener('timeupdate', () => this.updateDuration());
    }

    toggleStartPlayback(){
        gsap.to(this.playWrapper, {opacity: 0, scale: 0, duration: 0.7})
        gsap.to(this.videoControls, {opacity: 1, duration: 0.7, pointerEvents: 'all'})
        if (this.video.paused) {
            this.video.play();
        }
        this.toggleMute()
    }

    togglePlayPause() {
        if (this.video.paused) {
            this.video.play();
        } else {
            this.video.pause();
        }
    }

    toggleMute() {
        this.video.muted = !this.video.muted;
        this.animateMuteUI();
    }

    onVideoPlay() {
        this.animatePlayPauseUI(true);
    }

    onVideoPause() {
        this.animatePlayPauseUI(false);
    }

    animatePlayPauseUI(isPlaying) {
        gsap.to(this.playText, {
            yPercent: isPlaying ? -110 : 0,
            duration: 0.3,
            ease: "power2.inOut"
        });
        gsap.to(this.pauseText, {
            yPercent: isPlaying ? -110 : 110,
            duration: 0.3,
            ease: "power2.inOut"
        });
    }

    animateMuteUI() {
        gsap.to(this.unmuteText, {
            yPercent: this.video.muted ? 0 : -110,
            duration: 0.3,
            ease: "power2.inOut"
        });
        gsap.to(this.muteText, {
            yPercent: this.video.muted ? 110 : -110,
            duration: 0.3,
            ease: "power2.inOut"
        });
    }

    updateDuration() {
        const progress = this.video.currentTime / this.video.duration;
        gsap.to(this.duration, {
            width: progress * 100 + '%',
            duration: 0.2,
            ease: "power2.inOut"
        });
    }

    findAdjacentLinks(url, links) {
        const index = links.indexOf(url);

        if (index === -1) {
            return { previous: null, next: null };
        }

        const previous = index === 0 ? links[links.length - 1] : links[index - 1];
        const next = index === links.length - 1 ? links[0] : links[index + 1];

        return { previous, next };
    }

    setUpNextPrev(){
        const result = this.findAdjacentLinks(window.location.pathname, this.links);
        if (result.next) {
            this.nextLink.href = result.next;
            const nextLinkElement = this.nextLinksContainer[this.links.indexOf(result.next)];
            const nextVideoLinkElement = nextLinkElement.querySelector('.preview-url');
            const nextHeader = nextLinkElement.querySelector('.name')
            const nextCategory = nextLinkElement.querySelector('.category')
            if (nextVideoLinkElement && this.nextVideo) {
                this.nextVideo.src = nextVideoLinkElement.textContent.trim();
                this.nextLinkWrapper.querySelector('h2').textContent = nextHeader.textContent.trim();
                this.nextLinkWrapper.querySelector('.work-next-category').textContent = nextCategory.textContent.trim();
            }
        }
    }

    revealNextUp(){
        gsap.from(this.nextLink, {clipPath: 'inset(0% 100% 100% 0%)', duration: 2, ease: 'expo.out', transformOrigin: 'top left',
            scrollTrigger: {
                trigger: this.nextLinkWrapper,
                start: 'top 65%',
                end: 'top 50%',
                //scrub: 1
            }
        })
    }
}