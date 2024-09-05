import gsap from 'gsap'
import Splitting from 'splitting'

export class Home {
	constructor(container, lenis) {
		this.container = container
		this.lenis = lenis

		lenis.scrollTo(0, { immediate: true })
		lenis.stop()

		this.init()

		this.heroSection()
		this.about()
		this.clientsMarquee()
		this.wwd()
	}

	init() {}

	heroSection() {
		const centerX = -1.5
		const centerY = -2.5

		const heroText = this.container.querySelectorAll('.home-hero-text')
		const result = Splitting({
			target: heroText,
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
				delay: 0.5,
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
			}
		})
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
				scrub: true,
				start: 'top 80%',
				end: 'top 10%',
			},
		})
	}

	wwd() {
		const wwI = gsap.utils.toArray(this.container.querySelectorAll('.home-wwd-i-c'))
		const wwT = this.container.querySelectorAll('.home-wwd-r-item')

		gsap.to(wwI, {
			opacity: 0,
		})
		gsap.to(wwI[0], {
			opacity: 1,
		})

		wwT.forEach((element, index) => {
			gsap
				.timeline({
					scrollTrigger: {
						trigger: element,
						scrub: true,
						start: 'top 20%',
						end: 'top 18%',
					},
				})
				.to(wwI[index], {
					opacity: 1,
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
					end: 'top -10%',
					scrub: true,
				},
			})
		})
	}
}
