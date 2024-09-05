import gsap from 'gsap'

export class Home {
	constructor(container) {
		this.container = container
		this.init()

		this.heroSection()
	}

	init() {
		// console.log('Home')
	}

	heroSection() {
		const centerX = -1.5
		const centerY = -2.5

		gsap
			.timeline()
			.to('.home-hero-svg', {
				scale: 150,
				xPercent: -centerX * 150,
				yPercent: -centerY * 150,
				ease: 'expo.inOut',
				delay: 2,
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
	}
}

new Home()
