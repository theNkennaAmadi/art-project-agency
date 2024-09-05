import gsap from 'gsap'

export class Home {
	constructor(container) {
		this.container = container
		this.init()

		this.heroSection()
		this.clientsMarquee()
	}

	init() {}

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

	clientsMarquee() {
		const marquees = document.querySelectorAll('.cl-marquee')

		marquees.forEach((marquee, index) => {
			const clone = marquee.cloneNode(true)

			marquee.parentNode.appendChild(clone)

			// const isEven = index % 2 === 0
			// const direction = isEven ? '-100%' : '100%'

			gsap.timeline({ repeat: -1 }).to([marquee, clone], {
				y: '-100%',
				duration: 10,
				ease: 'none',
				stagger: 0,
			})
		})
	}
}

// new Home()
